// importamos la conexion de la bd
import db from "../database/db.js";

//importamos sequelize
import { DataTypes } from "sequelize";
import categoriaModel from "./CategoriaModel.js";
import ubicacionModel from "./UbicacionModel.js";

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
  costoUnitario: { type: DataTypes.FLOAT },
  costoTotal: { type: DataTypes.FLOAT },
  idcategorias: { type: DataTypes.INTEGER },
  idubicacions: { type: DataTypes.INTEGER },
});

// Definir la asociación entre la tabla de usuarios y la tabla de rangos
productoModel.belongsTo(ubicacionModel, {
  foreignKey: "idubicacions",
  as: "ubicacion",
});


// Definir la asociación entre la tabla de usuarios y la tabla de rangos
productoModel.belongsTo(categoriaModel, {
  foreignKey: "idcategorias",
  as: "categoria",
});




export default productoModel;
