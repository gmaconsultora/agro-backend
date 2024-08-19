import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Proyecto } from "./Proyecto.js"; // Importa Proyecto aquí

export const Documento = sequelize.define("documentos", {
  doc_codigo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  doc_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  doc_nombre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  doc_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fk_proyecto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Proyecto,
      key: "pro_codigo",
    },
    onDelete: "CASCADE",
  },
});

// Define the association
// Documento.belongsTo(Proyecto, {
//   foreignKey: "fk_proyecto",
//   targetKey: "pro_codigo",
// });

Documento.sync({ force: false });
