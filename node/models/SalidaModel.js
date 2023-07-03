// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";
import areaModel from "./AreaModel.js";
import productoModel from "./ProductoModel.js";

const salidaModel = db.define("salida", {
  idsalidas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  numSalidas: { type: DataTypes.INTEGER },
  numSap: { type: DataTypes.STRING},
  nomTecnico: { type: DataTypes.STRING},
  costoTotal: { type: DataTypes.FLOAT },
  fechaSalida: { type: DataTypes.DATE },
 
});

// Definir la asociación entre la tabla de usuarios y la tabla de area
salidaModel.belongsTo(areaModel, {
  foreignKey: "idareas",
  as: "area",
});
// Definir la asociación entre la tabla de usuarios y la tabla de producto
salidaModel.belongsTo(productoModel, {
  foreignKey: "idproductos",
  as: "producto",
});

export default salidaModel;
