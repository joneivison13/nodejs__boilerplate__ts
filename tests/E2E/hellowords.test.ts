import request from "supertest";
import { app } from "../../src/app";

describe("Teste de integração da rota /", () => {
  test("Deve responder com { helloWorld: true }", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ helloWorld: true });
  });
});
