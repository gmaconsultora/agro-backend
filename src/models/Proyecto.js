import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Proyecto = sequelize.define("proyectos", {
  pro_codigo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pro_nro_dia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pro_nro_expediente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pro_fecha_declaracion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  pro_tipo_estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pro_nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pro_ubicacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pro_fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  pro_consultora: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pro_nro_cta: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pro_nro_finca: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pro_nro_padron: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pro_presupuesto: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pro_descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  prop_documento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_nacionalidad: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_tipo_persona: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  prop_telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_persona_juridica: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_sexo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_rep_documento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_rep_nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_rep_apellido: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prop_rep_sexo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Proyecto.sync({ force: false });
