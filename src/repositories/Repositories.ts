// import {Model} from "sequelize-typescript";
//
// type Constructor<T> = new (...args: any[]) => T;
// type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;
//
// export class RepositoryService<T extends Model<T>> {
//     constructor(protected model: ModelType<T>) {
//         this.model = model;
//     }
//
//     async create<T>(body: T) {
//         return await this.model.create(body);
//     }
//
//     async createMultiple(body: T[]) {
//         return await this.model.bulkCreate(body);
//     }
//
//     async findAll() {
//         return await this.model.findAll({
//             order: [['id', 'ASC']],
//         });
//     }
//
//     async findOne(id: number) {
//         return await this.model.findByPk(id);
//     }
//
//     async update(body: T) {
//         return await this.model.update(body, {
//             where: {id: body.id}
//         });
//     }
//
//     async destroy(id: number) {
//         return await this.model.destroy({
//             where: {id}
//         });
//     }
// }
//
// export default RepositoryService;
