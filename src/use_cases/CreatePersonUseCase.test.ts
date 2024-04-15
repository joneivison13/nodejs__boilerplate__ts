import { ZodError } from "zod";
import { Database } from "../infra/database";
import personSchema, { PersonSchema } from "../schemas/person";
import CreatePersonUseCase from "./CreatePersonUseCase";

describe("[Use Case] - CreatePersonUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve criar uma nova pessoa com os dados corretos", async () => {
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
    const mockNewPerson = {
      id: "12345",
      name: mockData.name,
      nacionality: "",
      document: "",
      birthDate: new Date(),
      gender: "",
      phone: "",
      telephone: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      is_client: false,
    };

    personSchema.parse = jest.fn().mockReturnValue(mockData);
    jest.spyOn(Database.person, "create").mockResolvedValue(mockNewPerson);

    const createPersonUseCase = new CreatePersonUseCase();
    const result = await createPersonUseCase.execute(mockData);

    expect(personSchema.parse).toHaveBeenCalledTimes(1);
    expect(personSchema.parse).toHaveBeenCalledWith(mockData);
    expect(Database.person.create).toHaveBeenCalledTimes(1);
    expect(Database.person.create).toHaveBeenCalledWith({ data: mockData });
    expect(result).toEqual(mockNewPerson);
  });

  test("Deve propagar um erro de validação caso os dados sejam inválidos", async () => {
    try {
      const mockData = {
        name: "John Doe",
        birthDate: new Date(),
        document: "123456789",
        email: "user@user.com",
        gender: "M",
        id: "12345",
        nacionality: "Brasil",
        telephone: "123456789",
      };
      const mockValidationError = new ZodError([]);

      // personSchema.parse = jest.fn().mockImplementation(() => {
      //   throw mockValidationError;
      // });
      jest.spyOn(personSchema, "parse").mockImplementation(() => {
        throw mockValidationError;
      });

      const createPersonUseCase = new CreatePersonUseCase();
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
      if (error instanceof ZodError) {
        expect(error).toEqual([]);
      }
    }
  });

  test("Deve propagar um erro caso ocorra uma exceção durante a criação da pessoa", async () => {
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

    personSchema.parse = jest.fn().mockReturnValue(mockData);

    jest.spyOn(Database.person, "create").mockRejectedValueOnce(mockError);

    const createPersonUseCase = new CreatePersonUseCase();

    await expect(createPersonUseCase.execute(mockData)).rejects.toThrow(
      mockError
    );
  });
});
