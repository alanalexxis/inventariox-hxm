// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const ubicacionModel = db.define("ubicacion", {
  idubicacions: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nomUbicacions: { type: DataTypes.STRING },
});

export default ubicacionModel;
