import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl:
      process.env.DB_USE_SSL === "true"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
});
