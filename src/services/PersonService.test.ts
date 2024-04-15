import {
  CreatePersonService,
  GetPersonService,
} from "../../src/services/PersonService";
import CreatePersonUseCase from "../../src/use_cases/CreatePersonUseCase";
import { PersonSchema } from "../schemas/person";
import GetAllPeopleUseCase from "../use_cases/GetAllPeopleUseCase";

// jest.mock("../../src/use_cases/CreatePersonUseCase");

describe("[Service] - CreatePersonService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve chamar o CreatePersonUseCase com os dados corretos", async () => {
    const mockData: PersonSchema = {
      name: "John Doe",
      birthDate: new Date(),
      document: "123456789",
      gender: "M",
      id: "12345",
      nacionality: "Brasil",
      phone: "123456789",
      telephone: "123456789",
    };
    const mockPersonId = "12345";

    jest.spyOn(CreatePersonUseCase.prototype, "execute").mockResolvedValueOnce({
      id: mockPersonId,
      name: "John Doe",
      birthDate: new Date(),
      document: "123456789",
      gender: "M",
      nacionality: "Brasil",
      phone: "123456789",
      telephone: "123456789",
      createdAt: new Date(),
      updatedAt: new Date(),
      is_client: false,
    });

    const result = await CreatePersonService(mockData);

    expect(CreatePersonUseCase.prototype.execute).toHaveBeenCalledTimes(1);
    expect(CreatePersonUseCase.prototype.execute).toHaveBeenCalledWith(
      mockData
    );
    expect(result).toEqual(mockPersonId);
  });

  test("Deve propagar o erro caso ocorra uma exceção", async () => {
    const mockData: PersonSchema = {
      name: "John Doe",
      birthDate: new Date(),
      document: "123456789",
      gender: "M",
      id: "12345",
      nacionality: "Brasil",
      phone: "123456789",
      telephone: "123456789",
    };
    const mockError = new Error("Erro ao criar pessoa");

    // const createPersonUseCaseMock = jest.fn().mockImplementation(() => ({
    //   execute: jest.fn().mockRejectedValueOnce(mockError),
    // }));

    // CreatePersonUseCase.mockImplementation(createPersonUseCaseMock);

    jest
      .spyOn(CreatePersonUseCase.prototype, "execute")
      .mockRejectedValueOnce(mockError);

    await expect(CreatePersonService(mockData)).rejects.toThrow(mockError);
  });
});
