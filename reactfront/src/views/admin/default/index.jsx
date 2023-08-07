import { Timeline } from "react-twitter-widgets";
import Banner1 from "./components/Banner";
import { FaSchool } from "react-icons/fa";
import { BsUiChecks } from "react-icons/bs";

import {
  MdOutlinePendingActions,
  MdCheckCircle,
  MdOutlineAttachMoney,
} from "react-icons/md";
import Clima from "components/widget/Clima";
import { AiFillCloseCircle } from "react-icons/ai";

import Widget from "components/widget/Widget";

import axios from "axios";
import { useState, useEffect } from "react";
const Dashboard = () => {
  // Obtener el mes y el año actual
  const currentDate = new Date();
  const monthNames = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();
  const [permisosPendientes, setPermisosPendientes] = useState(0);
  const [costosTotales, setCostosTotales] = useState(0);
  const [permisosRechazados, setPermisosRechazados] = useState(0);
  const [permisosAprobados, setPermisosAprobados] = useState(0);
  const [productosTotales, setProductosTotales] = useState(0);
  const [alumnosTotales, setAlumnosTotales] = useState(0);
  const URI = process.env.REACT_APP_API_BACKEND + "productos/";
  const URIalumnos = process.env.REACT_APP_API_BACKEND + "alumnosgrupos/";
  //funcion para obtener los permisos pendientes
  useEffect(() => {
    const obtenerPermisosPendientes = async () => {
      try {
        const res = await axios.get(`${URI}`); // Consultar a la API para obtener todos los permisos
        const permisos = res.data;
        const permisosPendientes = permisos.filter(
          (permiso) => permiso.status === "Pendiente"
        ).length; // Filtrar los permisos con estado "pendiente" y obtener la cantidad
        setPermisosPendientes(permisosPendientes); // Actualizar el estado con la cantidad de permisos pendientes
      } catch (error) {
        console.error(`Error al obtener permisos pendientes:`, error);
      }
    };

    obtenerPermisosPendientes(); // Llamar a la función para obtener los permisos pendientes al cargar el componente o recibir actualizaciones relevantes
  }, []); // Asegurarse de pasar un arreglo vacío como segundo argumento para que el efecto solo se ejecute al cargar el componente
  //funcion para obtener los permisos rechazados

  useEffect(() => {
    const obtenerPermisosRechazados = async () => {
      try {
        const res = await axios.get(`${URI}`); // Consultar a la API para obtener todos los permisos
        const permisos = res.data;
        const permisosRechazados = permisos.filter(
          (permiso) => permiso.status === "Rechazado"
        ).length; // Filtrar los permisos con estado "pendiente" y obtener la cantidad
        setPermisosRechazados(permisosRechazados); // Actualizar el estado con la cantidad de permisos pendientes
      } catch (error) {
        console.error(`Error al obtener permisos rechazados:`, error);
      }
    };

    obtenerPermisosRechazados(); // Llamar a la función para obtener los permisos pendientes al cargar el componente o recibir actualizaciones relevantes
  }, []); // Asegurarse de pasar un arreglo vacío como segundo argumento para que el efecto solo se ejecute al cargar el componente

  //funcion para obtener los permisos aprobados
  useEffect(() => {
    const obtenerPermisosAprobados = async () => {
      try {
        const res = await axios.get(`${URI}`); // Consultar a la API para obtener todos los permisos
        const permisos = res.data;
        const permisosAprobados = permisos.filter(
          (permiso) => permiso.status === "Aprobado"
        ).length; // Filtrar los permisos con estado "pendiente" y obtener la cantidad
        setPermisosAprobados(permisosAprobados); // Actualizar el estado con la cantidad de permisos pendientes
      } catch (error) {
        console.error(`Error al obtener permisos aprobados:`, error);
      }
    };

    obtenerPermisosAprobados(); // Llamar a la función para obtener los permisos pendientes al cargar el componente o recibir actualizaciones relevantes
  }, []); // Asegurarse de pasar un arreglo vacío como segundo argumento para que el efecto solo se ejecute al cargar el componente

  useEffect(() => {
    const obtenerProductosTotales = async () => {
      try {
        const res = await axios.get(`${URI}`); // Consultar a la API para obtener todos los permisos
        const productos = res.data;
        setProductosTotales(productos.length); // Actualizar el estado con la cantidad total de permisos
      } catch (error) {
        console.error(`Error al obtener productos:`, error);
      }
    };

    obtenerProductosTotales(); // Llamar a la función para obtener todos los permisos al cargar el componente o recibir actualizaciones relevantes
  }, []); // Asegurarse de pasar un arreglo vacío como segundo argumento para que el efecto solo se ejecute al cargar el componente

  useEffect(() => {
    const obtenerCostosTotales = async () => {
      try {
        const res = await axios.get(URI); // Consultar a la API para obtener todos los productos
        const productos = res.data;

        // Sumar los costos totales de todos los productos
        const totalCosto = productos.reduce((acc, producto) => {
          return acc + producto.costoTotal;
        }, 0);

        setCostosTotales(totalCosto); // Actualizar el estado con la suma de los costos totales
      } catch (error) {
        console.error("Error al obtener costos totales:", error);
      }
    };

    obtenerCostosTotales();
  }, []);
  useEffect(() => {
    const obtenerAlumnosTotales = async () => {
      try {
        const res = await axios.get(`${URIalumnos}`); // Consultar a la API para obtener todos los permisos
        const alumnos = res.data;
        setAlumnosTotales(alumnos.length); // Actualizar el estado con la cantidad total de permisos
      } catch (error) {
        console.error(`Error al obtener alumnos:`, error);
      }
    };

    obtenerAlumnosTotales(); // Llamar a la función para obtener todos los permisos al cargar el componente o recibir actualizaciones relevantes
  }, []); // Asegurarse de pasar un arreglo vacío como segundo argumento para que el efecto solo se ejecute al cargar el componente
  const handleBackupDatabase = async () => {
    try {
      // Llamada a la API para generar el respaldo de la base de datos
      const response = await fetch(
        process.env.REACT_APP_API_BACKEND + "backup"
      );
      // Obtener el contenido del archivo generado
      const backupFile = await response.blob();

      // Obtener la fecha actual
      const currentDate = new Date();
      const dateString = currentDate.toISOString().split("T")[0];

      // Crear el nombre de archivo con la fecha actual
      const fileName = `backup_${dateString}.sql`;

      // Crear la URL temporal del archivo
      const fileUrl = URL.createObjectURL(backupFile);

      // Crear un enlace y hacer clic en él para iniciar la descarga
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };
  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    // Función para verificar si el sistema está en modo oscuro
    const checkDarkMode = () => {
      const isDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkmode(isDark);
    };

    // Agregar un event listener para detectar cambios en el modo oscuro
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", checkDarkMode);

    // Verificar el modo oscuro al cargar el componente
    checkDarkMode();

    // Limpiar el event listener al desmontar el componente
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", checkDarkMode);
    };
  }, []);

  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <button
          className=" rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-3 py-2 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/50 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 dark:shadow-lg dark:shadow-blue-800/80 dark:focus:ring-blue-800"
          onClick={handleBackupDatabase}
        >
          Respaldar base de datos <i className="fas fa-database ml-1"></i>
        </button>
        <Widget
          icon={<BsUiChecks className="h-6 w-6 text-green-500" />} // Agrega la clase "text-green-500"
          title={"Total de productos"}
          subtitle={productosTotales}
        />

        <Widget
          icon={<MdOutlineAttachMoney className="h-6 w-6 text-green-500" />} // Agrega la clase "text-green-500"
          title={"Total en stock"}
          subtitle={`$${costosTotales}`} // Agregar el símbolo "$" antes de costosTotales
        />
        <Widget
          icon={<MdOutlinePendingActions className="h-7 w-7 text-green-500" />} // Agrega la clase "text-green-500"
          title={`Total en entradas - ${currentMonth} ${currentYear}`}
          subtitle={permisosPendientes}
        />

        <Widget
          icon={<MdCheckCircle className="h-6 w-6 text-green-500" />} // Agrega la clase "text-green-500"
          title={"Permisos aprobados"}
          subtitle={permisosAprobados}
        />

        <Widget
          icon={<AiFillCloseCircle className="h-6 w-6 text-green-500" />} // Agrega la clase "text-green-500"
          title={"Permisos rechazados"}
          subtitle={permisosRechazados}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: "hotelxcaretmx",
          }}
          options={{
            height: "500",
            theme: darkmode ? "dark" : "light",
          }}
        />

        <Clima></Clima>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          <Banner1 />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
