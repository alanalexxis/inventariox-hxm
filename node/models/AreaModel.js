// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const areaModel = db.define("area", {
  idareas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nomArea: { type: DataTypes.STRING },
});

export default areaModel;
