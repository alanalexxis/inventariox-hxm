// importamos el modelo de Grupo

import grupoModel from "../models/GrupoModel.js";
import alumnoModel from "../models/AlumnoModel.js";
import alumnogrupoModel from "../models/AlumnoGrupoModel.js";
import usuarioModel from "../models/UsuarioModel.js";
import carreraModel from "../models/CarreraModel.js";
import periodoModel from "../models/PeriodoModel.js";
import tutorModel from "../models/TutorModel.js";
// métodos para el CRUD de Grupo
export const getAllAlumnosGrupos = async (req, res) => {
  try {
    const alumnosgrupos = await alumnogrupoModel.findAll({
      include: [
        {
          model: grupoModel,
          as: "grupo",
          include: [
            {
              model: carreraModel,
              as: "carrera",
              attributes: ["nomCarreras", "turno"],
            },

            {
              model: periodoModel,
              as: "periodo",
              attributes: ["nomPeriodos", "anio"],
            },
            { model: tutorModel, as: "tutor", attributes: ["nombre"] },
          ],
        },

        {
          model: alumnoModel,
          as: "alumno",
          include: [
            { model: usuarioModel, as: "usuario", attributes: ["correo"] },
          ],
        },
      ],
    });
    res.json(
      alumnosgrupos.map((alumnogrupo) => ({
        idAlumnosGrupos: alumnogrupo.idAlumnosGrupos,
        matricula: alumnogrupo.alumno.matricula,
        nombre: alumnogrupo.alumno.nombre,
        correo: alumnogrupo.alumno.usuario.correo, // se agrega el correo del usuario
        grupo: alumnogrupo.grupo.nomGrupos,
        carrera: alumnogrupo.grupo.carrera.nomCarreras,
        turno: alumnogrupo.grupo.carrera.turno,
        periodo: alumnogrupo.grupo.periodo.nomPeriodos,
        anio: alumnogrupo.grupo.periodo.anio,
        tutor: alumnogrupo.grupo.tutor.nombre,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAlumnoGrupo = async (req, res) => {
  try {
    const alumnogrupo = await alumnogrupoModel.findAll({
      include: [
        { model: alumnoModel, as: "alumno" },
        { model: grupoModel, as: "grupo" },
      ],
      where: { idAlumnosGrupos: req.params.id },
    });
    res.json(alumnogrupo[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createAlumnoGrupo = async (req, res) => {
  try {
    await alumnogrupoModel.create(req.body);
    res.json({
      message: "Asociacion entre alumno y grupo creada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateAlumnoGrupo = async (req, res) => {
  try {
    await alumnogrupoModel.update(req.body, {
      where: { idAlumnosGrupos: req.params.id },
    });
    res.json({
      message: "Relacion entre alumno-grupo actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteAlumnoGrupo = async (req, res) => {
  try {
    await alumnogrupoModel.destroy({
      where: { idAlumnosGrupos: req.params.id },
    });
    res.json({
      message: "Relacion entre alumno-grupo eliminada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
