import { Timeline } from "react-twitter-widgets";
import Banner1 from "./components/Banner";
import { BsUiChecks } from "react-icons/bs";

import {
  MdOutlinePendingActions,
  MdCheckCircle,
  MdOutlineAttachMoney,
} from "react-icons/md";

import { GiExitDoor, GiEntryDoor } from "react-icons/gi";
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

  const [costosTotales, setCostosTotales] = useState(0);
  const [permisosRechazados, setPermisosRechazados] = useState(0);

  const [productosTotales, setProductosTotales] = useState(0);

  const [costosTotalesEntradas, setCostosTotalesEntradas] = useState(0);
  const [costosTotalesSalidas, setCostosTotalesSalidas] = useState(0);
  const URI = process.env.REACT_APP_API_BACKEND + "productos/";
  const URIalumnos = process.env.REACT_APP_API_BACKEND + "alumnosgrupos/";
  const URIentradas = process.env.REACT_APP_API_BACKEND + "entradas/";
  const URIsalidas = process.env.REACT_APP_API_BACKEND + "salidas/";
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
    const obtenerCostosTotalesEntradas = async () => {
      try {
        const res = await axios.get(URIentradas); // Consultar a la API para obtener todos los productos
        const productos = res.data;

        // Obtener el mes y el año actual
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11
        const currentYear = currentDate.getFullYear();

        // Filtrar los productos que corresponden al mes y año actual
        const productosMesYAnoActual = productos.filter((producto) => {
          const fechaProducto = new Date(producto.fechaEntrada); // Utilizamos el campo "fechaEntrada" en lugar de "fecha"
          const mesProducto = fechaProducto.getMonth() + 1;
          const anoProducto = fechaProducto.getFullYear();

          return mesProducto === currentMonth && anoProducto === currentYear;
        });

        // Sumar los costos totales de los productos filtrados
        const totalCosto = productosMesYAnoActual.reduce((acc, producto) => {
          return acc + producto.costoTotal;
        }, 0);

        setCostosTotalesEntradas(totalCosto); // Actualizar el estado con la suma de los costos totales
      } catch (error) {
        console.error("Error al obtener costos totales:", error);
      }
    };

    obtenerCostosTotalesEntradas();
  }, []);

  useEffect(() => {
    const obtenerCostosTotalesSalidas = async () => {
      try {
        const res = await axios.get(URIsalidas); // Consultar a la API para obtener todos los productos
        const productos = res.data;

        // Obtener el mes y el año actual
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Sumamos 1 porque los meses en JavaScript van de 0 a 11
        const currentYear = currentDate.getFullYear();

        // Filtrar los productos que corresponden al mes y año actual
        const productosMesYAnoActual = productos.filter((producto) => {
          const fechaProducto = new Date(producto.fechaSalida); // Utilizamos el campo "fechaEntrada" en lugar de "fecha"
          const mesProducto = fechaProducto.getMonth() + 1;
          const anoProducto = fechaProducto.getFullYear();

          return mesProducto === currentMonth && anoProducto === currentYear;
        });

        // Sumar los costos totales de los productos filtrados
        const totalCosto = productosMesYAnoActual.reduce((acc, producto) => {
          return acc + producto.costoTotal;
        }, 0);

        setCostosTotalesSalidas(totalCosto); // Actualizar el estado con la suma de los costos totales
      } catch (error) {
        console.error("Error al obtener costos totales:", error);
      }
    };

    obtenerCostosTotalesSalidas();
  }, []);

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
          icon={<GiExitDoor className="h-7 w-7 text-green-500" />} // Agrega la clase "text-green-500"
          title={`Total en entradas - ${currentMonth} ${currentYear}`}
          subtitle={`$${costosTotalesEntradas}`} // Agregar el símbolo "$" antes de costosTotales
        />

        <Widget
          icon={<GiEntryDoor className="h-6 w-6 text-green-500" />} // Agrega la clase "text-green-500"
          title={`Total en salidas - ${currentMonth} ${currentYear}`}
          subtitle={`$${costosTotalesSalidas}`} // Agregar el símbolo "$" antes de costosTotales
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
