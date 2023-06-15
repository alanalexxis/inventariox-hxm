// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";
import categoriaModel from "./CategoriaModel.js";

const productoModel = db.define("producto", {
  idproductos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  codBarras: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  totalEntradas: { type: DataTypes.INTEGER },
  totalSalidas: { type: DataTypes.INTEGER },
  totalProductos: { type: DataTypes.INTEGER },
  costoUnitario: { type: DataTypes.INTEGER },
  costoTotal: { type: DataTypes.INTEGER },
  idcategorias: { type: DataTypes.INTEGER },
});

// Definir la asociación entre la tabla de usuarios y la tabla de rangos
productoModel.belongsTo(categoriaModel, {
  foreignKey: "idcategorias",
  as: "categoria",
});

export default productoModel;
