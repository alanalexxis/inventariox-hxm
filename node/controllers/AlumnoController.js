// importamos el modelo de Alumno
import alumnoModel from "../models/AlumnoModel.js";
import usuarioModel from "../models/UsuarioModel.js";

// métodos para el CRUD de Alumno
export const getAllAlumnos = async (req, res) => {
  try {
    const alumnos = await alumnoModel.findAll({
      include: { model: usuarioModel, as: "usuario" },
    });
    res.json(
      alumnos.map((alumno) => ({
        idalumnos: alumno.idalumnos,
        matricula: alumno.matricula,
        nombre: alumno.nombre,
        correo: alumno.usuario.correo,
        contrasena: alumno.usuario.contrasena,
        idrangos: alumno.usuario.idrangos,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getAlumno = async (req, res) => {
  try {
    const alumno = await alumnoModel.findAll({
      include: { model: usuarioModel, as: "usuario" },
      where: { idalumnos: req.params.id },
    });
    res.json(alumno[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createAlumno = async (req, res) => {
  try {
    await alumnoModel.create(req.body);
    res.json({
      message: "Alumno creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateAlumno = async (req, res) => {
  try {
    await alumnoModel.update(req.body, {
      where: { idalumnos: req.params.id },
    });
    res.json({
      message: "Alumno actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteAlumno = async (req, res) => {
  try {
    await alumnoModel.destroy({
      where: { idalumnos: req.params.id },
    });
    res.json({
      message: "Alumno eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
