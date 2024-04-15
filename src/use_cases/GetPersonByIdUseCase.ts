import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Database } from "../infra/database";

export default class GetPersonByIdUseCase {
  async execute(id: string) {
    try {
      const person = await Database.person.findUnique({
        where: {
          id,
        },
        select: {
          birthDate: true,
          Address: true,
          createdAt: true,
          Document: {
            select: {
              id: true,
              file: true,
              file_dir: false,
              value: true,
            },
          },
          document: true,
          gender: true,
          id: true,
          nacionality: true,
          name: true,
          phone: true,
          telephone: true,
          updatedAt: true,
        },
      });

      return person;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new Error("Person not found");
      }
      throw error;
    }
  }
}
