import { DocumentSchema } from "../schemas/document";
import CreateDocumentUseCase from "../use_cases/CreateDocumentUseCase";

export async function CreateDocumentService(
  document: DocumentSchema,
  person: string
) {
  try {
    const createDocumentUseCase = new CreateDocumentUseCase();
    const results = await createDocumentUseCase.execute(document, person);
    return results!.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
