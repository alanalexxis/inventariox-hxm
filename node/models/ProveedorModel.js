// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const proveedorModel = db.define("proveedor", {
  idproveedors: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nomProveedor: { type: DataTypes.STRING },
});

export default proveedorModel;
