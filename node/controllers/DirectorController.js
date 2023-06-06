// importamos el modelo de Director
import directorModel from "../models/DirectorModel.js";
import usuarioModel from "../models/UsuarioModel.js";

// métodos para el CRUD de Director
export const getAllDirectores = async (req, res) => {
  try {
    const directores = await directorModel.findAll({
      include: { model: usuarioModel, as: "usuario" },
    });
    res.json(
      directores.map((director) => ({
        iddirectores: director.iddirectores,
        nombre: director.nombre,
        fechaInicio: director.fechaInic,
        fechaFin: director.fechaFin,
        correo: director.usuario.correo,
        usuario: director.usuario.usuario,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getDirector = async (req, res) => {
  try {
    const director = await directorModel.findAll({
      include: { model: usuarioModel, as: "usuario" },
      where: { iddirectores: req.params.id },
    });
    res.json(director[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createDirector = async (req, res) => {
  try {
    await directorModel.create(req.body);
    res.json({
      message: "Director creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateDirector = async (req, res) => {
  try {
    await directorModel.update(req.body, {
      where: { iddirectores: req.params.id },
    });
    res.json({
      message: "Director actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteDirector = async (req, res) => {
  try {
    await directorModel.destroy({
      where: { iddirectores: req.params.id },
    });
    res.json({
      message: "Director eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
