// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const motivoModel = db.define("motivo", {
  idmotivos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nomMotivos: { type: DataTypes.STRING },
});

export default motivoModel;
