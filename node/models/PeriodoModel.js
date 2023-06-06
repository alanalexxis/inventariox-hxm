// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const periodoModel = db.define("periodo", {
  idperiodos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nomPeriodos: { type: DataTypes.STRING },
  anio: { type: DataTypes.STRING },
});

export default periodoModel;
