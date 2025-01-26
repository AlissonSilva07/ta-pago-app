import { z } from 'zod';

const createGastoSchema = z.object({
    title: z.string().min(5, 'Obrigatório.'),
    amount: z.string().min(1, 'Obrigatório.'),
    category: z.string().min(5, 'Obrigatório.'),
    dueDate: z.string({ required_error: 'Obrigatório.' }),
    isPaid: z.boolean().optional(),
    recurring: z.object({
      isRecurrent: z.boolean(),
      nextDueDate: z.string(),
    }),
    description: z.string().optional(),
  });

type GastoSchema = z.infer<typeof createGastoSchema>;

export { createGastoSchema };
export type { GastoSchema };
