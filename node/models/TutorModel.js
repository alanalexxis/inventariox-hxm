// importamos la conexion de la bd
import db from "../database/db.js";
import usuarioModel from "../models/UsuarioModel.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const tutorModel = db.define("tutor", {
  idtutores: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nombre: { type: DataTypes.STRING },
  idusuarios: {
    type: DataTypes.INTEGER,
    references: {
      model: usuarioModel,
      key: "idusuarios",
    },
  },
});

// Definir la asociación entre la tabla de tutores y la tabla de usuarios
tutorModel.belongsTo(usuarioModel, {
  foreignKey: "idusuarios",
  as: "usuario",
});

export default tutorModel;
