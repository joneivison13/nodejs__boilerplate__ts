import { z } from "zod";

const addressSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
  })
  .strict();

export default addressSchema;

export type AddressSchema = z.infer<typeof addressSchema>;
