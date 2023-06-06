import express from "express";

import {
  createAlumno,
  deleteAlumno,
  getAllAlumnos,
  getAlumno,
  updateAlumno,
} from "../controllers/AlumnoController.js";

const router = express.Router();

router.get("/", getAllAlumnos);
router.get("/:id", getAlumno);
router.post("/", createAlumno);
router.put("/:id", updateAlumno);
router.delete("/:id", deleteAlumno);
export default router;
