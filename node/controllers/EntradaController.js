//importamos el modelo
import entradaModel from "../models/EntradaModel.js";
import proveedorModel from "../models/ProveedorModel.js";
import productoModel from "../models/ProductoModel.js";

export const getAllEntradas = async (req, res) => {
  try {
    const entradas = await entradaModel.findAll({
      include: [
        { model: proveedorModel, as: "proveedor" },
        { model: productoModel, as: "producto" },
      ],
    });
    res.json(
      entradas.map((entrada) => ({
        identradas: entrada.identradas,
        numEntradas: entrada.numEntradas,
        costoTotal: entrada.costoTotal,
        fechaEntrada: entrada.fechaEntrada,
        numFactura: entrada.numFactura,
        nomProductos: entrada.producto.descripcion,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getEntrada = async (req, res) => {
  try {
    const entrada = await entradaModel.findAll({
      where: { identradas: req.params.id },
    });
    res.json(entrada[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createEntrada = async (req, res) => {
  try {
    await entradaModel.create(req.body);
    res.json({
      message: "Entrada creada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateEntrada = async (req, res) => {
  try {
    await entradaModel.update(req.body, {
      where: { identradas: req.params.id },
    });
    res.json({
      message: "Entrada actualizada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteEntrada = async (req, res) => {
  try {
    await entradaModel.destroy({
      where: { identradas: req.params.id },
    });
    res.json({
      message: "Entrada eliminada correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
