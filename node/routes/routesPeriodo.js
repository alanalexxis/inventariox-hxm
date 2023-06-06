import express from "express";

import {
  createPeriodo,
  deletePeriodo,
  getAllPeriodos,
  getPeriodo,
  updatePeriodo,
} from "../controllers/PeriodoController.js";

const router = express.Router();

router.get("/", getAllPeriodos);
router.get("/:id", getPeriodo);
router.post("/", createPeriodo);
router.put("/:id", updatePeriodo);
router.delete("/:id", deletePeriodo);
export default router;
