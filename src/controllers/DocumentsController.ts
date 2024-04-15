import { NextFunction, Request, Response } from "express";
import { CreateDocumentService } from "../services/DocumentService";

export default class DocumentsController {
  constructor() {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const document = await CreateDocumentService(
        {
          type: data.type,
          value: data.value,
          file_dir: req.file?.path,
        },
        data.person
      );
      return res.status(201).json({ id: document });
    } catch (error) {
      next(error);
    }
  }
}
