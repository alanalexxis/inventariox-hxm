import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ColumnsTable = (props) => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState([]);

  // Función para alternar la visibilidad de las contraseñas
  // Función para alternar la visibilidad de la contraseña de un usuario específico
  const handleTogglePassword = (userId) => {
    if (visiblePasswords.includes(userId)) {
      setVisiblePasswords(visiblePasswords.filter((id) => id !== userId));
    } else {
      setVisiblePasswords([...visiblePasswords, userId]);
    }
  };

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [idusuariosToDelete, setIdUsuariosToDelete] = useState(null);

  const [usuarios, setUsuario] = useState([]);
  useEffect(() => {
    getUsuarios();
  }, []);

  //procedimiento para mostrar todos los usuarios
  const getUsuarios = async () => {
    const res = await axios.get(URI);
    setUsuario(res.data);
  };
  //procedimiento para eliminar un usuario
  const deleteUsuario = async (idusuarios) => {
    await axios.delete(`${URI}${idusuarios}`);
    setOpen(false);
    setIdUsuariosToDelete(null);
    getUsuarios();
  };

  const handleDeleteClick = (idusuarios) => {
    setIdUsuariosToDelete(idusuarios);
    setOpen(true);
  };

  const URI = process.env.REACT_APP_API_BACKEND + "usuarios/";

  return (
    <Card extra={"w-full pb-10 p-4 h-full"} style={{ marginTop: "50px" }}>
      <Link
        to="/admin/data-tables/create"
        className="ml-10 mb-10 inline-block rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-3 py-2 text-center text-sm font-medium text-white shadow-lg shadow-green-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-green-300 dark:shadow-lg dark:shadow-green-800/80 dark:focus:ring-green-800"
        style={{ position: "sticky", top: "50px", maxWidth: "200px" }}
      >
        Registrar usuario <i className="fas fa-user-plus mr-0"></i>
      </Link>

      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Usuarios
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  NOMBRE
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  CORREO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  CONTRASEÑA
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  RANGO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  ACCIÓN
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {usuario.nombre}
                </td>

                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {usuario.correo}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {visiblePasswords.includes(usuario.idusuarios) ? (
                    <span>{usuario.contrasena}</span> // Mostrar la contraseña si el id de usuario está en visiblePasswords
                  ) : (
                    <FaEyeSlash
                      onClick={() => handleTogglePassword(usuario.idusuarios)}
                    /> // Mostrar el icono de ojo cerrado si el id de usuario no está en visiblePasswords
                  )}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {usuario.nomRangos}
                </td>

                <td className="flex items-center">
                  <Link to={`/admin/data-tables/edit/${usuario.idusuarios}`}>
                    <FaEdit className="text-gray-400 hover:text-gray-800" />
                  </Link>

                  <button
                    onClick={() => handleDeleteClick(usuario.idusuarios)}
                    style={{ marginLeft: "10px" }}
                  >
                    <FaTrash className="text-red-200 hover:text-red-600" />
                  </button>
                  {open && (
                    <Transition.Root show={open} as={Fragment}>
                      <Dialog
                        as="div"
                        className="relative z-10"
                        initialFocus={cancelButtonRef}
                        onClose={setOpen}
                      >
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity  dark:bg-navy-800 dark:bg-opacity-25 dark:transition-opacity   " />
                        </Transition.Child>

                        <div className="fixed inset-0 z-10 overflow-y-auto">
                          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 dark:bg-gray-800 sm:p-6 sm:pb-4">
                                  <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-600 sm:mx-0 sm:h-10 sm:w-10">
                                      <ExclamationTriangleIcon
                                        className="h-6 w-6 text-red-600 dark:text-red-300"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                      <Dialog.Title
                                        as="h3"
                                        className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-100"
                                      >
                                        Eliminar usuario
                                      </Dialog.Title>
                                      <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-300">
                                          ¿Está seguro de que desea eliminar
                                          este usuario? Todos sus datos serán
                                          eliminados permanentemente. Esta
                                          acción no se puede deshacer.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 dark:bg-gray-800 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button
                                    type="button"
                                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 dark:bg-red-500 sm:ml-3 sm:w-auto"
                                    onClick={() =>
                                      deleteUsuario(idusuariosToDelete)
                                    }
                                  >
                                    Eliminar
                                  </button>
                                  <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                    ref={cancelButtonRef}
                                  >
                                    Cancelar
                                  </button>
                                </div>
                              </Dialog.Panel>
                            </Transition.Child>
                          </div>
                        </div>
                      </Dialog>
                    </Transition.Root>
                  )}
                </td>

                <td className="pt-[14px] pb-[20px] sm:text-[14px]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ColumnsTable;
