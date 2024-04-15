import { z } from "zod";

enum DocumentType {
  RG = "RG",
  CNH = "CNH",
}

const documentSchema = z
  .object({
    type: z.nativeEnum(DocumentType),
    value: z.string(),
    file_dir: z.string().optional(),
    file: z.string().optional(),
  })
  .strict();

export default documentSchema;

export type DocumentSchema = z.infer<typeof documentSchema>;
