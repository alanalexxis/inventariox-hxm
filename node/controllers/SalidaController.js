//importamos el modelo
import salidaModel from "../models/SalidaModel.js";
import areaModel from "../models/AreaModel.js";
import productoModel from "../models/ProductoModel.js";

export const getAllSalidas = async (req, res) => {
  try {
    const salidas = await salidaModel.findAll({
      include: [
        { model: areaModel, as: "area" },
        { model: productoModel, as: "producto" },
        { model: productoModel, as: "producto" },
      ],
    });
    res.json(
      salidas.map((salida) => ({
        idsalidas: salida.idsalidas,
        codBarras: salida.producto.codBarras,
        descripcion: salida.producto.descripcion,
        numSalidas: salida.numSalidas,
        numSap: salida.numSap,
        nomTecnico: salida.nomTecnico,
        nomArea: salida.area.nomArea,
        costoUnitario: salida.producto.costoUnitario,
        costoTotal: salida.costoTotal,
        fechaSalida: salida.fechaSalida,
        idproductos: salida.producto.idproductos,
     
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getSalida = async (req, res) => {
  try {
    const salida = await salidaModel.findAll({
      where: { idsalidas: req.params.id },
    });
    res.json(salida[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createSalida = async (req, res) => {
  try {
    await salidaModel.create(req.body);
    res.json({
      message: "Salida creada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateSalida = async (req, res) => {
  try {
    await salidaModel.update(req.body, {
      where: { idsalidas: req.params.id },
    });
    res.json({
      message: "Salida actualizada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteSalida = async (req, res) => {
  try {
    await salidaModel.destroy({
      where: { idsalidas: req.params.id },
    });
    res.json({
      message: "Salida eliminada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


