import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { Database } from "../infra/database";
import { AddressSchema } from "../schemas/address";
import CreateAddressUseCase from "./CreateAddressUseCase";

describe("[UseCase] - CreateAddressUseCase", () => {
  let createAddressUseCase: CreateAddressUseCase;

  beforeEach(() => {
    createAddressUseCase = new CreateAddressUseCase();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should create an address and return the data", async () => {
    // Arrange
    const address: AddressSchema = {
      city: "city",
      state: "state",
      street: "street",
    };
    const personId = "personId";

    jest.spyOn(Database.address, "create").mockResolvedValueOnce({
      ...address,
      id: "addressId",
      createdAt: new Date(),
      personId,
      updatedAt: new Date(),
    });

    // Act
    const result = await createAddressUseCase.execute(address, personId);

    // Assert
    expect(result).toEqual({
      city: "city",
      state: "state",
      street: "street",
      id: "addressId",
      createdAt: expect.any(Date),
      personId,
      updatedAt: expect.any(Date),
    });
    expect(Database.address.create).toHaveBeenCalledWith({
      data: { ...address, person: { connect: { id: personId } } },
    });
  });

  test("should throw an error if person is not found", async () => {
    // Arrange
    const address: AddressSchema = {
      city: "city",
      state: "state",
      street: "street",
    };
    const personId = "personId";

    jest.spyOn(Database.address, "create").mockRejectedValueOnce(
      new PrismaClientValidationError("Person not found", {
        clientVersion: "1.0.0",
      })
    );

    // Act & Assert
    await expect(
      createAddressUseCase.execute(address, personId)
    ).rejects.toThrow("Person not found");
  });

  test("should throw an error if an unexpected error occurs", async () => {
    try {
      // Arrange
      const address: AddressSchema = {
        city: "city",
        state: "state",
        street: "street",
      };
      const personId = "personId";

      jest
        .spyOn(Database.address, "create")
        .mockRejectedValueOnce(new Error("Unexpected error"));
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as any).message).toBe("Unexpected error");
    }
  });
});
