import { Request, Response } from "express";
import HelloWorldUseCase from "../use_cases/HelloWorld";

export default class HelloWorldController {
  useCase: HelloWorldUseCase;
  constructor(useCase: HelloWorldUseCase) {
    this.useCase = useCase;
    this.handle = this.handle.bind(this);
  }
  async handle(req: Request, res: Response) {
    setTimeout(async () => {
      return res.json(await this.useCase.execute());
    }, 5000);
  }
}
