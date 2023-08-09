// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";
import proveedorModel from "./ProveedorModel.js";
import productoModel from "./ProductoModel.js";
const entradaModel = db.define("entrada", {
  identradas: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  numEntradas: { type: DataTypes.INTEGER },
  costoTotal: { type: DataTypes.FLOAT },
  fechaEntrada: { type: DataTypes.DATE },
  numFactura: { type: DataTypes.STRING },
  numOrden: { type: DataTypes.STRING },
  
});

// Definir la asociación entre la tabla de usuarios y la tabla de rangos
entradaModel.belongsTo(proveedorModel, {
  foreignKey: "idproveedors",
  as: "proveedor",
});
// Definir la asociación entre la tabla de usuarios y la tabla de rangos
entradaModel.belongsTo(productoModel, {
  foreignKey: "idproductos",
  as: "producto",
});

export default entradaModel;
