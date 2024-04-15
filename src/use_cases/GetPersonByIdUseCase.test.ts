import GetPersonByIdUseCase from "../../src/use_cases/GetPersonByIdUseCase";
import { Database } from "../../src/infra/database";

describe("[UseCase] - GetPersonByIdUseCase", () => {
  let getPersonByIdUseCase: GetPersonByIdUseCase;

  beforeEach(() => {
    getPersonByIdUseCase = new GetPersonByIdUseCase();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Deve retornar uma pessoa pelo ID com sucesso", async () => {
    const personId = "person-id";
    const expectedPerson = {
      id: personId,
      birthDate: new Date(),
      createdAt: new Date(),
      document: "document-id",
      gender: "male",
      nacionality: "Brazilian",
      name: "John Doe",
      phone: "123456789",
      telephone: "987654321",
      updatedAt: new Date(),
      is_client: false,
    };

    const findUniqueSpy = jest
      .spyOn(Database.person, "findUnique")
      .mockResolvedValueOnce(expectedPerson);

    const result = await getPersonByIdUseCase.execute(personId);

    expect(findUniqueSpy).toHaveBeenCalledWith({
      where: {
        id: personId,
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
    expect(result).toEqual(expectedPerson);
  });

  test("Deve lançar um erro quando a pessoa não for encontrada", async () => {
    const personId = "person-id";

    jest.spyOn(Database.person, "findUnique").mockResolvedValueOnce(null);
    try {
      jest
        .spyOn(GetPersonByIdUseCase.prototype, "execute")
        .mockRejectedValueOnce(new Error("Person not found"));

      expect(
        await GetPersonByIdUseCase.prototype.execute(personId)
      ).rejects.toThrow("Person not found");
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as any).message).toBe("Person not found");
    }
  });
});
