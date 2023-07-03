import express from "express";
import {
  createSalida,
  deleteSalida,
  getAllSalidas,
  getSalida,
  updateSalida,
} from "../controllers/SalidaController.js";

const router = express.Router();

router.get("/", getAllSalidas);
router.get("/:id", getSalida);
router.post("/", createSalida);
router.put("/:id", updateSalida);
router.delete("/:id", deleteSalida);

export default router;

