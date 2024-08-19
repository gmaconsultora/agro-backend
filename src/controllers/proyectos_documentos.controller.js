import { ProyectoDocumento } from "../models/ProyectoDocumento.js";
import { sequelize } from "../database/database.js";
import { QueryTypes } from "sequelize";

export const getProyectosDocumentosById = async (req, res) => {
  try {
    const { id } = req.params;

    const documentos = await ProyectoDocumento.findAll({
      where: { fk_proyecto: id },
    });

    res.status(200).json({ ok: true, documentos });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createProyectoDocumento = async (req, res) => {
  try {
    let proyecto_documento = await ProyectoDocumento.create(req.body);

    res.status(200).json({ ok: true, proyecto_documento });
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};

export const updateProyectoDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    let proyecto_documento = await ProyectoDocumento.update(req.body, {
      where: { pd_codigo: id },
    });

    res.status(200).json({ ok: true, proyecto_documento });
  } catch (error) {
    res
      .status(200)
      .json({ ok: false, message: `No existe el ID ${id} en Documentos` });
  }
};

export const deleteProyectoDocumento = async (req, res) => {
  try {
    const { fk_proyecto,fk_documento } = req.params;

    const proyecto_documento = await ProyectoDocumento.destroy({
      where: { fk_proyecto: Number(fk_proyecto),fk_documento: Number(fk_documento) },
    });

    if (proyecto_documento > 0) {
      res.status(200).json({ ok: true });
    } else {
      res
        .status(200)
        .json({
          ok: false,
          message: `No existe el ID ${fk_proyecto} en proyecto_documento`,
        });
    }
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};
