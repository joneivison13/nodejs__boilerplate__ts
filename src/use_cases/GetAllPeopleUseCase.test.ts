import GetAllPeopleUseCase from "./GetAllPeopleUseCase";
import { Database } from "../infra/database";

describe("[Use Case] - GetAllPeopleUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve retornar uma lista de pessoas", async () => {
    const mockPeople = [
      {
        id: "1",
        name: "John Doe",
        birthDate: new Date(),
        document: "123456789",
        email: "user@user.com",
        gender: "M",
        nacionality: "Brasil",
        phone: "123456789",
        telephone: "123456789",
        createdAt: new Date(),
        updatedAt: new Date(),
        is_client: true,
      },
      {
        id: "2",
        name: "Jane Doe",
        birthDate: new Date(),
        document: "987654321",
        email: "user2@user.com",
        gender: "F",
        nacionality: "Brasil",
        phone: "987654321",
        telephone: "987654321",
        createdAt: new Date(),
        updatedAt: new Date(),
        is_client: true,
      },
    ];

    jest.spyOn(Database.person, "findMany").mockResolvedValueOnce(mockPeople);

    const getAllPeopleUseCase = new GetAllPeopleUseCase();
    const result = await getAllPeopleUseCase.execute();

    expect(Database.person.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPeople);
  });
});
