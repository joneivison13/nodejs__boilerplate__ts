import { z } from "zod";

const personSchema = z
  .object({
    id: z
      .string()
      .uuid()
      .optional(),
    name: z.string().min(1, "Preencha o campo"),
    nacionality: z.string().min(1, "Preencha o campo"),
    document: z.string().min(1, "Preencha o campo"),
    birthDate: z.date().or(z.string().min(1, "Preencha o campo")),
    gender: z.string().min(1, "Preencha o campo"),
    phone: z.string().min(1, "Preencha o campo"),
    telephone: z.string().min(1, "Preencha o campo"),
  })
  .strict();

export default personSchema;

export type PersonSchema = z.infer<typeof personSchema>;
