import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const URI = process.env.REACT_APP_API_BACKEND + "productos/";
const URIubicacion = process.env.REACT_APP_API_BACKEND + "ubicacions/";

const CompCreateProducto = () => {
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [costo, setCosto] = useState("");
  const [idubicacions, setIdubicacions] = useState("");
  const [categoria, setCategoria] = useState("");
  const [selectedResultUbicacion, setSelectedResultUbicacion] = useState(null);
  const [showSearchResultsUbicacion, setShowSearchResultsUbicacion] =
    useState(false);
  const [highlightedIndexUbicacion, setHighlightedIndexUbicacion] =
    useState(-1);
  const [searchResultsUbicacion, setSearchResultsUbicacion] = useState([]); // State to hold the search results
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //funcion buscar proveedores
  useEffect(() => {
    // Function to fetch search results based on input value
    const fetchSearchResultsUbicacion = async () => {
      try {
        const response = await axios.get(URIubicacion, {
          params: {
            description: idubicacions,
          },
        });
        setSearchResultsUbicacion(
          response.data.filter((result) =>
            result.nomUbicacions
              .toLowerCase()
              .startsWith(idubicacions.toLowerCase())
          )
        );
        setShowSearchResultsUbicacion(true); // Set showSearchResults to true when there are search results
      } catch (error) {
        setError("Error retrieving search results");
      }
    };

    if (idubicacions) {
      fetchSearchResultsUbicacion();
    } else {
      setSearchResultsUbicacion([]);
    }

    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndexUbicacion((prevIndex) =>
          prevIndex < searchResultsUbicacion.length - 1
            ? prevIndex + 1
            : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndexUbicacion((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (highlightedIndexUbicacion !== -1) {
          const selectedResultUbicacion =
            searchResultsUbicacion[highlightedIndexUbicacion];
          setSelectedResultUbicacion(selectedResultUbicacion);
          setShowSearchResultsUbicacion(false); // Hide search results when a selection is made
          setHighlightedIndexUbicacion(-1); // Reset the highlighted index
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [idubicacions, searchResultsUbicacion.length, highlightedIndexUbicacion]);

  const store = async (e) => {
    e.preventDefault();

    if (selectedResultUbicacion) {
      const { idubicacions } = selectedResultUbicacion;

      try {
        await axios.post(URI, {
          codBarras: codigo,
          idubicacions: idubicacions,
          descripcion: descripcion,
          totalEntradas: 0,
          totalSalidas: 0,
          totalProductos: 0,
          costoUnitario: costo,
          costoTotal: 0,
          idcategorias: categoria,
        });

        navigate("/admin/inventario");
      } catch (error) {
        setError("Error al guardar la entrada");
      }
    }
  };

  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-md p-4 sm:w-full">
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
                  Código de producto.
                </label>
                <input
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingrese un código de producto."
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Descripción.
                </label>
                <input
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingrese una descripción."
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Costo unitario.
                </label>
                <input
                  value={costo}
                  onChange={(e) => setCosto(e.target.value)}
                  type="number"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingrese el costo por unidad."
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Selecciona una categoría
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  type="number"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500 "
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="1">A</option>
                  <option value="2">B</option>
                  <option value="3">C</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Buscar ubicacion.
                </label>
                <div className="relative">
                  <input
                    value={
                      selectedResultUbicacion
                        ? selectedResultUbicacion.nomUbicacions
                        : idubicacions
                    }
                    onChange={(e) => {
                      setIdubicacions(e.target.value);
                      setSelectedResultUbicacion(null); // Reset the selected result when the input value changes
                      setShowSearchResultsUbicacion(true); // Show search results when the input value changes
                    }}
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                    placeholder="Buscar ubicacion..."
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <FaSearch className="text-gray-400" />
                  </div>
                </div>
                {/* Display search results */}
                {showSearchResultsUbicacion &&
                  searchResultsUbicacion.length > 0 &&
                  !selectedResultUbicacion && (
                    <ul className="mt-2 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-md">
                      {searchResultsUbicacion.map((result, index) => (
                        <li
                          key={result.id}
                          className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                            index === highlightedIndexUbicacion
                              ? "bg-gray-100"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedResultUbicacion(result);
                            setShowSearchResultsUbicacion(false); // Hide search results when a selection is made
                            setHighlightedIndexUbicacion(-1); // Reset the highlighted index
                            console.log(result.nomUbicacions);
                          }}
                        >
                          {result.nomUbicacions}
                        </li>
                      ))}
                    </ul>
                  )}
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

export default CompCreateProducto;
