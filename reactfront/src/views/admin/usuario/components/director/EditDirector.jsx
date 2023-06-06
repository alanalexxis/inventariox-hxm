import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format } from "date-fns";
const { parseISO } = require("date-fns");
registerLocale("es", es); // registrar la localización de español

const URI = process.env.REACT_APP_API_BACKEND + "directores/";
const URIuser = process.env.REACT_APP_API_BACKEND + "usuarios/";

const CompEditDirector = () => {
  const [nombre, setNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { iddirectores } = useParams();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(URIuser);
      const filteredUsers = response.data.filter(
        (user) => user.nomRangos === "Director"
      );
      const emails = filteredUsers.map((user) => user.correo);
      setEmails(emails);
      setFilteredUsers(filteredUsers);
    };
    fetchUsers();
  }, []);

  const update = async (e) => {
    if (e) e.preventDefault();
    if (nombre.match(/\d+/)) {
      setError("El nombre no puede contener números.");
    } else if (!selectedEmail) {
      setError("Selecciona un correo.");
    } else if (!fechaInicio) {
      setError("Selecciona una fecha de ingreso.");
    } else if (!fechaFin) {
      setError("Selecciona una fecha de salida.");
    } else if (fechaFin <= fechaInicio) {
      setError("La fecha de salida debe ser mayor que la fecha de entrada.");
    } else {
      const formattedFechaInicio = fechaInicio.toISOString().split("T")[0]; // Format fechasolicitud to yyyy-MM-dd
      const formattedFechaFin = fechaFin.toISOString().split("T")[0]; // Format fechasolicitud to yyyy-MM-dd

      await axios.put(URI + iddirectores, {
        nombre: nombre,
        idusuarios: selectedUserId,
        fechaInic: formattedFechaInicio,
        fechaFin: formattedFechaFin,
      });
      navigate("/admin/data-tables");
    }
  };
  useEffect(() => {
    getBlogById();
  }, []);

  const getBlogById = async () => {
    try {
      const res = await axios.get(URI + iddirectores);
      setNombre(res.data.nombre);
      const fechaInicio = parseISO(res.data.fechaInic);
      const fechaFin = parseISO(res.data.fechaFin);
      setFechaInicio(fechaInicio);
      setFechaFin(fechaFin);
      if (res.data.usuario) {
        setSelectedEmail(res.data.usuario.correo);
        setSelectedUserId(res.data.usuario.idusuarios);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xs p-4 sm:w-full">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow  dark:border-hidden dark:bg-navy-800  ">
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                  required
                ></input>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un correo para el director
                </label>

                <select
                  value={selectedEmail}
                  onChange={(e) => {
                    const selectedIndex = e.target.selectedIndex;
                    const selectedUserId =
                      selectedIndex > 0
                        ? filteredUsers[selectedIndex - 1].idusuarios
                        : "";
                    setSelectedEmail(e.target.value);
                    setSelectedUserId(selectedUserId);
                  }}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona un correo
                  </option>
                  {emails.map((email, index) => (
                    <option key={index} value={email}>
                      {email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una fecha de ingreso
                </label>
                <DatePicker
                  locale="es"
                  selected={fechaInicio}
                  onChange={(date) => setFechaInicio(date)}
                  dateFormat="yyyy-MM-dd"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholderText="Selecciona una fecha"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una fecha de salida
                </label>
                <DatePicker
                  locale="es"
                  selected={fechaFin}
                  onChange={(date) => setFechaFin(date)}
                  dateFormat="yyyy-MM-dd"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholderText="Selecciona una fecha"
                />
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
        <div className="h-20"></div>
        <div className="fixed bottom-0 left-0 z-0 w-full"></div>
      </div>
    </>
  );
};

export default CompEditDirector;
