// importamos el modelo de Grupo
import carreraModel from "../models/CarreraModel.js";
import grupoModel from "../models/GrupoModel.js";
import periodoModel from "../models/PeriodoModel.js";
import tutorModel from "../models/TutorModel.js";
// métodos para el CRUD de Grupo
export const getAllGrupos = async (req, res) => {
  try {
    const grupos = await grupoModel.findAll({
      include: [
        { model: carreraModel, as: "carrera" },
        { model: periodoModel, as: "periodo" },
        { model: tutorModel, as: "tutor" },
      ],
    });
    res.json(
      grupos.map((grupo) => ({
        idgrupos: grupo.idgrupos,
        nomGrupos: grupo.nomGrupos,
        carrera: grupo.carrera.nomCarreras,
        periodo: grupo.periodo.nomPeriodos,
        anio: grupo.periodo.anio,
        tutor: grupo.tutor.nombre,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getGrupo = async (req, res) => {
  try {
    const grupo = await grupoModel.findAll({
      include: [
        { model: carreraModel, as: "carrera" },
        { model: periodoModel, as: "periodo" },
        { model: tutorModel, as: "tutor" },
      ],
      where: { idgrupos: req.params.id },
    });
    res.json(grupo[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createGrupo = async (req, res) => {
  try {
    await grupoModel.create(req.body);
    res.json({
      message: "Grupo creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateGrupo = async (req, res) => {
  try {
    await grupoModel.update(req.body, {
      where: { idgrupos: req.params.id },
    });
    res.json({
      message: "Grupo actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteGrupo = async (req, res) => {
  try {
    await grupoModel.destroy({
      where: { idgrupos: req.params.id },
    });
    res.json({
      message: "Grupo eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
