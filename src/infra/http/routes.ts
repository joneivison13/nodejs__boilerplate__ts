import express from "express";
import HelloWorldController from "../../controllers/HelloWorld";
import HelloWorldUseCase from "../../use_cases/HelloWorld";

const router = express.Router();

/* ------------ USE CASES ------------ */
const helloWorldUseCase = new HelloWorldUseCase();

/* ----------- CONTROLLERS ----------- */
const helloWorld = new HelloWorldController(helloWorldUseCase);

router.get("/", helloWorld.handle);

export { router };
