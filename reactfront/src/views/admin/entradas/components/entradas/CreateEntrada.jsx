import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format } from "date-fns";
registerLocale("es", es); // registrar la localización de español

const URI = process.env.REACT_APP_API_BACKEND + "entradas/";

const CompCreateEntrada = () => {
  const [idproductos, setIdproductos] = useState("");
  const [numEntradas, setNumEntradas] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [fechasolicitud, setFechaSolicitud] = useState(new Date());
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State to hold the search results
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch search results based on input value
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(URI, {
          params: {
            description: idproductos,
          },
        });
        setSearchResults(
          response.data.filter((result) =>
            result.descripcion
              .toLowerCase()
              .startsWith(idproductos.toLowerCase())
          )
        );
        setShowSearchResults(true); // Set showSearchResults to true when there are search results
      } catch (error) {
        setError("Error retrieving search results");
      }
    };

    if (idproductos) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }

    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (highlightedIndex !== -1) {
          const selectedResult = searchResults[highlightedIndex];
          setSelectedResult(selectedResult);
          setShowSearchResults(false); // Hide search results when a selection is made
          setHighlightedIndex(-1); // Reset the highlighted index
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [idproductos, searchResults.length, highlightedIndex]);

  const store = async (e) => {
    e.preventDefault();

    if (selectedResult) {
      const { idproductos } = selectedResult;

      try {
        await axios.post(URI, {
          idproductos: idproductos,
          numEntradas: numEntradas,
        });

        navigate("/admin/entradas");
      } catch (error) {
        setError("Error al guardar la entrada");
      }
    }
  };
  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xs p-4 sm:w-full">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-hidden dark:bg-navy-800">
            <form className="" onSubmit={store}>
              {/* Renderizar mensaje de error si existe */}
              {error && (
                <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                  {error}
                </p>
              )}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Fecha y hora de entrada
                </label>
                <DatePicker
                  readOnly={true}
                  selected={fechasolicitud}
                  onChange={(e) => setFechaSolicitud(e.target.value)}
                  dateFormat="dd-MM-yyyy HH:mm"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholderText={format(new Date(), "yyyy-MM-dd")}
                />
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Buscar producto.
                </label>
                <div className="relative">
                  <input
                    value={
                      selectedResult ? selectedResult.descripcion : idproductos
                    }
                    onChange={(e) => {
                      setIdproductos(e.target.value);
                      setSelectedResult(null); // Reset the selected result when the input value changes
                      setShowSearchResults(true); // Show search results when the input value changes
                    }}
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                    placeholder="Buscar producto..."
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <FaSearch className="text-gray-400" />
                  </div>
                </div>
                {/* Display search results */}
                {showSearchResults &&
                  searchResults.length > 0 &&
                  !selectedResult && (
                    <ul className="mt-2 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-md">
                      {searchResults.map((result, index) => (
                        <li
                          key={result.id}
                          className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                            index === highlightedIndex ? "bg-gray-100" : ""
                          }`}
                          onClick={() => {
                            setSelectedResult(result);
                            setShowSearchResults(false); // Hide search results when a selection is made
                            setHighlightedIndex(-1); // Reset the highlighted index
                            console.log(result.idproductos);
                          }}
                        >
                          {result.descripcion}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Número de entradas.
                </label>
                <input
                  value={numEntradas}
                  onChange={(e) => setNumEntradas(e.target.value)}
                  type="number"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingrese un código de producto."
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

export default CompCreateEntrada;
