import z from "zod";

export const ProductForCatalogSchema = z.object({
    name: z.string(),
    article: z.string(),
    color: z.string(),
    size: z.string().nullable(),
})

export type ProductForCatalog = z.infer<typeof ProductForCatalogSchema>;