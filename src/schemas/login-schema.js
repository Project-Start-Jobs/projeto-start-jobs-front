import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Digite seu email' })
    .min(1, { message: 'Digite um email válido' })
    .email({ message: 'Digite um email válido' }),
  senha: z
    .string({
      required_error: 'Digite sua senha',
    })
    .min(1, { message: 'Digite sua Senha' }),
});
