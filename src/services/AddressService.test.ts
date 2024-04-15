import { AddressSchema } from "../schemas/address";
import CreateAddressUseCase from "../use_cases/CreateAddressUseCase";
import { CreateAddressService } from "./AddressService";

jest.mock("../use_cases/CreateAddressUseCase");

describe("[Service] - CreateAddressService", () => {
  let createAddressUseCaseMock: jest.Mocked<CreateAddressUseCase>;

  beforeEach(() => {
    createAddressUseCaseMock = new CreateAddressUseCase() as jest.Mocked<
      CreateAddressUseCase
    >;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should create an address and return the address ID", async () => {
    // Arrange
    const address: AddressSchema = {
      city: "city",
      state: "state",
      street: "street",
    };
    const personId = "personId";
    const addressId = "addressId";

    jest
      .spyOn(CreateAddressUseCase.prototype, "execute")
      .mockResolvedValueOnce({
        ...address,
        id: addressId,
        createdAt: new Date(),
        personId,
        updatedAt: new Date(),
      });

    // Act
    const result = await CreateAddressService(address, personId);

    // Assert
    expect(result).toBe(addressId);
    expect(CreateAddressUseCase.prototype.execute).toHaveBeenCalledWith(
      address,
      personId
    );
  });

  test("should throw an error if an unexpected error occurs", async () => {
    // Arrange
    const address: AddressSchema = {
      city: "city",
      state: "state",
      street: "street",
    };
    const personId = "personId";
    const errorMessage = "Unexpected error";
    try {
      jest
        .spyOn(createAddressUseCaseMock, "execute")
        .mockRejectedValueOnce(new Error(errorMessage));
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as any).message).toBe(errorMessage);
      expect(createAddressUseCaseMock.execute).toHaveBeenCalledWith(
        address,
        personId
      );
    }
  });
});
