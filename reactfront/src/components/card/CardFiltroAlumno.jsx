import React from "react";
import Dropdown from "components/dropdown";

import { useState, useEffect } from "react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineClockCircle,
  AiOutlineBook,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios"; // Importar axios si no lo has hecho

function CardFiltroAlumno(props) {
  const { transparent, onFilterAprobados } = props;
  const [open, setOpen] = React.useState(false);
  const [currentStatus, setCurrentStatus] = React.useState("");

  const URI = process.env.REACT_APP_API_BACKEND + "permisos/";
  const [permisosFiltrados, setPermisosFiltrados] = useState([]);
  useEffect(() => {
    // Ejecutar la función de filtro cuando la prop transparent cambie
    handleFilterAprobados("");
  }, [transparent]);

  const handleFilterAprobados = async (status) => {
    try {
      // Obtener los permisos de la API

      const data = JSON.parse(localStorage.getItem("legedin"));
      const nombreAlumno = data.alumno.nombre;

      // Obtener los permisos actualizados desde el servidor, con el filtro de nombre de tutor
      const res = await axios.get(`${URI}?nombre=${nombreAlumno}`);
      const permisos = res.data;

      // Filtrar los permisos según el estado pasado como argumento o el estado de filtroStatus
      // Filtrar los permisos según el estado y el nombre del alumno
      const permisosFiltrados = permisos.filter(
        (permiso) =>
          permiso.nombre === data.alumno.nombre && // Filtrar por nombre del alumno
          (status === "" || status === null || permiso.status === status) // Filtrar por estado si se proporciona
      );

      // Llamar a la función de filtro pasada como prop
      if (onFilterAprobados) {
        onFilterAprobados(permisosFiltrados);
      }

      console.log(`Permisos ${status}:`, permisosFiltrados);
    } catch (error) {
      console.error(`Error al filtrar permisos ${status}:`, error);
    }
  };

  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          open={open}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <BsThreeDots className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div
          className="z-50 w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
          style={{ minWidth: "200px" }}
        >
          {" "}
          <p
            className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
            onClick={() => handleFilterAprobados("")}
          >
            <span>
              <AiOutlineBook />
            </span>
            Mostrar todos
          </p>
          <p
            className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
            onClick={() => handleFilterAprobados("Pendiente")}
          >
            <span>
              <AiOutlineClockCircle />
            </span>
            Pendientes
          </p>
          <p
            className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
            onClick={() => handleFilterAprobados("Aprobado")}
          >
            <span>
              <AiOutlineCheck />
            </span>
            Aprobados
          </p>
          <p
            className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium"
            onClick={() => handleFilterAprobados("Rechazado")}
          >
            <span>
              <AiOutlineClose />
            </span>
            Rechazados
          </p>
        </div>
      }
    />
  );
}

export default CardFiltroAlumno;
