import { Documento } from "../models/Documento.js";
import { sequelize } from "../database/database.js";
import { QueryTypes } from "sequelize";

export const getDocumentos = async (req, res) => {
  try {
    const { id } = req.params;

    const documentos = await Documento.findAll({ where: { fk_proyecto: id } });

    res.status(200).json({ ok: true, documentos });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createDocumento = async (req, res) => {
  try {
    let documento = await Documento.create(req.body);

    res.status(200).json({ ok: true, documento });
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};

export const updateDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    let documento = await Documento.update(req.body, {
      where: { doc_codigo: id },
    });

    res.status(200).json({ ok: true, documento });
  } catch (error) {
    res
      .status(200)
      .json({ ok: false, message: `No existe el ID ${id} en Documentos` });
  }
};

export const deleteDocumento = async (req, res) => {
  try {
    const { id } = req.params;

    const documento = await Documento.destroy({ where: { doc_codigo: id } });

    if (documento > 0) {
      res.status(200).json({ ok: true });
    } else {
      res
        .status(200)
        .json({ ok: false, message: `No existe el ID ${id} en Documentos` });
    }
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};
