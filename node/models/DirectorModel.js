// importamos la conexion de la bd
import db from "../database/db.js";
import usuarioModel from "./UsuarioModel.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const directorModel = db.define("director", {
  iddirectores: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nombre: { type: DataTypes.STRING },
  fechaInic: { type: DataTypes.DATE },
  fechaFin: { type: DataTypes.DATE },
  idusuarios: {
    type: DataTypes.INTEGER,
    references: {
      model: usuarioModel,
      key: "idusuarios",
    },
  },
});

// Definir la asociación entre la tabla de tutores y la tabla de usuarios
directorModel.belongsTo(usuarioModel, {
  foreignKey: "idusuarios",
  as: "usuario",
});

export default directorModel;
