import { AddressSchema } from "../schemas/address";
import CreateAddressUseCase from "../use_cases/CreateAddressUseCase";

export async function CreateAddressService(
  address: AddressSchema,
  person: string
) {
  try {
    const createAddressUseCase = new CreateAddressUseCase();
    const results = await createAddressUseCase.execute(address, person);
    return results?.id;
  } catch (error) {
    throw error;
  }
}
