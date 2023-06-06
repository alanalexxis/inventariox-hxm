// importamos el modelo de Tutor
import tutorModel from "../models/TutorModel.js";
import usuarioModel from "../models/UsuarioModel.js";

// métodos para el CRUD de Tutor
export const getAllTutores = async (req, res) => {
  try {
    const tutores = await tutorModel.findAll({
      include: { model: usuarioModel, as: "usuario" },
    });
    res.json(
      tutores.map((tutor) => ({
        idtutores: tutor.idtutores,
        nombre: tutor.nombre,

        correo: tutor.usuario.correo, // aquí se accede a la columna "nomRangos" d
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getTutor = async (req, res) => {
  try {
    const tutor = await tutorModel.findAll({
      include: { model: usuarioModel, as: "usuario" },
      where: { idtutores: req.params.id },
    });
    res.json(tutor[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createTutor = async (req, res) => {
  try {
    await tutorModel.create(req.body);
    res.json({
      message: "Tutor creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateTutor = async (req, res) => {
  try {
    await tutorModel.update(req.body, {
      where: { idtutores: req.params.id },
    });
    res.json({
      message: "Tutor actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteTutor = async (req, res) => {
  try {
    await tutorModel.destroy({
      where: { idtutores: req.params.id },
    });
    res.json({
      message: "Tutor eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
