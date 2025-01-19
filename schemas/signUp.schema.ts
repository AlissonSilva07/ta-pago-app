import { z } from 'zod';

const createSignupSchema = z.object({
  username: z.string().min(5, 'Obrigatório.'),
  email: z.string().min(5, 'Obrigatório.'),
  password: z.string().min(5, 'Obrigatório.'),
  profilePicture: z.string().optional(),
})

type SignupSchema = z.infer<typeof createSignupSchema>;

export { createSignupSchema };
export type { SignupSchema };
