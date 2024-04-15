import { PersonSchema } from "../schemas/person";
import CreatePersonUseCase from "../use_cases/CreatePersonUseCase";
import GetAllPeopleUseCase from "../use_cases/GetAllPeopleUseCase";
import GetPersonByIdUseCase from "../use_cases/GetPersonByIdUseCase";

export async function CreatePersonService(data: PersonSchema) {
  try {
    const createPersonUseCase = new CreatePersonUseCase();

    const results = await createPersonUseCase.execute(data);

    return results!.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetPersonService() {
  try {
    const getAllPeopleUseCase = new GetAllPeopleUseCase();
    return await getAllPeopleUseCase.execute();
  } catch (error) {
    throw error;
  }
}

export async function GetPersonByIdService(id: string) {
  try {
    const getPersonByIdUseCase = new GetPersonByIdUseCase();
    return await getPersonByIdUseCase.execute(id);
  } catch (error) {
    throw error;
  }
}
