import express from "express";
import {
  createEntrada,
  deleteEntrada,
  getAllEntradas,
  getEntrada,
  updateEntrada,
} from "../controllers/EntradaController.js";

const router = express.Router();

router.get("/", getAllEntradas);
router.get("/:id", getEntrada);
router.post("/", createEntrada);
router.put("/:id", updateEntrada);
router.delete("/:id", deleteEntrada);

export default router;
