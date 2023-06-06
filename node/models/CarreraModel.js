// importamos la conexion de la bd
import db from "../database/db.js";
import directorModel from "./DirectorModel.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const carreraModel = db.define("carrera", {
  idcarreras: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nomCarreras: { type: DataTypes.STRING },
  turno: { type: DataTypes.STRING },
  iddirectores: {
    type: DataTypes.INTEGER,
    references: {
      model: directorModel,
      key: "iddirectores",
    },
  },
});
// Definir la asociación entre la tabla de tutores y la tabla de usuarios
carreraModel.belongsTo(directorModel, {
  foreignKey: "iddirectores",
  as: "director",
});

export default carreraModel;
