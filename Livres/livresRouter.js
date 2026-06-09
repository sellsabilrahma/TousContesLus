import { Router } from "express";
import {
    getAllLivres,
    getOneLivre
} from "./livresController.js"

const livreRouter = Router();
livreRouter.get("/", getAllLivres);
livreRouter.get("/:id", getOneLivre);

export default livreRouter;