import express from "express";

import {
  createDirector,
  deleteDirector,
  getAllDirectores,
  getDirector,
  updateDirector,
} from "../controllers/DirectorController.js";

const router = express.Router();

router.get("/", getAllDirectores);
router.get("/:id", getDirector);
router.post("/", createDirector);
router.put("/:id", updateDirector);
router.delete("/:id", deleteDirector);
export default router;
