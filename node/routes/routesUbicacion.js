import express from "express";

import {
  createUbicacion,
  deleteUbicacion,
  getAllUbicacions,
  getUbicacion,
  updateUbicacion,
} from "../controllers/UbicacionController.js";

const router = express.Router();

router.get("/", getAllUbicacions);
router.get("/:id", getUbicacion);
router.post("/", createUbicacion);
router.put("/:id", updateUbicacion);
router.delete("/:id", deleteUbicacion);
export default router;

