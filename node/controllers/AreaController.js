//importamos el modelo
import areaModel from "../models/AreaModel.js";

export const getAllAreas = async (req, res) => {
  try {
    const areas = await areaModel.findAll();
    res.json(
      areas.map((area) => ({
        idareas: area.idareas,
        nomArea: area.nomArea,
       
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getArea = async (req, res) => {
  try {
    const area = await areaModel.findAll({
      where: { idareas: req.params.id },
    });
    res.json(area[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createArea = async (req, res) => {
  try {
    await areaModel.create(req.body);
    res.json({
      message: "Area creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateArea = async (req, res) => {
  try {
    await areaModel.update(req.body, {
      where: { idareas: req.params.id },
    });
    res.json({
      message: "Area actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteArea = async (req, res) => {
  try {
    await areaModel.destroy({
      where: { idareas: req.params.id },
    });
    res.json({
      message: "Area eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};



