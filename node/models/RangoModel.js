// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const rangoModel = db.define("rango", {
  idrangos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nomRangos: { type: DataTypes.STRING },
});

export default rangoModel;
