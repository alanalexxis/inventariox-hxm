import { DataTypes } from "sequelize";
import db from "../database/db.js";

const categoriaModel = db.define(
  "categoria",
  {
    idcategorias: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nomCategorias: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "categorias",
  }
);

export default categoriaModel;
