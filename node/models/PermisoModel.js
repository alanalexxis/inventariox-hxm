// importamos la conexion de la bd
import db from "../database/db.js";

import alumnogrupoModel from "./AlumnoGrupoModel.js";
import motivoModel from "./MotivoModel.js";

//importamos sequelize
import { DataTypes } from "sequelize";

const permisoModel = db.define("permiso", {
  idpermisos: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  fecSolicitud: { type: DataTypes.DATE },
  fecInic: { type: DataTypes.DATE },
  fecFin: { type: DataTypes.DATE },
  horaInic: { type: DataTypes.STRING },
  horaFin: { type: DataTypes.STRING },
  espMotivos: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING },
  observaciones: { type: DataTypes.STRING },

  idAlumnosGrupos: {
    type: DataTypes.INTEGER,
    references: {
      model: alumnogrupoModel,
      key: "idAlumnosGrupos",
    },
  },

  idmotivos: {
    type: DataTypes.INTEGER,
    references: {
      model: motivoModel,
      key: "idmotivos",
    },
  },
});

// Definir la asociación entre la tabla de usuarios y la tabla de rangos
permisoModel.belongsTo(alumnogrupoModel, {
  foreignKey: "idAlumnosGrupos",
  as: "alumnogrupo",
});
permisoModel.belongsTo(motivoModel, {
  foreignKey: "idmotivos",
  as: "motivo",
});

export default permisoModel;
