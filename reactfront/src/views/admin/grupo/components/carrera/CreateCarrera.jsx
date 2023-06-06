import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const URI = process.env.REACT_APP_API_BACKEND + "carreras/";
const URIdirector = process.env.REACT_APP_API_BACKEND + "directores/";
const CompCreateCarrera = () => {
  const [error, setError] = useState("");
  const [nomCarreras, setNomCarreras] = useState("");
  const [turno, setTurno] = useState("");
  const [directores, setDirectores] = useState([]);
  const [iddirectores, setIddirectores] = useState("");

  useEffect(() => {
    const fetchDirectores = async () => {
      try {
        const response = await axios.get(URIdirector);
        const directores = response.data.map((director) => {
          return {
            id: director.iddirectores,
            nombre: director.nombre,
          };
        });
        setDirectores(directores);
      } catch (error) {
        // Manejar errores aquí
        console.error(error);
      }
    };
    fetchDirectores();
  }, []);

  const navigate = useNavigate();
  //procedimiento para guardar
  const store = async (e) => {
    e.preventDefault();
    if (!iddirectores) {
      setError("Selecciona un director.");
    } else {
      await axios.post(URI, {
        nomCarreras: nomCarreras,
        turno: turno,
        iddirectors: iddirectores,
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
                  Carrera
                </label>
                <input
                  value={nomCarreras}
                  onChange={(e) => setNomCarreras(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ej. Redes"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Turno
                </label>
                <input
                  value={turno}
                  onChange={(e) => setTurno(e.target.value)}
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                  placeholder="Ej. Matutino"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un director para la carrera
                </label>
                <select
                  value={iddirectores}
                  onChange={(e) => setIddirectores(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona un director
                  </option>
                  {directores.map((director, index) => (
                    <option key={index} value={director.id}>
                      {director.nombre}
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

export default CompCreateCarrera;
