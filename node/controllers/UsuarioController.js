//importamos el modelo
import usuarioModel from "../models/UsuarioModel.js";
import rangoModel from "../models/RangoModel.js";

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.findAll({
      include: { model: rangoModel, as: "rango" },
    });
    res.json(
      usuarios.map((usuario) => ({
        idusuarios: usuario.idusuarios,
        correo: usuario.correo,
        nombre: usuario.nombre,
        contrasena: usuario.contrasena,
        idrangos: usuario.rango.idusuarios,
        nomRangos: usuario.rango.nomRangos,
        image: usuario.image,
      }))
    );
  } catch (error) {
    res.json({ message: error.message });
  }
};

//mostrar un registro

export const getUsuario = async (req, res) => {
  try {
    const usuario = await usuarioModel.findAll({
      where: { idusuarios: req.params.id },
    });
    res.json(usuario[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

//crear un registro

export const createUsuario = async (req, res) => {
  try {
    await usuarioModel.create(req.body);
    res.json({
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//actualizar un registro

export const updateUsuario = async (req, res) => {
  try {
    await usuarioModel.update(req.body, {
      where: { idusuarios: req.params.id },
    });
    res.json({
      message: "Usuario actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

//eliminar un registro

export const deleteUsuario = async (req, res) => {
  try {
    await usuarioModel.destroy({
      where: { idusuarios: req.params.id },
    });
    res.json({
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
