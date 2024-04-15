import CreateDocumentUseCase from "../../src/use_cases/CreateDocumentUseCase";
import { Database } from "../../src/infra/database";
import documentSchema from "../../src/schemas/document";
enum DocumentType {
  RG,
  CNH,
}

describe("[UseCase] - CreateDocumentUseCase", () => {
  let createDocumentUseCase: CreateDocumentUseCase;

  beforeEach(() => {
    createDocumentUseCase = new CreateDocumentUseCase();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Deve criar um documento com sucesso", async () => {
    const document: any = {
      file_dir: "file-dir/aaa.a",
      type: DocumentType.CNH,
      value: "123456789",
    };
    const personId = "person-id";

    const createSpy = jest
      .spyOn(Database.document, "create")
      .mockResolvedValueOnce({
        id: "document-id",
        ...document,
      });

    const result = await createDocumentUseCase.execute(document, personId);

    expect(createSpy).toHaveBeenCalledWith({
      data: {
        ...document,
        file: "aaa.a",
        person: { connect: { id: personId } },
      },
    });
    expect(result).toEqual({ id: "document-id", ...document });
  });

  test("Deve lançar um erro quando a validação do documento falhar", async () => {
    const document = {
      title: "Invalid Document",
      content: "", // Invalid content
    };
    const personId = "person-id";

    const parseSpy = jest
      .spyOn(documentSchema, "parse")
      .mockImplementationOnce(() => {
        throw new Error("Validation error");
      });

    await expect(
      createDocumentUseCase.execute(document as any, personId)
    ).rejects.toThrow("Validation error");
    expect(parseSpy).toHaveBeenCalledWith(document);
  });

  test("Deve lançar um erro quando a pessoa não for encontrada", async () => {
    const document = {
      title: "Test Document",
      content: "Lorem ipsum dolor sit amet",
    };
    const personId = "person-id";

    const createSpy = jest
      .spyOn(Database.document, "create")
      .mockRejectedValueOnce(new Error("Person not found"));
    jest.spyOn(documentSchema, "parse").mockReturnValueOnce(document as any);

    await expect(
      createDocumentUseCase.execute(document as any, personId)
    ).rejects.toThrow("Person not found");
    expect(createSpy).toHaveBeenCalledWith({
      data: { ...document, person: { connect: { id: personId } } },
    });
  });
});
