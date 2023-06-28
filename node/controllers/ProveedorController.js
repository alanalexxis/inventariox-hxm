//importamos el modelo
import proveedorModel from "../models/ProveedorModel.js";


export const getAllProveedors = async (req, res) => {
  try {
    const proveedors = await proveedorModel.findAll();
    res.json(
      proveedors.map((proveedor) => ({
        idproveedors: proveedor.idproveedors,
        nomProveedor: proveedor.nomProveedor,
       
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getProveedor = async (req, res) => {
  try {
    const proveedor = await proveedorModel.findAll({
      where: { idproveedors: req.params.id },
    });
    res.json(proveedor[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createProveedor = async (req, res) => {
  try {
    await proveedorModel.create(req.body);
    res.json({
      message: "Proveedor creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateProveedor = async (req, res) => {
  try {
    await proveedorModel.update(req.body, {
      where: { idproveedors: req.params.id },
    });
    res.json({
      message: "Proveedor actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteProveedor = async (req, res) => {
  try {
    await proveedorModel.destroy({
      where: { idproveedors: req.params.id },
    });
    res.json({
      message: "Proveedor eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


