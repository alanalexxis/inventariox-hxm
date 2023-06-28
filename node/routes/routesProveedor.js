import express from "express";

import {
  createProveedor,
  deleteProveedor,
  getAllProveedors,
  getProveedor,
  updateProveedor,
} from "../controllers/ProveedorController.js";

const router = express.Router();

router.get("/", getAllProveedors);
router.get("/:id", getProveedor);
router.post("/", createProveedor);
router.put("/:id", updateProveedor);
router.delete("/:id", deleteProveedor);
export default router;

