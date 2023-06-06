import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const URI = process.env.REACT_APP_API_BACKEND + "periodos/";

const CompEditPeriodo = () => {
  const [nomPeriodos, setNomPeriodos] = useState("");
  const [anio, setAnio] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { idperiodos } = useParams();

  //procedimiento para guardar
  const update = async (e) => {
    e.preventDefault();
    if (nomPeriodos.match(/\d+/)) {
      setError("El periodo no puede contener números.");
    } else if (!anio) {
      setError("Selecciona un periodo.");
    } else {
      const year = anio.getFullYear().toString();
      await axios.put(URI + idperiodos, {
        nomPeriodos: nomPeriodos,
        anio: year,
      });
      navigate("/admin/grupos");
    }
  };
  useEffect(() => {
    getBlogById();
  }, []);

  const getBlogById = async () => {
    const res = await axios.get(URI + idperiodos);
    setNomPeriodos(res.data.nomPeriodos);
    const yearDate = new Date(parseInt(res.data.anio), 0, 1);
    setAnio(yearDate);
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
                  Periodo
                </label>
                <input
                  value={nomPeriodos}
                  onChange={(e) => setNomPeriodos(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ej. Enero-Abril"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona un año para el periodo
                </label>
                <DatePicker
                  selected={anio}
                  onChange={(date) => setAnio(date)}
                  dateFormat="yyyy"
                  showYearPicker
                  placeholderText="Selecciona un año"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
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
        <div className="fixed bottom-0 left-0 z-0 w-full"></div>
      </div>
    </>
  );
};

export default CompEditPeriodo;
