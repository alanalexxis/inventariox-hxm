import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URIperiodo = process.env.REACT_APP_API_BACKEND + "periodos/";
const URIcarrera = process.env.REACT_APP_API_BACKEND + "carreras/";
const URItutor = process.env.REACT_APP_API_BACKEND + "tutores/";
const URIgrupo = process.env.REACT_APP_API_BACKEND + "grupos/";

const CompCreateGrupo = () => {
  const [grupo, setGrupo] = useState("");
  const [error, setError] = useState("");
  const [idtutores, setIdtutores] = useState("");
  const [carreras, setCarreras] = useState([]);
  const [idcarreras, setIdcarreras] = useState("");

  const [idperiodos, setIdperiodos] = useState("");
  const [periodos, setPeriodos] = useState([]);

  const [tutores, setTutores] = useState([]);

  const navigate = useNavigate();

  //obteniendo carreas con turnos en el select
  useEffect(() => {
    const fetchCarrerasConTurnos = async () => {
      const response = await axios.get(URIcarrera);
      const carrerasConTurnos = response.data.map((carrera) => {
        const turno = carrera.turno;
        return {
          nombre: `${carrera.nomCarreras} ${turno}-${carrera.director}`,
          id: carrera.idcarreras,
        };
      });

      setCarreras(carrerasConTurnos);
    };
    fetchCarrerasConTurnos();
  }, []);

  //obteniendo los periodos con años en select
  useEffect(() => {
    const fetchPeriodosConAnios = async () => {
      const response = await axios.get(URIperiodo);
      const periodosConAnios = response.data.map((periodo) => {
        const anio = periodo.anio; // Obtener el turno de la carrera
        return {
          nombre: `${periodo.nomPeriodos} ${anio}`, // Combinar el nombre de la carrera con el turno correspondiente
          id: periodo.idperiodos,
        };
      });

      setPeriodos(periodosConAnios);
    };
    fetchPeriodosConAnios();
  }, []);

  useEffect(() => {
    const fetchTutores = async () => {
      try {
        const response = await axios.get(URItutor);
        const tutores = response.data.map((tutor) => {
          return {
            id: tutor.idtutores,
            nombre: tutor.nombre,
          };
        });
        setTutores(tutores);
      } catch (error) {
        // Manejar errores aquí
        console.error(error);
      }
    };
    fetchTutores();
  }, []);

  const store = async (e) => {
    e.preventDefault();
    if (!idcarreras) {
      setError("Selecciona una carrera.");
    } else if (!idperiodos) {
      setError("Selecciona periodo.");
    } else if (!idtutores) {
      setError("Selecciona un tutor.");
    } else {
      await axios.post(URIgrupo, {
        nomGrupos: grupo,
        idcarreras: idcarreras,
        idperiodos: idperiodos,
        idtutors: idtutores,
      });
      navigate("/admin/grupos");
    }
  };
  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xs p-4 sm:w-full">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow  dark:border-hidden dark:bg-navy-800  ">
            <form className="" onSubmit={store}>
              {/* Renderizar mensaje de error si existe */}
              {error && (
                <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                  {error}
                </p>
              )}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Cuatrimestre y grupo
                </label>
                <input
                  value={grupo}
                  onChange={(e) => setGrupo(e.target.value)}
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                  placeholder="Ej. 5 A"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una carrera para el grupo
                </label>
                <select
                  value={idcarreras}
                  onChange={(e) => setIdcarreras(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona una carrera
                  </option>
                  {carreras.map((carrera, index) => (
                    <option key={index} value={carrera.id}>
                      {carrera.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un periodo para el grupo
                </label>
                <select
                  value={idperiodos}
                  onChange={(e) => setIdperiodos(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona un periodo
                  </option>
                  {periodos.map((periodo, index) => (
                    <option key={index} value={periodo.id}>
                      {periodo.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un tutor para el grupo
                </label>
                <select
                  value={idtutores}
                  onChange={(e) => setIdtutores(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona un tutor
                  </option>
                  {tutores.map((tutor, index) => (
                    <option key={index} value={tutor.id}>
                      {tutor.nombre}
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

export default CompCreateGrupo;
