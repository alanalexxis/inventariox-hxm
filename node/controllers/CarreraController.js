//importamos el modelo
import carreraModel from "../models/CarreraModel.js";
import directorModel from "../models/DirectorModel.js";
//metodos para el crud

//mostar todos los registros
export const getAllCarreras = async (req, res) => {
  try {
    const carreras = await carreraModel.findAll({
      include: { model: directorModel, as: "director" },
    });
    res.json(
      carreras.map((carrera) => ({
        idcarreras: carrera.idcarreras,
        nomCarreras: carrera.nomCarreras,
        turno: carrera.turno,
        director: carrera.director.nombre,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getCarrera = async (req, res) => {
  try {
    const carrera = await carreraModel.findAll({
      where: { idcarreras: req.params.id },
    });
    res.json(carrera[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createCarrera = async (req, res) => {
  try {
    await carreraModel.create(req.body);
    res.json({
      message: "Carrera creada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateCarrera = async (req, res) => {
  try {
    await carreraModel.update(req.body, {
      where: { idcarreras: req.params.id },
    });
    res.json({
      message: "Carrera actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteCarrera = async (req, res) => {
  try {
    await carreraModel.destroy({
      where: { idcarreras: req.params.id },
    });
    res.json({
      message: "Carrera eliminada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
