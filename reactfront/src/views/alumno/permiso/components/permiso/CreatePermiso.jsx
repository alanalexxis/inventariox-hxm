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
  const [error, setError] = useState("");
  const [nombreTutor, setNombreTutor] = useState("");
  const [nombreGrupo, setNombreGrupo] = useState("");
  const [nombreCarrera, setNombreCarrera] = useState("");
  const [nombrePeriodo, setNombrePeriodo] = useState("");
  const [fechasolicitud, setFechaSolicitud] = useState(new Date());
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);
  const [idmotivos, setIdmotivos] = useState("");
  const [espMotivos, setEspMotivos] = useState("");
  const [status, setStatus] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [idalumnos, setIdalumnos] = useState("");
  const [observaciones, setObservaciones] = useState("");
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
  const horaInicioDate = new Date(`01/01/2000 ${horaInicio}`);
  const horaFinDate = new Date(`01/01/2000 ${horaFin}`);
  const horaInicioTime = horaInicioDate.getTime();
  const horaFinTime = horaFinDate.getTime();
  // Definir la función como asincrónica
  useEffect(() => {
    const buscarIdAlumnosGruposPorNombre = async () => {
      const data = JSON.parse(localStorage.getItem("legedin"));
      const nombreAlumno = data.alumno.nombre;
      const response = await axios.get(`${uriAlumnos}?nombre=${nombreAlumno}`);
      const alumnosPorNombre = response.data.filter(
        (alumno) => alumno.nombre === nombreAlumno
      );
      const ultimoAlumnoGrupo =
        alumnosPorNombre.length > 0
          ? alumnosPorNombre[alumnosPorNombre.length - 1]
          : null;

      const nombreCarrera = ultimoAlumnoGrupo ? ultimoAlumnoGrupo.carrera : "";
      const nombreGrupo = ultimoAlumnoGrupo ? ultimoAlumnoGrupo.grupo : "";
      const nombrePeriodo = ultimoAlumnoGrupo ? ultimoAlumnoGrupo.periodo : "";
      const nombreTutor = ultimoAlumnoGrupo ? ultimoAlumnoGrupo.tutor : "";
      setNombreGrupo(nombreGrupo);
      setNombreCarrera(nombreCarrera);
      setNombrePeriodo(nombrePeriodo);
      setNombreTutor(nombreTutor);
    };

    buscarIdAlumnosGruposPorNombre();
  }, []);

  const data = JSON.parse(localStorage.getItem("legedin"));
  const nombreAlumno = data.alumno.nombre;

  const store = async (e) => {
    e.preventDefault();
    if (!fechaInicio) {
      setError("Selecciona una fecha de inicio.");
    } else if (!fechaFin) {
      setError("Selecciona una fecha de fin.");
    } else if (fechaFin < fechaInicio) {
      setError("La fecha de inicio debe ser menor que la fecha de fin.");
    } else if (!horaInicio) {
      setError("Selecciona una hora de inicio");
    } else if (!horaFin) {
      setError("Selecciona una hora de fin.");
    } else if (horaInicioTime >= horaFinTime) {
      setError("La hora de inicio debe ser menor que la hora de fin");
    } else if (!idmotivos) {
      setError("Selecciona un motivo.");
    } else {
      const data = JSON.parse(localStorage.getItem("legedin"));
      const nombreAlumno = data.alumno.nombre;

      // Obtener los alumnos por nombre desde el servidor
      const response = await axios.get(`${uriAlumnos}?nombre=${nombreAlumno}`);
      const alumnosPorNombre = response.data.filter(
        (alumno) => alumno.nombre === nombreAlumno
      );

      // Obtener el último idAlumnosGrupos que coincida con el nombre del alumno
      const idAlumnosGrupos =
        alumnosPorNombre.length > 0
          ? alumnosPorNombre[alumnosPorNombre.length - 1].idAlumnosGrupos
          : null;

      // Si se encontró un idAlumnosGrupos, realizar la solicitud POST
      if (idAlumnosGrupos) {
        const formattedFechaSolicitud = fechasolicitud
          .toISOString()
          .split("T")[0]; // Format fechasolicitud to yyyy-MM-dd
        const formattedFechaInicio = fechaInicio.toISOString().split("T")[0]; // Format fechasolicitud to yyyy-MM-dd
        const formattedFechaFin = fechaFin.toISOString().split("T")[0]; // Format fechasolicitud to yyyy-MM-dd

        await axios.post(URI, {
          fecSolicitud: formattedFechaSolicitud,
          fecInic: formattedFechaInicio,
          fecFin: formattedFechaFin,
          horaInic: horaInicio,
          horaFin: horaFin,
          idmotivos: idmotivos,
          espMotivos: espMotivos,
          idAlumnosGrupos: idAlumnosGrupos,
          status: "Pendiente",
          observaciones: "Pendiente de aprobación de tutor y dirección",
        });
        navigate("/alumno/permisos");
      } else {
        // Manejar el caso cuando no se encuentra un idAlumnosGrupos
        console.error(
          "No se encontró el idAlumnosGrupos para el alumno actual."
        );
        // Aquí puedes mostrar un mensaje de error o realizar alguna otra acción apropiada
      }
    }
  };

  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xs p-4 sm:w-full">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow  dark:border-hidden dark:bg-navy-800  ">
            <form className="" onSubmit={store}>
              {error && (
                <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                  {error}
                </p>
              )}
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
                  Nombre:
                </label>
                <input
                  readOnly={true}
                  value={nombreAlumno}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Grupo actual:
                </label>
                <input
                  readOnly={true}
                  value={`${nombreGrupo} ${nombreCarrera} ${nombrePeriodo}`}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Tutor:
                </label>
                <input
                  readOnly={true}
                  value={nombreTutor}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  required
                ></input>
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
