import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import axios from "axios";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import * as XLSX from "sheetjs-style";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const TablaSalidas = (props) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [idsalidasToDelete, setIdsalidasToDelete] = useState(null);

  const [salidas, setSalidas] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;
  // Get current products for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentProducts = salidas.slice(indexOfFirstRecord, indexOfLastRecord);

  useEffect(() => {
    getSalidas();
  }, []);

  //procedimiento para mostrar todos los usuarios
  const getSalidas = async () => {
    const res = await axios.get(URI);
    setSalidas(res.data.reverse());
  };
  //procedimiento para eliminar una salida
  const deleteSalida = async (idsalidas) => {
    const salidaToDelete = salidas.find(
      (salida) => salida.idsalidas === idsalidas
    );

    // Delete the entry from URI
    await axios.delete(`${URI}${idsalidas}`);

    // Update the URIinventario with decreased numSalidas
    if (salidaToDelete) {
      const productoToUpdate = await axios.get(
        `${URIinventario}${salidaToDelete.idproductos}`
      );
      if (productoToUpdate) {
        const updatedNumSalidas =
          productoToUpdate.data.numSalidas - salidaToDelete.numSalidas;
        const updatedTotalSalidas =
          productoToUpdate.data.totalSalidas - salidaToDelete.numSalidas;

        // Update the productos collection
        await axios.put(`${URIinventario}${salidaToDelete.idproductos}`, {
          numSalidas: updatedNumSalidas,
          totalSalidas: updatedTotalSalidas,
        });

        // Update the totalProductos and costoTotal in productos collection
        const productoToUpdateTotal = await axios.get(
          `${URIinventario}${salidaToDelete.idproductos}`
        );
        if (productoToUpdateTotal) {
          const updatedTotalProductos =
            productoToUpdateTotal.data.totalProductos +
            salidaToDelete.numSalidas;
          const updatedCostoTotal =
            productoToUpdateTotal.data.costoTotal + salidaToDelete.costoTotal;

          await axios.put(`${URIinventario}${salidaToDelete.idproductos}`, {
            totalProductos: updatedTotalProductos,
            costoTotal: updatedCostoTotal,
          });
        }
      }
    }

    setOpen(false);
    setIdsalidasToDelete(null);
    getSalidas();
  };

  const handleDeleteClick = (idsalidas) => {
    setIdsalidasToDelete(idsalidas);
    setOpen(true);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle pagination: move to the next page
  const goToNextPage = () => {
    const totalPages = Math.ceil(salidas.length / recordsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // Function to generate an array with page numbers for rendering
  const generatePageNumbers = () => {
    const totalPages = Math.ceil(salidas.length / recordsPerPage);
    const visiblePages = 5; // Number of visible page numbers (including ellipsis)

    if (totalPages <= visiblePages) {
      // If total pages is less than or equal to visiblePages, show all page numbers
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      const currentPageIndex = currentPage - 1;
      const firstVisiblePageIndex = Math.max(0, currentPageIndex - 2);
      const lastVisiblePageIndex = Math.min(
        totalPages - 1,
        currentPageIndex + 2
      );

      const pageNumbers = [];
      if (firstVisiblePageIndex > 0) {
        pageNumbers.push(1);
        if (firstVisiblePageIndex > 1) {
          // Add ellipsis if the first page is not visible
          pageNumbers.push("...");
        }
      }

      for (let i = firstVisiblePageIndex; i <= lastVisiblePageIndex; i++) {
        pageNumbers.push(i + 1);
      }

      if (lastVisiblePageIndex < totalPages - 1) {
        if (lastVisiblePageIndex < totalPages - 2) {
          // Add ellipsis if the last page is not visible
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    }
  };

  useEffect(() => {
    getSalidas();
  }, []);

  const exportToExcel = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_API_BACKEND + "salidas/"
      );
      const jsonData = response.data;
      const modifiedData = jsonData.map((item) => ({
        CÓDIGO: item.codBarras,
        DESCRIPCIÓN: item.descripcion,
        CANTIDAD: item.numSalidas,
        "NÚMERO DE SAP": item.numSap,
        TÉCNICO: item.nomTecnico,
        ÁREA: item.nomArea,
        "COSTO UNITARIO": { v: item.costoUnitario, t: "n", z: "$#,##0.00" }, // Format as currency
        "COSTO TOTAL": { v: item.costoTotal, t: "n", z: "$#,##0.00" }, // Format as currency
        FECHA: item.fechaSalida,

        // Add more properties with custom titles as needed
      }));

      // Calculate the total costoTotal
      const totalCostoTotal = jsonData.reduce(
        (total, item) => total + item.costoTotal,
        0
      );

      // Add a row for total costoTotal
      const totalRow = {
        CÓDIGO: "",
        DESCRIPCIÓN: "",
        CANTIDAD: "",
        "NÚMERO DE SAP": "",
        TÉCNICO: "",
        ÁREA: "",
        "COSTO UNITARIO": "Total",
        "COSTO TOTAL": { v: totalCostoTotal, t: "n", z: "$#,##0.00" }, // Format as currency
        FECHA: "",

        // Add more properties with custom titles as needed
      };
      modifiedData.push(totalRow);

      const worksheet = XLSX.utils.json_to_sheet(modifiedData);

      // Apply the styles to the specific cells
      const cellRange = XLSX.utils.decode_range(worksheet["!ref"]);
      for (let col = cellRange.s.c; col <= cellRange.e.c; col++) {
        for (let row = cellRange.s.r; row <= cellRange.e.r; row++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          const cell = worksheet[cellAddress];

          if (row === 0 && col < 9) {
            cell.s = {
              fill: { fgColor: { rgb: "FFFF00" } },
              alignment: { horizontal: "center" },
              font: { bold: true },
            };
          } else if (row === cellRange.e.r && col === 4) {
            cell.s = {
              fill: { fgColor: { rgb: "FFF000" } },
              alignment: { horizontal: "center" },
              font: { bold: true },
            };
          }
        }
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");

      const currentDate = new Date();
      const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const fileName = `salidas_${
        monthNames[currentDate.getMonth()]
      }_${currentDate.getFullYear()}.xlsx`;

      // Export the data to Excel file with the generated filename
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Error exporting data to Excel:", error);
    }
  };

  const URI = process.env.REACT_APP_API_BACKEND + "salidas/";
  const URIinventario = process.env.REACT_APP_API_BACKEND + "productos/";

  return (
    <Card extra={"w-full pb-10 p-4 h-full"} style={{ marginTop: "50px" }}>
      <div className="flex flex-wrap justify-start space-x-4">
        <Link
          to="/admin/salidas/create"
          className="mb-10 inline-block flex-grow rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-3 py-2 text-center text-sm font-medium text-white shadow-lg shadow-green-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-green-300 dark:shadow-lg dark:shadow-green-800/80 dark:focus:ring-green-800"
          style={{ maxWidth: "180px" }}
        >
          Registrar salida <i className="far fa-cart-plus mr-0"></i>
        </Link>
        <Link
          onClick={exportToExcel}
          className="mb-10 inline-block rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-3 py-2 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800"
          style={{ maxWidth: "200px" }}
        >
          Generar reporte <i className="far fa-file-excel mr-0"></i>
        </Link>
      </div>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Salidas
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
                  FECHA Y HORA
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  SAP
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  TÉCNICO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  ÁREA
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
            {currentProducts.map((salida, index) => (
              <tr>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {(currentPage - 1) * recordsPerPage + index + 1}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {salida.codBarras}
                </td>

                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {salida.descripcion}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {format(new Date(salida.fechaSalida), "dd-MMM-yyyy HH:mm:ss")}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {salida.numSap}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {salida.nomTecnico}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {salida.nomArea}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {salida.numSalidas}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {"$" +
                    salida.costoUnitario
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td className="text-sm font-bold text-navy-700 dark:text-white">
                  {"$" +
                    salida.costoTotal
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>

                <td className="flex items-center">
                  <Link to={`/admin/salidas/edit/${salida.idsalidas}`}>
                    <FaEdit className="text-gray-400 hover:text-gray-800" />
                  </Link>

                  <button
                    onClick={() => handleDeleteClick(salida.idsalidas)}
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
                                        Eliminar salida
                                      </Dialog.Title>
                                      <div className="mt-2">
                                        <p className="text-sm text-gray-500 dark:text-gray-300">
                                          ¿Está seguro de que desea eliminar
                                          esta salida? Todos sus datos serán
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
                                      deleteSalida(idsalidasToDelete)
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
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center gap-x-2 rounded-md border px-5 py-2 text-sm capitalize transition-colors duration-200 ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "text-gray-700"
          } ${
            currentPage === 1
              ? "bg-gray-100"
              : "bg-white hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-5 w-5 ${
              currentPage === 1 ? "text-gray-400" : "text-gray-700"
            } rtl:-scale-x-100`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Anterior</span>
        </button>

        <div className="hidden items-center gap-x-3 md:flex">
          {/* Page numbers */}
          {generatePageNumbers().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span key={index} className="px-2 py-1 text-gray-500">
                {pageNumber}
              </span>
            ) : (
              <Link
                to={`#${pageNumber}`}
                key={index}
                onClick={() => setCurrentPage(pageNumber)}
                className={`rounded-md ${
                  currentPage === pageNumber
                    ? "bg-blue-100/60 text-blue-500"
                    : "text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                } px-2 py-1 text-sm`}
              >
                {pageNumber}
              </Link>
            )
          )}
        </div>

        <button
          onClick={goToNextPage}
          disabled={currentPage === Math.ceil(salidas.length / recordsPerPage)}
          className={`flex items-center gap-x-2 rounded-md border bg-white px-5 py-2 text-sm capitalize transition-colors duration-200 ${
            currentPage === Math.ceil(salidas.length / recordsPerPage)
              ? "cursor-not-allowed text-gray-400"
              : "text-gray-700"
          } ${
            currentPage === Math.ceil(salidas.length / recordsPerPage)
              ? "bg-gray-100"
              : "bg-white hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <span>Siguiente</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`h-5 w-5 ${
              currentPage === Math.ceil(salidas.length / recordsPerPage)
                ? "text-gray-400"
                : "text-gray-700"
            } rtl:-scale-x-100`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </Card>
  );
};

export default TablaSalidas;
