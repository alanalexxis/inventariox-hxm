// importamos la conexion de la bd
import db from "../database/db.js";
import alumnoModel from "./AlumnoModel.js";
import grupoModel from "./GrupoModel.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const alumnogrupoModel = db.define("alumnosgrupo", {
  idAlumnosGrupos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  idalumnos: {
    type: DataTypes.INTEGER,
    references: {
      model: alumnoModel,
      key: "idalumnos",
    },
  },
  idgrupos: {
    type: DataTypes.INTEGER,
    references: {
      model: grupoModel,
      key: "idgrupos",
    },
  },
});

// Definir la asociación entre la tabla de tutores y la tabla de usuarios
alumnogrupoModel.belongsTo(alumnoModel, {
  foreignKey: "idalumnos",
  as: "alumno",
});

alumnogrupoModel.belongsTo(grupoModel, {
  foreignKey: "idgrupos",
  as: "grupo",
});

export default alumnogrupoModel;
