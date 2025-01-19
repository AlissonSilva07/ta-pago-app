import { z } from 'zod';

const createLoginSchema = z.object({
  email: z.string().min(5, 'Obrigatório.'),
  password: z.string().min(5, 'Obrigatório.')
})

type LoginSchema = z.infer<typeof createLoginSchema>;

export { createLoginSchema };
export type { LoginSchema };
