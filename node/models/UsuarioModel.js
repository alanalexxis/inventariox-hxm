// importamos la conexion de la bd
import db from "../database/db.js";
import rangoModel from "../models/RangoModel.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const usuarioModel = db.define("usuario", {
  idusuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  correo: { type: DataTypes.STRING },
  nombre: { type: DataTypes.STRING },
  contrasena: { type: DataTypes.STRING },
  idrangos: { type: DataTypes.INTEGER },
  image: { type: DataTypes.STRING }, // Tipo de dato para el nombre de archivo
});

// Definir la asociación entre la tabla de usuarios y la tabla de rangos
usuarioModel.belongsTo(rangoModel, {
  foreignKey: "idrangos",
  as: "rango",
});

export default usuarioModel;
