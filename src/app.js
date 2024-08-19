//librerias
import express from "express";
import cors from "cors";
import http from "http";
import { Server as WebSocketServer } from "socket.io";
//routes
import userRoutes from "./routes/users.routes.js";
import authenticationRoutes from "./routes/authentication.routes.js";
import proyectosRoutes from "./routes/proyectos.routes.js";
import documentosRoutes from "./routes/documentos.routes.js";
import notificacionesRoutes from "./routes/notificaciones.routes.js";
import proyectosDocumentosRoutes from "./routes/proyectos_documentos.routes.js";
//cronjos
import "./cronjobs/cronjob.js";
//middleware
import logger from "./middleware/logger.js";

const app = express();

export const server = http.createServer(app);
const io = new WebSocketServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(logger);
app.get("/serve", (req, res) => {
  res.send("¡El servidor está funcionando correctamente!");
});
let socketID;
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  socketID = socket.id;

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Ejemplo de enviar notificación
export const sendNotification = (message) => {
  io.emit("nuevaNotificacion", message);
};

export const updateListProyectos = (message) => {
  io.emit("updateListProyectos", socketID);
};

//middlewares
app.use(express.json());

app.use("/v1/api", userRoutes);
app.use("/v1/api/auth", authenticationRoutes);
app.use("/v1/api", proyectosRoutes);
app.use("/v1/api", documentosRoutes);
app.use("/v1/api", notificacionesRoutes);
app.use("/v1/api", proyectosDocumentosRoutes);

export default app;
export { io };
