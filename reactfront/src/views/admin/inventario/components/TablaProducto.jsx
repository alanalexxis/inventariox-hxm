import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const TablaProductos = (props) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [idproductosToDelete, setIdproductosToDelete] = useState(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const [productos, setProducto] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  // Get current products for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentProducts = productos.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // Function to handle pagination: move to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle pagination: move to the next page
  const goToNextPage = () => {
    const totalPages = Math.ceil(productos.length / recordsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  //procedimiento para mostrar todos los usuarios
  const getProductos = async () => {
    const res = await axios.get(URI);
    setProducto(res.data);
  };
  const deleteProducto = async (idproductos) => {
    try {
      const response = await axios.delete(`${URI}${idproductos}`);
      if (response.status === 200) {
        if (
          response.data.message &&
          response.data.message.includes("foreign key constraint")
        ) {
          setErrorVisible(true);
        } else {
          setOpen(false);
          setIdproductosToDelete(null);
          getProductos();
        }
      } else {
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      setErrorVisible(true);
      console.error("Error deleting product:", error);
    } finally {
      setOpen(false);
    }
  };

  // Function to hide the error message after a duration
  const hideErrorMessage = () => {
    setErrorVisible(false);
  };

  useEffect(() => {
    // Hide the error message after 3 seconds (adjust the duration as needed)
    if (errorVisible) {
      const timeout = setTimeout(hideErrorMessage, 7000);
      return () => clearTimeout(timeout);
    }
  }, [errorVisible]);

  const handleDeleteClick = (idproductos) => {
    setIdproductosToDelete(idproductos);
    setOpen(true);
  };

  const URI = process.env.REACT_APP_API_BACKEND + "productos/";

  return (
    <div className="relative">
      <Card extra={"w-full pb-10 p-4 h-full"} style={{ marginTop: "50px" }}>
        <Link
          to="/admin/inventario/create"
          className="ml-10 mb-10 inline-block rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-3 py-2 text-center text-sm font-medium text-white shadow-lg shadow-green-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-green-300 dark:shadow-lg dark:shadow-green-800/80 dark:focus:ring-green-800"
          style={{ position: "sticky", top: "50px", maxWidth: "200px" }}
        >
          Registrar producto <i className="far fa-cart-plus mr-0"></i>
        </Link>

        <header className="relative flex items-center justify-between">
          <div className="text-xl font-bold text-navy-700 dark:text-white">
            Productos
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
                    CÓDIGO DE BARRAS
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    DESCRIPCIÓN
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    CATEGORÍA
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    UBICACIÓN
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    ENTRADAS
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    SALIDAS
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    CANTIDAD
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    COSTO UNITARIO
                  </div>
                </th>
                <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                  <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                    {" "}
                    COSTO TOTAL
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
              {productos.map((producto) => (
                <tr>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {producto.codBarras}
                  </td>

                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {producto.descripcion}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {producto.nomCategorias}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {producto.nomUbicacions}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {producto.totalEntradas}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {producto.totalSalidas}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {producto.totalProductos}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {"$" +
                      producto.costoUnitario
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>
                  <td className="text-sm font-bold text-navy-700 dark:text-white">
                    {"$" +
                      producto.costoTotal
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </td>

                  <td className="flex items-center">
                    <Link to={`/admin/inventario/edit/${producto.idproductos}`}>
                      <FaEdit className="text-gray-400 hover:text-gray-800" />
                    </Link>

                    <button
                      onClick={() => handleDeleteClick(producto.idproductos)}
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
                                          Eliminar producto
                                        </Dialog.Title>
                                        <div className="mt-2">
                                          <p className="text-sm text-gray-500 dark:text-gray-300">
                                            ¿Está seguro de que desea eliminar
                                            este producto? Todos sus datos serán
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
                                        deleteProducto(idproductosToDelete)
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
      {errorVisible && (
        <div
          role="alert"
          className="error-alert mt-30 left-100 fixed z-50 w-full"
          style={{ top: "10px" }}
          onAnimationEnd={hideErrorMessage}
        >
          <div className="rounded-t bg-red-500 px-4 py-2 font-bold text-white">
            Alerta
          </div>
          <div className="rounded-b border border-t-0 border-red-400 bg-red-100 px-4 py-3 text-red-700">
            Este producto no puede eliminarse actualmente debido a que existen
            registros relacionados con él, como entradas o salidas. Para
            eliminar este producto, asegúrese de eliminar todas las referencias
            asociadas primero.
          </div>
        </div>
      )}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Previous</span>
        </button>

        <div className="hidden items-center gap-x-3 md:flex">
          {/* Page numbers */}
          {Array.from({
            length: Math.ceil(productos.length / recordsPerPage),
          }).map((_, index) => (
            <Link
              to={`#${index + 1}`}
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-100/60 text-blue-500"
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              } px-2 py-1 text-sm`}
            >
              {index + 1}
            </Link>
          ))}
        </div>

        <button
          onClick={goToNextPage}
          disabled={
            currentPage === Math.ceil(productos.length / recordsPerPage)
          }
          className="flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <span>Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TablaProductos;
