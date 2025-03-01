import { z } from 'zod';

const createGastoSchema = z.object({
    title: z.string().min(5, 'Obrigatório.'),
    amount: z.string().min(1, 'Obrigatório.'),
    category: z.string().min(5, 'Obrigatório.'),
    dueDate: z.date({ required_error: 'Obrigatório.' }),
    isPaid: z.boolean().optional(),
    description: z.string().optional(),
  });

type GastoSchema = z.infer<typeof createGastoSchema>;

export { createGastoSchema };
export type { GastoSchema };
