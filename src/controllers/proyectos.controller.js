import { Proyecto } from "../models/Proyecto.js";
import { sequelize } from "../database/database.js";
import { QueryTypes } from "sequelize";
import { updateListProyectos } from "../app.js";

export const getProyectos = async (req, res) => {
  try {
    const { limit, pagination, query } = req.params;

    let queryAdd = ``;
    if (query !== ":query") {
      queryAdd = `
           WHERE (
            p.pro_codigo::VARCHAR ILIKE '%${query}%'
            OR p.pro_nombre ILIKE '%${query}%'
            OR p.pro_descripcion ILIKE '%${query}%'
            OR p.pro_nro_expediente::VARCHAR ILIKE '%${query}%'
            OR p.pro_nro_padron::VARCHAR ILIKE '%${query}%'
            OR p.pro_nro_cta::VARCHAR ILIKE '%${query}%'
            OR p.pro_nro_finca::VARCHAR ILIKE '%${query}%'
            OR p.pro_fecha_fin::VARCHAR ILIKE '%${query}%'
            OR p.pro_presupuesto::VARCHAR ILIKE '%${query}%'
          ) `;
    }

    let sql = `select * from proyectos p ${queryAdd} 
        ORDER BY
        p.pro_fecha_fin asc 
    LIMIT
      ${limit}
    OFFSET
      ${pagination}
        `;

    const proyectos = await sequelize.query(sql, {
      type: QueryTypes.SELECT,
    });

    res.status(200).json({ ok: true, proyectos });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const getProyectoById = async (req, res) => {
  try {
    const { id } = req.params;

    // Busca el proyecto por el código
    const proyecto = await Proyecto.findOne({ where: { pro_codigo: id } });

    if (proyecto) {
      res.status(200).json({ ok: true, proyecto });
    } else {
      res
        .status(404)
        .json({ ok: false, message: `No existe el ID ${id} en proyectos` });
    }
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
};

export const createProyecto = async (req, res) => {
  try {
    let proyecto = await Proyecto.create(req.body);

    updateListProyectos("updateListProyectos");

    res.status(200).json({ ok: true, proyecto });
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};

export const updateProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    let proyecto = await Proyecto.update(req.body, {
      where: { pro_codigo: Number(id) },
    });

    updateListProyectos("updateListProyectos");

    res.status(200).json({ ok: true, proyecto });
  } catch (error) {
    res
      .status(200)
      .json({ ok: false, message: `No existe el ID ${id} en proyectos kape` });
  }
};

export const deleteProyecto = async (req, res) => {
  try {
    const { id } = req.params;

    const proyecto = await Proyecto.destroy({ where: { pro_codigo: id } });

    if (proyecto > 0) {
      updateListProyectos("updateListProyectos");
      res.status(200).json({ ok: true });
    } else {
      res
        .status(200)
        .json({ ok: false, message: `No existe el ID ${id} en proyectos` });
    }
  } catch (error) {
    res.status(200).json({ ok: false, message: error.message });
  }
};
