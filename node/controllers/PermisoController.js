// importamos el modelo de Permiso
import permisoModel from "../models/PermisoModel.js";
import alumnogrupoModel from "../models/AlumnoGrupoModel.js";
import motivoModel from "../models/MotivoModel.js";
import alumnoModel from "../models/AlumnoModel.js";
import grupoModel from "../models/GrupoModel.js";
import carreraModel from "../models/CarreraModel.js";
import tutorModel from "../models/TutorModel.js";
import directorModel from "../models/DirectorModel.js";
// métodos para el CRUD de Permiso
export const getAllPermisos = async (req, res) => {
  try {
    const permisos = await permisoModel.findAll({
      include: [
        { model: motivoModel, as: "motivo" },

        {
          model: alumnogrupoModel,
          as: "alumnogrupo",
          include: [
            { model: alumnoModel, as: "alumno" },
            {
              model: grupoModel,
              as: "grupo",
              include: [
                {
                  model: carreraModel,
                  as: "carrera",
                  include: [{ model: directorModel, as: "director" }],
                },
                { model: tutorModel, as: "tutor" },
              ],
            },
          ],
        },
      ],
    });
    res.json(
      permisos.map((permiso) => ({
        idpermisos: permiso.idpermisos,
        fechasolicitud: permiso.fecSolicitud,
        fechainicio: permiso.fecInic,
        fechafin: permiso.fecFin,
        horainicio: permiso.horaInic,
        horafin: permiso.horaFin,
        espMotivos: permiso.espMotivos,
        idmotivos: permiso.motivo.idmotivos,
        motivo: permiso.motivo.nomMotivos,
        status: permiso.status,
        observaciones: permiso.observaciones,
        idAlumnosGrupos: permiso.alumnogrupo.idAlumnosGrupos,
        matricula: permiso.alumnogrupo.alumno.matricula,
        nombre: permiso.alumnogrupo.alumno.nombre,
        grupo: permiso.alumnogrupo.grupo.nomGrupos,
        carrera: permiso.alumnogrupo.grupo.carrera.nomCarreras,
        turno: permiso.alumnogrupo.grupo.carrera.turno,
        tutor: permiso.alumnogrupo.grupo.tutor.nombre,
        director: permiso.alumnogrupo.grupo.carrera.director.nombre,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getPermiso = async (req, res) => {
  try {
    const permiso = await permisoModel.findAll({
      include: [
        { model: alumnogrupoModel, as: "alumnogrupo" },
        { model: motivoModel, as: "motivo" },
      ],
      where: { idpermisos: req.params.id },
    });
    res.json(permiso[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createPermiso = async (req, res) => {
  try {
    await permisoModel.create(req.body);
    res.json({
      message: "Permiso creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updatePermiso = async (req, res) => {
  try {
    await permisoModel.update(req.body, {
      where: { idpermisos: req.params.id },
    });
    res.json({
      message: "Permiso actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deletePermiso = async (req, res) => {
  try {
    await permisoModel.destroy({
      where: { idpermisos: req.params.id },
    });
    res.json({
      message: "Permiso eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
