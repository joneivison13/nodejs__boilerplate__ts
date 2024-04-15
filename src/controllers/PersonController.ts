import { NextFunction, Request, Response } from "express";
import { PersonSchema } from "../schemas/person";
import {
  CreatePersonService,
  GetPersonByIdService,
  GetPersonService,
} from "../services/PersonService";

export default class PersonController {
  constructor() {}

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as PersonSchema;

      const results = await CreatePersonService(data);

      return res.status(201).json({ id: results });
    } catch (error) {
      next(error);
    }
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await GetPersonService();
      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const results = await GetPersonByIdService(id);
      return res.status(200).json(results);
    } catch (error) {
      next(error);
    }
  }
}
