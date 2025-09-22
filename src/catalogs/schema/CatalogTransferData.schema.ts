import * as z from 'zod';

export const CatalogTransferDataSchema = z.array(
    z.object({
        ID:   z.string(),
        NAME: z.string(),
    }).transform((data) => ({
        id:   Number(data.ID),
        name: data.NAME,
    }))
)
