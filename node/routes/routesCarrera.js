import express from "express";

import {
  createCarrera,
  deleteCarrera,
  getAllCarreras,
  getCarrera,
  updateCarrera,
} from "../controllers/CarreraController.js";

const router = express.Router();

router.get("/", getAllCarreras);
router.get("/:id", getCarrera);
router.post("/", createCarrera);
router.put("/:id", updateCarrera);
router.delete("/:id", deleteCarrera);
export default router;
