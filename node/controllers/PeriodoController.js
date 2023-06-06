//importamos el modelo
import periodoModel from "../models/PeriodoModel.js";
//metodos para el crud

//mostar todos los registros

export const getAllPeriodos = async (req, res) => {
  try {
    const periodos = await periodoModel.findAll();
    res.json(
      periodos.map((periodo) => ({
        idperiodos: periodo.idperiodos,
        nomPeriodos: periodo.nomPeriodos,
        anio: periodo.anio,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getPeriodo = async (req, res) => {
  try {
    const periodo = await periodoModel.findAll({
      where: { idperiodos: req.params.id },
    });
    res.json(periodo[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createPeriodo = async (req, res) => {
  try {
    await periodoModel.create(req.body);
    res.json({
      message: "Periodo creada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updatePeriodo = async (req, res) => {
  try {
    await periodoModel.update(req.body, {
      where: { idperiodos: req.params.id },
    });
    res.json({
      message: "Periodo actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deletePeriodo = async (req, res) => {
  try {
    await periodoModel.destroy({
      where: { idperiodos: req.params.id },
    });
    res.json({
      message: "Periodo eliminada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
