import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format } from "date-fns";
registerLocale("es", es); // registrar la localización de español

const URI = process.env.REACT_APP_API_BACKEND + "permisos/";
const uriAlumnos = process.env.REACT_APP_API_BACKEND + "alumnosgrupos/";

const CompCreatePermiso = () => {
  const [fechasolicitud, setFechaSolicitud] = useState(new Date());
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);
  const [idmotivos, setIdmotivos] = useState("");
  const [espMotivos, setEspMotivos] = useState("");

  const [alumnos, setAlumnos] = useState([]);
  const [idalumnos, setIdalumnos] = useState("");

  const navigate = useNavigate();

  //obteniendo alumnos con matriculas en select
  useEffect(() => {
    const fetchAlumnosConMatriculas = async () => {
      const response = await axios.get(uriAlumnos);
      const alumnosConMatriculas = response.data.map((alumno) => {
        const matricula = alumno.matricula;
        return {
          nombre: `${matricula} ${alumno.nombre} ${alumno.grupo} ${alumno.carrera} ${alumno.periodo} ${alumno.anio}       `,
          id: alumno.idAlumnosGrupos,
        };
      });

      setAlumnos(alumnosConMatriculas);
    };
    fetchAlumnosConMatriculas();
  }, []);
  //procedimiento para guardar

  const store = async (e) => {
    e.preventDefault();
    const formattedFechaSolicitud = fechasolicitud.toISOString().split("T")[0]; // Format fechasolicitud to yyyy-MM-dd
    const formattedFechaInicio = fechaInicio.toISOString().split("T")[0]; // Format fechasolicitud to yyyy-MM-dd
    const formattedFechaFin = fechaFin.toISOString().split("T")[0]; // Format fechasolicitud to yyyy-MM-dd

    await axios.post(URI, {
      fecSolicitud: formattedFechaSolicitud, // Use the formatted value in the request body
      fecInic: formattedFechaInicio,
      fecFin: formattedFechaFin,
      horaInic: horaInicio,
      horaFin: horaFin,
      idmotivos: idmotivos,
      espMotivos: espMotivos,
      idAlumnosGrupos: idalumnos,
      status: "Pendiente",
      observaciones: "Pendiente de aprobación de tutor y dirección",
    });
    navigate("/tutor/permisos");
  };

  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xs p-4 sm:w-full">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow  dark:border-hidden dark:bg-navy-800  ">
            <form className="" onSubmit={store}>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Fecha de solicitud
                </label>
                <DatePicker
                  readOnly={true}
                  selected={fechasolicitud}
                  onChange={(e) => setFechaSolicitud(e.target.value)}
                  dateFormat="yyyy-MM-dd"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholderText={format(new Date(), "yyyy-MM-dd")}
                />
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una fecha de inicio
                </label>
                <DatePicker
                  locale="es"
                  selected={fechaInicio}
                  onChange={(date) => setFechaInicio(date)}
                  dateFormat="yyyy-MM-dd"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholderText="Seleccione una fecha"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una fecha de fin
                </label>
                <DatePicker
                  locale="es"
                  selected={fechaFin}
                  onChange={(date) => setFechaFin(date)}
                  dateFormat="yyyy-MM-dd"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholderText="Seleccione una fecha"
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una hora de inicio
                </label>
                <select
                  value={horaInicio || ""}
                  onChange={(e) => setHoraInicio(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                >
                  <option value="">Seleccione una hora</option>
                  {Array.from({ length: 24 }, (_, i) => i).map((hora) => {
                    const hora12 = hora % 12 || 12;
                    const amPm = hora < 12 ? "am" : "pm";
                    return (
                      hora >= 7 &&
                      hora <= 22 && (
                        <option key={hora} value={`${hora12}:00 ${amPm}`}>
                          {`${hora12}`.padStart(2, "0")}:00 {amPm}
                        </option>
                      )
                    );
                  })}
                </select>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una hora de fin
                </label>
                <select
                  value={horaFin || ""}
                  onChange={(e) => setHoraFin(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                >
                  <option value="">Seleccione una hora</option>
                  {Array.from({ length: 24 }, (_, i) => i).map((hora) => {
                    const hora12 = hora % 12 || 12;
                    const amPm = hora < 12 ? "am" : "pm";
                    return (
                      hora >= 7 &&
                      hora <= 22 && (
                        <option key={hora} value={`${hora12}:00 ${amPm}`}>
                          {`${hora12}`.padStart(2, "0")}:00 {amPm}
                        </option>
                      )
                    );
                  })}
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un motivo para el permiso
                </label>
                <select
                  value={idmotivos}
                  onChange={(e) => setIdmotivos(e.target.value)}
                  type="number"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona un motivo
                  </option>
                  <option value="1">Médico</option>
                  <option value="2">Familiar</option>
                  <option value="3">Personal</option>
                  <option value="4">Otro</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Especifique el motivo
                </label>
                <input
                  value={espMotivos}
                  onChange={(e) => setEspMotivos(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ej. Fuí al médico"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un alumno para el permiso
                </label>
                <select
                  value={idalumnos}
                  onChange={(e) => setIdalumnos(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona un alumno
                  </option>
                  {alumnos.map((alumno, index) => (
                    <option key={index} value={alumno.id}>
                      {alumno.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className=" mt-10 w-full rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 sm:w-auto"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 z-0 w-full"></div>
      </div>
    </>
  );
};

export default CompCreatePermiso;
