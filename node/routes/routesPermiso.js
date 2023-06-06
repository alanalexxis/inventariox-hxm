import express from "express";

import {
  createPermiso,
  deletePermiso,
  getAllPermisos,
  getPermiso,
  updatePermiso,
} from "../controllers/PermisoController.js";

const router = express.Router();

router.get("/", getAllPermisos);
router.get("/:id", getPermiso);
router.post("/", createPermiso);
router.put("/:id", updatePermiso);
router.delete("/:id", deletePermiso);

export default router;
