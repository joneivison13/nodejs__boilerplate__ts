import { ZodError } from "zod";
import { Database } from "../infra/database";
import personSchema, { PersonSchema } from "../schemas/person";

export default class CreatePersonUseCase {
  async execute(data: PersonSchema) {
    try {
      personSchema.parse(data);
      const new_person = await Database.person.create({
        data: {
          ...data,
          birthDate: new Date(data.birthDate),
        },
      });

      return new_person;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(JSON.stringify(error.errors));
      }
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}
