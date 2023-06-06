import express from "express";

import {
  createTutor,
  deleteTutor,
  getAllTutores,
  getTutor,
  updateTutor,
} from "../controllers/TutorController.js";

const router = express.Router();

router.get("/", getAllTutores);
router.get("/:id", getTutor);
router.post("/", createTutor);
router.put("/:id", updateTutor);
router.delete("/:id", deleteTutor);
export default router;
