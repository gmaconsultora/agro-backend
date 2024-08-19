import { Router } from "express";
import {
  getProyectosDocumentosById,
  createProyectoDocumento,
  updateProyectoDocumento,
  deleteProyectoDocumento,
} from "../controllers/proyectos_documentos.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = Router();

// router.get(
//   "/proyectos/:limit/:pagination/:query",
//   // authenticateToken,
//   getProyectos
// );
router.get(
  "/proyecto-documentos/:id",
  authenticateToken,
  getProyectosDocumentosById
);
router.post("/proyecto-documento", authenticateToken, createProyectoDocumento);
router.put(
  "/proyecto-documento/:id",
  authenticateToken,
  updateProyectoDocumento
);
router.delete(
  "/proyecto-documentos/:fk_proyecto/:fk_documento",
  authenticateToken,
  deleteProyectoDocumento
);

export default router;
