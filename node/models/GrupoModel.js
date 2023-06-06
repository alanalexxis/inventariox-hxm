// importamos la conexion de la bd
import db from "../database/db.js";
import carreraModel from "./CarreraModel.js";
import periodoModel from "./PeriodoModel.js";
import tutorModel from "./TutorModel.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const grupoModel = db.define("grupo", {
  idgrupos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  nomGrupos: { type: DataTypes.STRING },

  idcarreras: {
    type: DataTypes.INTEGER,
    references: {
      model: carreraModel,
      key: "idcarreras",
    },
  },
  idperiodos: {
    type: DataTypes.INTEGER,
    references: {
      model: periodoModel,
      key: "idperiodos",
    },
  },
  idtutors: {
    type: DataTypes.INTEGER,
    references: {
      model: tutorModel,
      key: "idtutors",
    },
  },
});

// Definir la asociación entre la tabla de tutores y la tabla de usuarios
grupoModel.belongsTo(carreraModel, {
  foreignKey: "idcarreras",
  as: "carrera",
});

grupoModel.belongsTo(periodoModel, {
  foreignKey: "idperiodos",
  as: "periodo",
});

grupoModel.belongsTo(tutorModel, {
  foreignKey: "idtutors",
  as: "tutor",
});

export default grupoModel;
