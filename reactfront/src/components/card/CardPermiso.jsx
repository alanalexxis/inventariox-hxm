import Dropdown from "components/dropdown";
import { AiOutlineUser, AiOutlineShop } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { TiLightbulb } from "react-icons/ti";
import { MdDone, MdClose } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";

function CardPermiso(props) {
  const { permiso, obtenerPermisosActualizados } = props;
  const [status, setStatus] = useState("");
  const [permisosFiltrados, setPermisosFiltrados] = React.useState([]);
  const [permisos, setPermisos] = useState([]); // Estado local para la lista de permisos

  const URI = process.env.REACT_APP_API_BACKEND + "permisos/";
  const navigate = useNavigate();

  const handleAprobarClick = async (e) => {
    try {
      if (
        props.observaciones === "Pendiente de aprobación de tutor y dirección"
      ) {
        await update("Pendiente", "Pendiente de aprobación de tutor");
      } else if (
        props.observaciones === "Pendiente de aprobación de dirección"
      ) {
        await update("Aprobado", "Aprobado por dirección y tutor");
      }

      console.log(`Se aprobó el permiso con id: ${props.idpermisos}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRechazarClick = async (e) => {
    try {
      await update("Rechazado", "Rechazado por director");

      console.log(`Se rechazó el permiso con id: ${props.idpermisos}`);
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (status, observaciones) => {
    try {
      await axios.put(URI + props.idpermisos, {
        status: status,
        observaciones: observaciones,
      });
      await obtenerPermisosActualizados();
      // No es necesario actualizar el estado local aquí, lo hacemos en las funciones handleAprobarClick y handleRechazarClick
    } catch (error) {
      console.error(error);
    }
  };

  const { transparent } = props;
  const [open, setOpen] = React.useState(false);
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
          <p
            className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium"
            onClick={handleAprobarClick} // Agrega el evento de clic y llama a la función handleAprobarClick
          >
            <MdDone className="text-green-500" />
            <span>Aprobar</span>
          </p>
          <p
            className="hover:text-black mt-2 flex  cursor-pointer items-center gap-2 pt-1 text-gray-600  hover:font-medium"
            onClick={handleRechazarClick}
          >
            <MdClose className="text-red-500" />
            <span>Rechazar</span>{" "}
            {/* Se ha movido el texto "Rechazar" dentro del span */}
          </p>
        </div>
      }
    />
  );
}

export default CardPermiso;
