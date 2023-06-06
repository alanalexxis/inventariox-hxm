import Card from "components/card";
import Checkbox from "components/checkbox";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";

import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import {
  MdCheckCircle,
  MdCancel,
  MdOutlineError,
  MdDone,
  MdClose,
} from "react-icons/md";
import CardPermiso from "components/card/CardPermiso";
import CardMenu from "components/card/CardMenu";
import CardFiltro from "components/card/CardFiltro";

const TablaPermisos = ({ transparent, onFilterAprobados }) => {
  const generarPDF = async (permiso) => {
    try {
      // Obtener el idpermisos del permiso seleccionado
      const { idpermisos } = permiso;

      // Realizar la consulta a la URI para obtener los permisos
      const response = await fetch(URI);
      const permisos = await response.json();

      // Filtrar los permisos por el idpermisos seleccionado
      const permisosSeleccionados = permisos.filter(
        (permiso) => permiso.idpermisos === idpermisos
      );

      // Obtener el idAlumnosGrupos del permiso seleccionado
      const { idAlumnosGrupos } = permiso;

      // Contar cuántos permisos tienen el mismo idAlumnosGrupos
      let numVeces = 0;
      permisos.forEach((permiso) => {
        if (permiso.idAlumnosGrupos === idAlumnosGrupos) {
          numVeces++;
        }
      });

      // Resto del código para generar el PDF
      // ...

      console.log("Número de permisos: ", numVeces);
      // Crea un nuevo documento PDF con tamaño de página horizontal (148x210 mm)
      const doc = new jsPDF("l", "mm", [148, 210]);
      doc.setFont("times", "normal");
      doc.setFontSize(10); // Establecer el tamaño de fuente a 18
      doc.text(`ID de permiso: ${permiso.idpermisos}`, 160, 10);
      doc.setFont("times", "normal");
      doc.setFontSize(18); // Establecer el tamaño de fuente a 18

      // Obtener el ancho del documento
      const docWidth = doc.internal.pageSize.getWidth();

      // Centrar el texto "FORMATO DE PERMISOS" en el ancho del documento y ajustar verticalmente
      const text = "FORMATO DE PERMISOS";
      const textWidth =
        (doc.getStringUnitWidth(text) * doc.getFontSize()) /
        doc.internal.scaleFactor;
      const textX = (docWidth - textWidth) / 3.5;
      const textY = 30; // Valor fijo para desplazar el texto hacia abajo

      const charSpacing = 0.09; // Ajustar el espaciado entre las letras (puedes ajustar el valor a tu preferencia)
      const textWithCharSpacing = text
        .split("")
        .join(`\0${" ".repeat(charSpacing)}\0`);
      doc.text(textWithCharSpacing, textX, textY, { charSpace: charSpacing });
      // Restaurar el tamaño de fuente y tipo de letra a los valores originales
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      doc.text(`Fecha de solicitud: ${permiso.fechasolicitud}`, 30, 50);
      doc.text(`Número de permisos: ${numVeces}`, 130, 50);
      doc.text(`Nombre: ${permiso.nombre}`, 30, 60);
      doc.text(`Matricula: ${permiso.matricula}`, 130, 60);
      doc.text(`Grupo: ${permiso.grupo}`, 30, 70);
      doc.text(`Turno: ${permiso.turno}`, 80, 70);
      doc.text(`Carrera: ${permiso.carrera}`, 130, 70);
      doc.text(
        `Por este medio se justifica el permiso a sus clases de los días: ${permiso.fechainicio}`,
        30,
        80
      );
      doc.text(`Al día: ${permiso.fechafin}`, 30, 90);
      doc.text(`En el horario de: ${permiso.horainicio}`, 30, 100);
      doc.text(`a: ${permiso.horafin}`, 84, 100);
      doc.text(`Motivo: ${permiso.motivo}`, 114, 100);
      doc.text(`Especificar motivo: ${permiso.espMotivos}`, 30, 110);
      doc.text(`Aprobado por: `, 95, 120);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`Director de la división de TIC`, 40, 135);
      doc.text(`${permiso.director}`, 40, 130);
      doc.text(`Tutor de grupo`, 140, 135);
      doc.text(`${permiso.tutor}`, 140, 130);
      doc.save(`permiso_${permiso.idpermisos}.pdf`);
      // ...
    } catch (error) {
      console.error("Error al generar el PDF: ", error);
    }
  };

  const [permisosFiltrados, setPermisosFiltrados] = React.useState([]); // Estado de los permisos filtrados
  const [filtroStatus, setFiltroStatus] = React.useState(""); // Estado del filtro de status
  const handleFilterAprobados = (permisosAprobados) => {
    // Actualizar el estado con los permisos filtrados
    setPermisosFiltrados(permisosAprobados);
  };

  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [idpermisosToDelete, setIdPermisosToDelete] = useState(null);

  const deletePermiso = async (idpermisos) => {
    try {
      await axios.delete(`${URI}${idpermisos}`);
      // Esperar a que el permiso se elimine antes de cerrar el modal y resetear idpermisos

      // Obtener los permisos actualizados después de la eliminación
      const res = await axios.get(URI);
      const permisosActualizados = res.data;

      // Actualizar el estado de los permisos filtrados con los permisos actualizados
      setPermisosFiltrados(permisosActualizados);

      setOpen(false);
      setIdPermisosToDelete(null);
    } catch (error) {
      console.error(`Error al eliminar permiso:`, error);
    }
  };

  const handleDeleteClick = (idpermisos) => {
    setIdPermisosToDelete(idpermisos);
    setOpen(true);
  };

  const [idpermisosSeleccionado, setIdpermisosSeleccionado] = useState(null);
  const [observaciones, setObservaciones] = useState(null);

  const handleCheckboxChange = (checked, idpermisos, observaciones) => {
    if (checked) {
      console.log(`Se marcó el idpermisos: ${idpermisos}`);
      setIdpermisosSeleccionado(idpermisos);
      setObservaciones(observaciones);
    } else {
      console.log(`Se desmarcó el idpermisos: ${idpermisos}`);
      setIdpermisosSeleccionado(null);
      setObservaciones(null);
    }
  };

  // En tablaPermisos
  const obtenerPermisosActualizados = async () => {
    try {
      // Obtener los permisos actualizados desde el servidor
      const res = await axios.get(`${URI}`); // Reemplaza con tu URL de API para obtener los permisos
      const permisosActualizados = res.data;

      // Actualizar el estado local de la lista de permisos con los permisos actualizados
      setPermisosFiltrados(permisosActualizados);
    } catch (error) {
      console.error(error);
    }
  };

  const URI = process.env.REACT_APP_API_BACKEND + "permisos/";

  return (
    <Card extra={"w-full pb-10 p-4 h-full"} style={{ marginTop: "50px" }}>
      <Link
        to="/admin/permiso/create"
        className="ml-10 mb-10 inline-block rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-3 py-2 text-center text-sm font-medium text-white shadow-lg shadow-green-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-green-300 dark:shadow-lg dark:shadow-green-800/80 dark:focus:ring-green-800"
        style={{ position: "sticky", top: "50px", maxWidth: "200px" }}
      >
        Registrar permiso <i className="fas fa-user-plus mr-0"></i>
      </Link>

      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Permisos
        </div>
        <CardPermiso
          idpermisos={idpermisosSeleccionado}
          observaciones={observaciones}
          handleCheckboxChange={handleCheckboxChange}
          obtenerPermisosActualizados={obtenerPermisosActualizados}
        />
        <CardFiltro onFilterAprobados={handleFilterAprobados} />
      </header>

      <div className="mt-8 overflow-x-scroll ">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  ID
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  STATUS
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  OBSERVACIONES
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  MATRICULA
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  NOMBRE
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  GRUPO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  CARRERA
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  TURNO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  TUTOR
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  FECHA DE REGISTRO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  FECHA DE INICIO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  FECHA DE FIN
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  HORA DE INICIO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  HORA DE FIN
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  MOTIVO
                </div>
              </th>
              <th className="border-b border-gray-200 pr-14 pb-[10px] text-start dark:!border-navy-700">
                <div className="flex w-full justify-between pr-10 text-xs tracking-wide text-gray-600">
                  {" "}
                  ESPECIFICAR MOTIVO
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
            {Array.isArray(permisosFiltrados) &&
              permisosFiltrados
                .sort((a, b) => b.idpermisos - a.idpermisos) // Ordenar de forma descendente por el valor de idpermisos
                .map((permiso) => (
                  <tr>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      <div className="flex items-center gap-2">
                        {((permiso.status === "Pendiente" &&
                          permiso.observaciones ===
                            "Pendiente de aprobación de tutor y dirección") ||
                          permiso.observaciones ===
                            "Pendiente de aprobación de dirección") && (
                          // Agregar condición para mostrar el Checkbox solo en permisos Pendientes
                          <Checkbox
                            checked={
                              idpermisosSeleccionado === permiso.idpermisos
                            } // Establecer si el checkbox está marcado o no
                            onChange={(checked) =>
                              handleCheckboxChange(
                                checked,
                                permiso.idpermisos,
                                permiso.observaciones
                              )
                            }
                          />
                        )}
                        {permiso.idpermisos}
                        {/* Agrega margen izquierdo para separar horizontalmente */}
                      </div>
                    </td>

                    <td className=" flex items-center pt-2 text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.status === "Pendiente" && ( // Agregar condición para mostrar el icono solo en permisos Pendientes
                        <MdOutlineError className="mr-1 text-orange-500" />
                      )}
                      {permiso.status === "Aprobado" && (
                        <MdCheckCircle className="mr-1 text-green-500" />
                      )}
                      {permiso.status === "Rechazado" && (
                        <MdCancel className="mr-1 text-red-500" />
                      )}{" "}
                      <span className="text-sm font-bold text-navy-700 dark:text-white">
                        {permiso.status}
                      </span>
                    </td>

                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.observaciones}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.matricula}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.nombre}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.grupo}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.carrera}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.turno}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.tutor}
                    </td>

                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.fechasolicitud}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.fechainicio}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.fechafin}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.horainicio}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.horafin}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.motivo}
                    </td>
                    <td className="text-sm font-bold text-navy-700 dark:text-white">
                      {permiso.espMotivos}
                    </td>

                    <td className="flex items-center">
                      <Link to={`/admin/permiso/edit/${permiso.idpermisos}`}>
                        <FaEdit className="text-gray-400 hover:text-gray-800" />
                      </Link>

                      <button
                        onClick={() => handleDeleteClick(permiso.idpermisos)}
                        style={{ marginLeft: "10px" }}
                      >
                        <FaTrash className="text-red-200 hover:text-red-600" />
                      </button>
                      {permiso.status === "Aprobado" && (
                        <button
                          style={{ marginLeft: "10px" }}
                          onClick={() => generarPDF(permiso)}
                        >
                          <FaFilePdf className="text-green-200 hover:text-green-600" />
                        </button>
                      )}
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
                                            Eliminar permiso
                                          </Dialog.Title>
                                          <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                              ¿Está seguro de que desea eliminar
                                              este permiso? Todos sus datos
                                              serán eliminados permanentemente.
                                              Esta acción no se puede deshacer.
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
                                          deletePermiso(idpermisosToDelete)
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

export default TablaPermisos;
