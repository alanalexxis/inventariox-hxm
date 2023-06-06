import express from "express";

import {
  createAlumnoGrupo,
  deleteAlumnoGrupo,
  getAllAlumnosGrupos,
  getAlumnoGrupo,
  updateAlumnoGrupo,
} from "../controllers/AlumnoGrupoController.js";

const router = express.Router();

router.get("/", getAllAlumnosGrupos);
router.get("/:id", getAlumnoGrupo);
router.post("/", createAlumnoGrupo);
router.put("/:id", updateAlumnoGrupo);
router.delete("/:id", deleteAlumnoGrupo);
export default router;
