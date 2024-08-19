import { Router } from "express";
import {
  getProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} from "../controllers/proyectos.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = Router();

router.get(
  "/proyectos/:limit/:pagination/:query",
  authenticateToken,
  getProyectos
);
router.get("/proyecto/:id", authenticateToken, getProyectoById);
router.post("/proyecto", authenticateToken, createProyecto);
router.put("/proyecto/:id", authenticateToken, updateProyecto);
router.delete("/proyecto/:id", authenticateToken, deleteProyecto);

export default router;
