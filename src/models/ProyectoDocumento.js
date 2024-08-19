import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Proyecto } from "./Proyecto.js";
import { Documento } from "./Documento.js";

export const ProyectoDocumento = sequelize.define("proyectos_documentos", {
  pd_codigo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  fk_proyecto: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Proyecto,
      key: "pro_codigo",
    },
    onDelete: "CASCADE",
  },

  fk_documento: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Documento,
      key: "doc_codigo",
    },
    onDelete: "CASCADE",
  },
});

// Define the association
// ProyectoDocumento.belongsTo(Proyecto, {
//   foreignKey: "fk_proyecto",
//   targetKey: "pro_codigo",
// });
// ProyectoDocumento.belongsTo(Documento, {
//   foreignKey: "fk_documento",
//   targetKey: "doc_codigo",
// });

ProyectoDocumento.sync({ force: false });
