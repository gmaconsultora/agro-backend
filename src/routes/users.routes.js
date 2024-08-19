import { Router } from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  updateUserEmail,
} from "../controllers/users.controllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const router = Router();

router.get("/users/:limit/:pagination/:query", authenticateToken, getUsers);
router.get("/users/:id", authenticateToken, getUser);
router.post("/users", authenticateToken, createUser);
router.put("/users/:id", updateUser);
router.put("/users/email_update/:id", authenticateToken, updateUserEmail);

router.delete("/users/:id", deleteUser);

export default router;
