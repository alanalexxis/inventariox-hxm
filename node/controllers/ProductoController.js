//importamos el modelo
import productoModel from "../models/ProductoModel.js";
import categoriaModel from "../models/CategoriaModel.js";

export const getAllProductos = async (req, res) => {
  try {
    const productos = await productoModel.findAll({
      include: { model: categoriaModel, as: "categoria" },
    });
    res.json(
      productos.map((producto) => ({
        idproductos: producto.idproductos,
        codBarras: producto.codBarras,
        descripcion: producto.descripcion,
        totalEntradas: producto.totalEntradas,
        totalSalidas: producto.totalSalidas,
        totalProductos: producto.totalProductos,
        costoUnitario: producto.costoUnitario,
        costoTotal: producto.costoTotal,
        nomCategorias: producto.categoria.nomCategorias,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getProducto = async (req, res) => {
  try {
    const producto = await productoModel.findAll({
      where: { idproductos: req.params.id },
    });
    res.json(producto[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createProducto = async (req, res) => {
  try {
    await productoModel.create(req.body);
    res.json({
      message: "Producto creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateProducto = async (req, res) => {
  try {
    await productoModel.update(req.body, {
      where: { idproductos: req.params.id },
    });
    res.json({
      message: "Producto actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteProducto = async (req, res) => {
  try {
    await productoModel.destroy({
      where: { idproductos: req.params.id },
    });
    res.json({
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
