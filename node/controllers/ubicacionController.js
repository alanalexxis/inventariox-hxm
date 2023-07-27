//importamos el modelo
import ubicacionModel from "../models/UbicacionModel.js";

export const getAllUbicacions = async (req, res) => {
  try {
    const ubicacions = await ubicacionModel.findAll();
    res.json(
      ubicacions.map((ubicacion) => ({
        idubicacions: ubicacion.idubicacions,
        nomUbicacion: ubicacion.nomUbicacion,
       
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getUbicacion = async (req, res) => {
  try {
    const ubicacion = await ubicacionModel.findAll({
      where: { idubicacions: req.params.id },
    });
    res.json(ubicacion[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createUbicacion = async (req, res) => {
  try {
    await ubicacionModel.create(req.body);
    res.json({
      message: "Ubicacion creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateUbicacion = async (req, res) => {
  try {
    await ubicacionModel.update(req.body, {
      where: { idubicacions: req.params.id },
    });
    res.json({
      message: "Ubicacion actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteUbicacion = async (req, res) => {
  try {
    await ubicacionModel.destroy({
      where: { idubicacions: req.params.id },
    });
    res.json({
      message: "Ubicacion eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};



