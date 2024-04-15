import { NextFunction, Request, Response } from "express";
import { CreateAddressService } from "../services/AddressService";
import { AddressSchema } from "../schemas/address";

export default class AddressController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const address = await CreateAddressService(
        {
          street: data.street,
          city: data.city,
          state: data.state,
        },
        data.person
      );
      return res.status(201).json({ id: address });
    } catch (error) {
      next(error);
    }
  }
}
