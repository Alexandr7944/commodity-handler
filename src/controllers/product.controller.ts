import productRepositories from "@/repositories/product.repositories";
import {Request, Response} from 'express';
import assert from "node:assert";
import Database from "@/db/Database";
import RangeService from "@/services/range.service";
import CharacteristicService from "@/services/characteristic.service";
import {Product} from "@/models";
import CatalogService from "@/services/catalog.service";
import rangeRepositories from "@/repositories/range.repositories";
import catalogRepositories from "@/repositories/catalog.repositories";
import characteristicRepositories from "@/repositories/characteristic.repositories";

class ProductController {
    constructor() {
        this.update = this.update.bind(this);
        this.create = this.create.bind(this);
    }

    async create(req: Request, res: Response) {
        const {product, catalog, range, characteristic} = req.body;

        try {
            await Database.sequelize?.transaction(async (trx) => {
                const {id: productId, ...productData} = product;
                let [oldProduct] = await productRepositories.findAll(productId ? product : productData);

                if (!productId) {
                    if (oldProduct) {
                        product.id = oldProduct?.id;
                    } else {
                        const newProduct = await productRepositories.create(product, trx);
                        product.id = newProduct.id;
                    }
                }

                if (!catalog.id) {
                    if (oldProduct?.catalogs?.[0]?.id) {
                        catalog.id = oldProduct?.catalogs?.[0]?.id;
                    } else {
                        catalog.id = await new CatalogService().create(product);
                        await catalogRepositories.create({
                            id: catalog.id,
                            productId: product.id,
                        }, trx);
                    }
                }

                if (!range.id) {
                    if (oldProduct?.ranges?.[0]?.id) {
                        range.id = oldProduct?.ranges?.[0]?.id;
                    } else if (range.type) {
                        range.id = await new RangeService().create({range, product});
                        range.productId = product.id;
                        await rangeRepositories.create(range, trx);
                    }
                }

                if (!characteristic.id) {
                    const searchCharacteristic = oldProduct?.characteristics?.find(item =>
                        item.supplierId === characteristic.supplierId);
                    if (searchCharacteristic) {
                        characteristic.id = searchCharacteristic.id;
                    } else if (range.id && characteristic.supplierId) {
                        characteristic.rangeId = range.id;
                        characteristic.productId = product.id;
                        characteristic.id = await new CharacteristicService().create({characteristic, product});
                        await characteristicRepositories.create(characteristic, trx);
                    }
                }

                res.status(201).send({product, catalog, range, characteristic});
            });
        } catch (error: Error | any) {
            console.error(error);
            res.status(500).send({
                message: `Some error occurred while creating the Product. Error: ${error?.message}`
            });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const {...params} = req.query;
            const products = await productRepositories.findAll(params);
            res.status(200).send(products);
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Some error occurred while retrieving products. Error: ${error?.message}`
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            const product = await productRepositories.findOne(id);

            product
                ? res.status(200).send(product)
                : res.status(404).send({message: `Cannot find Product with id=${id}.`});
        } catch (error: Error | any) {
            res.status(500).send({
                message: `Error retrieving Product with id=${id}. Error: ${error.message}`
            });
        }
    }


    async update(req: Request, res: Response) {
        const product = req.body;
        try {
            await Database.sequelize?.transaction(async (trx) => {
                const [num] = await productRepositories.update(product, trx);
                const data = await productRepositories.findOne(product.id) || {} as Product;
                assert.ok(num && data?.id, 'Product was not updated!');

                await new RangeService().updateValueProduct({ranges: this.getIds(data.ranges), product});
                await new CharacteristicService().updateValueProduct({ids: this.getIds(data.characteristics), product});
                await new CatalogService().update({ids: this.getIds(data.catalogs), product});
                res.status(200).send({message: "Product was updated successfully."});
            })
        } catch (error: Error | any) {
            console.error(error)
            res.status(500).send({
                message: `Error updating Product with id=${product.id}. Error: ${error.message}`
            });
        }
    }

    async destroy(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        try {
            const oldProduct = await productRepositories.findOne(id);
            assert.ok(oldProduct, `Cannot find Product with id=${id}.`);
            assert.ok(!oldProduct?.characteristics?.length, `Cannot delete Product with id=${id}. Product has characteristics.`);

            const {catalogs, ranges} = oldProduct || {} as Product;

            await Database.sequelize?.transaction(async (trx) => {
                const deletedArr: unknown[] = [];
                catalogs?.forEach(({id}) => {
                    if (id)
                        deletedArr.push(
                            catalogRepositories.destroy(id, trx),
                            new CatalogService().destroy(id),
                        )
                });
                ranges?.forEach(({id}) => {
                    if (id)
                        deletedArr.push(
                            rangeRepositories.destroy(id, trx),
                            new RangeService().destroy(id),
                        )
                });
                await Promise.all(deletedArr);
                await productRepositories.destroy(id, trx)

                res.status(200).send({message: "Product was deleted successfully."});
            })
        } catch (error: Error | any) {
            res.status(500).send({
                message: error.message || `Could not delete Product with id==${id}. Error: ${error.message}`
            });
        }
    }

    getIds(arr ?: { id?: number }[]) {
        return arr?.map((item) => ({id: item.id || 0})) || [];
    }
}

export default ProductController;
