import HelloWorld from "../../src/use_cases/HelloWorld";

describe("[UseCase] - HelloWorld", () => {
  test("Deve responder com { helloWorld: true }", async () => {
    const helloWorld = new HelloWorld();

    expect(await helloWorld.execute()).toEqual({ helloWorld: true });
  });
});
