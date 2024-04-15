import { CreateDocumentService } from "../../src/services/DocumentService";
import CreateDocumentUseCase from "../../src/use_cases/CreateDocumentUseCase";
import { DocumentSchema } from "../../src/schemas/document";

enum DocumentType {
  RG,
  CNH,
}

// jest.mock("../../src/use_cases/CreateDocumentUseCase");

describe("[Service] - CreateDocumentService", () => {
  const mockDocument: DocumentSchema = {
    type: DocumentType.CNH as any,
    value: "123456789",
    file: "file.pdf",
  };
  const mockPerson = "John Doe";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Deve chamar o CreateDocumentUseCase com os parâmetros corretos", async () => {
    const executeMock = jest.fn();

    jest.spyOn(CreateDocumentUseCase.prototype, "execute").mockResolvedValue({
      createdAt: new Date(),
      id: "12345",
      type: DocumentType.CNH,
      updatedAt: new Date(),
      value: "123456789",
      file: "file.pdf",
      file_dir: "file_dir",
      personId: "12345",
    });

    await CreateDocumentService(mockDocument, mockPerson);

    expect(CreateDocumentUseCase.prototype.execute).toHaveBeenCalledTimes(1);
    expect(CreateDocumentUseCase.prototype.execute).toHaveBeenCalledWith(
      mockDocument,
      mockPerson
    );
  });

  test("Deve retornar o ID do documento criado", async () => {
    const mockId = "12345";

    jest
      .spyOn(CreateDocumentUseCase.prototype, "execute")
      .mockImplementation(jest.fn().mockResolvedValue({ id: mockId }));

    const result = await CreateDocumentService(mockDocument, mockPerson);

    expect(result).toEqual(mockId);
  });

  test("Deve lançar um erro se ocorrer um erro no CreateDocumentUseCase", async () => {
    const mockError = new Error("Erro ao criar documento");

    jest
      .spyOn(CreateDocumentUseCase.prototype, "execute")
      .mockImplementation(jest.fn().mockRejectedValue(mockError));

    await expect(
      CreateDocumentService(mockDocument, mockPerson)
    ).rejects.toThrow(mockError);
  });
});
