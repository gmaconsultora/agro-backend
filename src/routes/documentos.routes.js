import { Router } from "express";
import {
  getDocumentos,
  createDocumento,
  updateDocumento,
  deleteDocumento,
} from "../controllers/documentos.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/documentos/:id", getDocumentos);
// router.get("/proyecto/:id", getProyectoById);
router.post("/documento", authenticateToken, createDocumento);
router.put("/documento/:id", authenticateToken, updateDocumento);
router.delete("/documento/:id", authenticateToken, deleteDocumento);

export default router;
