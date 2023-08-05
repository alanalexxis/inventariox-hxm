import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const URI = process.env.REACT_APP_API_BACKEND + "usuarios/";

const CompEditUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [idrangos, setIdrangos] = useState("");
  const navigate = useNavigate();
  const { idusuarios } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  //procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    if (!correo.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setError("El formato del correo es incorrecto.");
    } else if (contrasena.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
    } else if (!idrangos) {
      setError("Selecciona un rango.");
    } else {
      await axios.put(URI + idusuarios, {
        nombre: nombre,
        correo: correo,
        contrasena: contrasena,
        idrangos: idrangos,
      });
      navigate("/admin/data-tables");
    }
  };
  useEffect(() => {
    const getBlogById = async () => {
      const res = await axios.get(URI + idusuarios);
      setCorreo(res.data.correo);
      setContrasena(res.data.contrasena);
      setIdrangos(res.data.idrangos);
      setNombre(res.data.nombre);
    };
    getBlogById();
  }, [idusuarios]);

  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xs p-4 sm:w-full">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-hidden dark:bg-navy-800  ">
            <form className="" onSubmit={update}>
              {/* Renderizar mensaje de error si existe */}
              {error && (
                <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                  {error}
                </p>
              )}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Nombre
                </label>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingrese un nombre."
                  required
                ></input>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Correo
                </label>
                <input
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-navy-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="example@mail.com"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                    required
                  />
                  <button
                    type="button" // Cambiar el tipo de botón a "button"
                    className="absolute right-2 top-4 focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-600 dark:text-gray-400" />
                    ) : (
                      <FaEye className="text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un rango para el usuario
                </label>
                <select
                  value={idrangos}
                  onChange={(e) => setIdrangos(e.target.value)}
                  type="number"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-navy-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="1">Alumno</option>
                  <option value="2">Tutor</option>
                  <option value="3">Director</option>
                </select>
              </div>
              <button
                type="submit"
                className=" mt-10 w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
              >
                Actualizar
              </button>
            </form>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 z-0 w-full"></div>
      </div>
    </>
  );
};

export default CompEditUsuario;
