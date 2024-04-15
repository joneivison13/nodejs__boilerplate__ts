import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Database } from "../infra/database";
import documentSchema, { DocumentSchema } from "../schemas/document";

import path from "path";

export default class CreateDocumentUseCase {
  async execute(document: DocumentSchema, person: string) {
    try {
      documentSchema.parse(document);
      console.log({ document });
      const data = await Database.document.create({
        data: {
          ...document,
          file: document.file_dir
            ? path.basename(document.file_dir as string)
            : undefined,
          person: { connect: { id: person } },
        },
      });
      return data;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new Error("Person not found");
      }
      throw error;
    }
  }
}
