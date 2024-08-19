import { Notificacion } from "../models/Notificacion.js";
import { sequelize } from "../database/database.js";
import { QueryTypes } from "sequelize";
import { io } from "../app.js";

export const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.findAll();

    res.status(200).json({ ok: true, notificaciones });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createNotificacion = async (req, res) => {
  try {
    let notificacion = await Notificacion.create(req.body);

    res.status(200).json({ ok: true, notificacion });
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};

export const updateNotificacion = async (req, res) => {
  try {
    const { id } = req.params;

    let notificacion = await Notificacion.update(req.body, {
      where: { noti_codigo: id },
    });

    res.status(200).json({ ok: true, notificacion });
  } catch (error) {
    res
      .status(200)
      .json({ ok: false, message: `No existe el ID ${id} en notificaciones` });
  }
};

export const updateVistoNotificacion = async (req, res) => {
  try {
    const { id } = req.params;

    // Actualiza el campo noti_visto a true
    const [updated] = await Notificacion.update(
      { noti_visto: true },
      {
        where: { noti_codigo: id },
      }
    );

    if (updated) {
      io.emit("notificacionActualizada");
      res.status(200).json({ ok: true });
    } else {
      res.status(404).json({
        ok: false,
        message: `No existe el ID ${id} en notificaciones`,
      });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const deleteNotificacion = async (req, res) => {
  try {
    const { id } = req.params;

    const notificacion = await Documento.destroy({
      where: { noti_codigo: id },
    });

    if (notificacion > 0) {
      res.status(200).json({ ok: true });
    } else {
      res.status(200).json({
        ok: false,
        message: `No existe el ID ${id} en notificaciones`,
      });
    }
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};
