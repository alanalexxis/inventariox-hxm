import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const URIgrupo = process.env.REACT_APP_API_BACKEND + "grupos/";
const URIalumnosgrupo = process.env.REACT_APP_API_BACKEND + "alumnosgrupos/";
const uriAlumnos = process.env.REACT_APP_API_BACKEND + "alumnos/";

const CompEditAlumnoGrupo = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [idalumnos, setIdalumnos] = useState("");

  const [grupos, setGrupos] = useState([]);
  const [idgrupos, setIdgrupos] = useState("");

  const navigate = useNavigate();
  const { idAlumnosGrupos } = useParams();

  //obteniendo alumnos con matriculas en select
  useEffect(() => {
    const fetchAlumnosConMatriculas = async () => {
      const response = await axios.get(uriAlumnos);
      const alumnosConMatriculas = response.data.map((alumno) => {
        const matricula = alumno.matricula;
        return {
          nombre: `${matricula} ${alumno.nombre} `,
          id: alumno.idalumnos,
        };
      });

      setAlumnos(alumnosConMatriculas);
    };
    fetchAlumnosConMatriculas();
  }, []);

  //obteniendo los periodos con años en select
  useEffect(() => {
    const fetchGruposConPeriodos = async () => {
      const response = await axios.get(URIgrupo);
      const gruposConPeriodos = response.data.map((grupo) => {
        const periodo = grupo.periodo;
        const carrera = grupo.carrera;
        const anio = grupo.anio;
        return {
          nombre: `${grupo.nomGrupos} ${carrera} ${periodo} ${anio}`, // Combinar el nombre de la carrera con el turno correspondiente
          id: grupo.idgrupos,
        };
      });

      setGrupos(gruposConPeriodos);
    };
    fetchGruposConPeriodos();
  }, []);

  //procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    await axios.put(URIalumnosgrupo + idAlumnosGrupos, {
      idalumnos: idalumnos,
      idgrupos: idgrupos,
    });
    navigate("/admin/alumnos");
  };

  useEffect(() => {
    getBlogById();
  }, []);

  const getBlogById = async () => {
    const res = await axios.get(URIalumnosgrupo + idAlumnosGrupos);
    setIdalumnos(res.data.idalumnos);
    setIdgrupos(res.data.idgrupos);
  };

  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xs p-4 sm:w-full">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow  dark:border-hidden dark:bg-navy-800  ">
            <form className="" onSubmit={update}>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un alumno para el grupo
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
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un grupo para el alumno
                </label>
                <select
                  value={idgrupos}
                  onChange={(e) => setIdgrupos(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona un grupo
                  </option>
                  {grupos.map((grupo, index) => (
                    <option key={index} value={grupo.id}>
                      {grupo.nombre}
                    </option>
                  ))}
                </select>
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
        <div className="fixed bottom-0 left-0 z-0 w-full"></div>
      </div>
    </>
  );
};

export default CompEditAlumnoGrupo;
