import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { format } from "date-fns";
registerLocale("es", es); // registrar la localización de español

const URI = process.env.REACT_APP_API_BACKEND + "salidas/";

const URIinventario = process.env.REACT_APP_API_BACKEND + "productos/";

const URIarea = process.env.REACT_APP_API_BACKEND + "areas/";

const CompCreateSalida = () => {
  const [idproductos, setIdproductos] = useState("");
  const [idareas, setIdAreas] = useState("");
  const [numSalidas, setNumEntradas] = useState("");
  const [numSap, setNumSap] = useState("");
  const [nomTecnico, setNomTecnico] = useState("");

  const [costoTotal, setCostoTotal] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);
  const [selectedResultArea, setSelectedResultArea] = useState(null);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [highlightedIndexArea, setHighlightedIndexArea] = useState(-1);
  const [fechaSalida, setFechaSalida] = useState(new Date());
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showSearchResultsArea, setShowSearchResultsArea] = useState(false);
  const [precioUnitario, setPrecioUnitario] = useState("");
  const searchResultsRef = useRef();
  const searchInputRef = useRef();

  // Agregar un manejador de eventos para detectar clics fuera de la lista de sugerencias
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSearchResultsArea(false);
        setShowSearchResults(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const calculateTotal = () => {
    if (selectedResult && numSalidas) {
      const total = selectedResult.costoUnitario * numSalidas;
      return total.toFixed(2); // Format the result with two decimal places
    }
    return "";
  };

  useEffect(() => {
    setCostoTotal(calculateTotal());
  }, [numSalidas, selectedResult]);

  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]); // State to hold the search results
  const [searchResultsArea, setSearchResultsArea] = useState([]); // State to hold the search results
  const navigate = useNavigate();

  //funcion buscar productos
  useEffect(() => {
    // Function to fetch search results based on input value
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(URIinventario, {
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

  //funcion buscar proveedores
  useEffect(() => {
    // Function to fetch search results based on input value
    const fetchSearchResultsArea = async () => {
      try {
        const response = await axios.get(URIarea, {
          params: {
            description: idareas,
          },
        });
        setSearchResultsArea(
          response.data.filter((result) =>
            result.nomArea.toLowerCase().startsWith(idareas.toLowerCase())
          )
        );
        setShowSearchResultsArea(true); // Set showSearchResults to true when there are search results
      } catch (error) {
        setError("Error retrieving search results");
      }
    };

    if (idareas) {
      fetchSearchResultsArea();
    } else {
      setSearchResultsArea([]);
    }

    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setHighlightedIndexArea((prevIndex) =>
          prevIndex < searchResults.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setHighlightedIndexArea((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (highlightedIndexArea !== -1) {
          const selectedResultArea = searchResultsArea[highlightedIndexArea];
          setSelectedResultArea(selectedResultArea);
          setShowSearchResultsArea(false); // Hide search results when a selection is made
          setHighlightedIndexArea(-1); // Reset the highlighted index
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [idareas, searchResultsArea.length, highlightedIndexArea]);

  //hora y fecha en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setFechaSalida(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formattedFechaSalida = format(fechaSalida, "dd-MMM-yyyy HH:mm:ss");
  // Resto de los datos que deseas enviar en tu solicitud
  const store = async (e) => {
    e.preventDefault();

    if (selectedResult && selectedResultArea) {
      const { idproductos } = selectedResult;
      const { idareas } = selectedResultArea;

      try {
        await axios.post(URI, {
          idproductos: idproductos,
          idareas: idareas,
          numSalidas: numSalidas,
          numSap: numSap,
          nomTecnico: nomTecnico,
          fechaSalida: formattedFechaSalida,
          costoTotal: costoTotal,
        });

        const productoResponse = await axios.get(
          `${process.env.REACT_APP_API_BACKEND}productos/${idproductos}`
        );
        const producto = productoResponse.data;

        const newNumSalidas =
          parseInt(producto.totalSalidas) + parseInt(numSalidas);
        const newTotalProductos =
          parseInt(producto.totalProductos) - parseInt(numSalidas);

        await axios.put(
          `${process.env.REACT_APP_API_BACKEND}productos/${idproductos}`,
          {
            totalSalidas: newNumSalidas,
            totalProductos: newTotalProductos,
            costoTotal: newTotalProductos * producto.costoUnitario,
          }
        );

        navigate("/admin/salidas");
      } catch (error) {
        setError("Error al guardar la salida");
      }
    }
  };

  return (
    <>
      <div className="relative pt-2">
        <div className="mx-auto max-w-xl p-4 sm:w-full">
          <div className="block max-w-lg rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-hidden dark:bg-navy-800">
            <form className="" onSubmit={store}>
              {/* Renderizar mensaje de error si existe */}
              {error && (
                <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
                  {error}
                </p>
              )}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Fecha y hora de salida
                </label>
                <DatePicker
                  selected={fechaSalida}
                  onChange={(date) => setFechaSalida(date)}
                  dateFormat="dd-MMM-yyyy HH:mm:ss"
                  showTimeInput
                  readOnly
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                />
              </div>
              <div className="relative mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Buscar producto.
                </label>
                <div className="relative">
                  <input
                    ref={searchInputRef}
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
                    <ul
                      ref={searchResultsRef}
                      className="absolute z-10 mt-2 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-md"
                      style={{ minWidth: "100%" }} // Set the minimum width to match the input field's width
                    >
                      {searchResults.slice(0, 6).map((result, index) => (
                        <li
                          key={result.id}
                          className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                            index === highlightedIndex ? "bg-gray-100" : ""
                          }`}
                          onClick={() => {
                            setSelectedResult(result);
                            setShowSearchResults(false); // Hide search results when a selection is made
                            setHighlightedIndex(-1); // Reset the highlighted index
                            setPrecioUnitario(result.costoUnitario);
                          }}
                        >
                          {result.descripcion}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
              <div className="-mx-3 mb-6 flex flex-wrap">
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Número de salidas.
                  </label>
                  <input
                    value={numSalidas}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numValue = parseInt(inputValue);

                      if (isNaN(numValue) || numValue < 0) {
                        // Si el valor ingresado no es un número válido o es menor que cero
                        setNumEntradas(0); // Restablecer el valor a cero
                      } else {
                        setNumEntradas(numValue); // Establecer el valor ingresado
                      }
                    }}
                    type="number"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                    placeholder="Ingrese el número de salidas."
                    required
                  ></input>
                </div>

                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Precio unitario.
                  </label>
                  <input
                    value={precioUnitario}
                    onChange={(e) => setPrecioUnitario(e.target.value)}
                    type="number"
                    className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                    placeholder="Calculando...."
                    required
                    readOnly={true}
                  ></input>
                </div>
                <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Total.
                  </label>
                  <input
                    value={costoTotal}
                    onChange={(e) => setCostoTotal(e.target.value)}
                    type="number"
                    className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                    placeholder="Calculando...."
                    required
                    readOnly={true}
                  ></input>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Número de SAP.
                </label>
                <input
                  value={numSap}
                  onChange={(e) => setNumSap(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ej. 9999"
                  required
                ></input>
              </div>
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Nombre de técnico.
                </label>
                <input
                  value={nomTecnico}
                  onChange={(e) => setNomTecnico(e.target.value)}
                  type="text"
                  className=" block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                  placeholder="Ingrese un nombre."
                  required
                ></input>
              </div>
              <div className="relative mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Buscar área.
                </label>
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    value={
                      selectedResultArea ? selectedResultArea.nomArea : idareas
                    }
                    onChange={(e) => {
                      setIdAreas(e.target.value);
                      setSelectedResultArea(null); // Reset the selected result when the input value changes
                      setShowSearchResultsArea(true); // Show search results when the input value changes
                    }}
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 dark:border-navy-600 dark:bg-navy-700 dark:text-white dark:placeholder-gray-400 dark:focus:outline-none dark:focus:ring-2 dark:focus:ring-green-500"
                    placeholder="Buscar área..."
                    required
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <FaSearch className="text-gray-400" />
                  </div>
                </div>
                {/* Display search results */}
                {showSearchResultsArea &&
                  searchResultsArea.length > 0 &&
                  !selectedResultArea && (
                    <ul
                      ref={searchResultsRef}
                      className="absolute z-10 mt-2 divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-md"
                      style={{ minWidth: "100%" }} // Set the minimum width to match the input field's width
                    >
                      {searchResultsArea.slice(0, 6).map((result, index) => (
                        <li
                          key={result.id}
                          className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                            index === highlightedIndexArea ? "bg-gray-100" : ""
                          }`}
                          onClick={() => {
                            setSelectedResultArea(result);
                            setShowSearchResultsArea(false); // Hide search results when a selection is made
                            setHighlightedIndexArea(-1); // Reset the highlighted index
                            console.log(result.nomArea);
                          }}
                        >
                          {result.nomArea}
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

export default CompCreateSalida;
