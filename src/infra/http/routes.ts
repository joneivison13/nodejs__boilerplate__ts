import express from "express";
import HelloWorldController from "../../controllers/HelloWorld";
import HelloWorldUseCase from "../../use_cases/HelloWorld";
import PersonController from "../../controllers/PersonController";
import upload from "./middlewares/file_upload";
import DocumentsController from "../../controllers/DocumentsController";
import AddressController from "../../controllers/AddressController";

const router = express.Router();

/* ------------ USE CASES ------------ */
const helloWorldUseCase = new HelloWorldUseCase();

/* ----------- CONTROLLERS ----------- */
const helloWorld = new HelloWorldController(helloWorldUseCase);

router.get("/", helloWorld.handle);
router.post("/person/create", new PersonController().create);
router.get("/person", new PersonController().get);
router.get("/person/:id", new PersonController().getById);

router.post(
  "/document/create",
  upload.single("file"),
  new DocumentsController().create
);

router.post("/address/create", new AddressController().create);

export { router };
