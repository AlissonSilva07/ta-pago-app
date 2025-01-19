import { z } from 'zod';

const createGastoSchema = z.object({
    title: z.string().min(5, 'Obrigatório.'),
    amount: z.string().min(1, 'Obrigatório.'),
    category: z.string().min(5, 'Obrigatório.'),
    dueDate: z.date(),
    isPaid: z.boolean().optional(),
    recurring: z.object({
      type: z.string(),
      nextDueDate: z.date(),
    }).optional(),
    description: z.string().min(5, 'Obrigatório.'),
  });

type GastoSchema = z.infer<typeof createGastoSchema>;

export { createGastoSchema };
export type { GastoSchema };
