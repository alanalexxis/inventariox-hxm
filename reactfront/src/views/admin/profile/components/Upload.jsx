import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Upload = () => {
  const [data, setData] = useState({}); // Estado para los datos de la API
  const [File, setFile] = useState(); // Estado para el archivo seleccionado
  const [fileName, setFileName] = useState(""); // Estado para el nombre del archivo seleccionado
  const Userdata = JSON.parse(localStorage.getItem("legedin"));
  const [uploadStatus, setUploadStatus] = useState(false);
  // Función para manejar el cambio de archivo seleccionado
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BACKEND + "")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  // Función para manejar la subida de archivo
  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("idusuarios", Userdata.usuario.idusuarios); // Agrega el idusuarios al formulario
    formdata.append("image", File);
    console.log("formdata: ", formdata);
    axios
      .post(process.env.REACT_APP_API_BACKEND + "upload", formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          setUploadStatus(true); //
          console.log("Success");
          // Actualizar los datos para que se muestre la nueva imagen
          axios
            .get(process.env.REACT_APP_API_BACKEND + "")
            .then((res) => {
              setData(res.data[0]);
              // Actualizar también el objeto Userdata en localStorage
              const updatedUserdata = JSON.parse(
                localStorage.getItem("legedin")
              );
              updatedUserdata.usuario.image = res.data[0].image;
              localStorage.setItem("legedin", JSON.stringify(updatedUserdata));
            })
            .catch((err) => console.log(err));
        } else {
          console.log("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      {/* Componente de carga de archivos */}
      <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
        <label
          htmlFor="fileInput"
          className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0"
        >
          <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
          <h4 className="text-xl font-bold text-brand-500 dark:text-white">
            Subir foto de perfil
          </h4>
          {uploadStatus ? ( // Mostrar un mensaje si el archivo se ha subido correctamente
            <p className="mt-2 text-sm font-medium text-green-500">
              Archivo subido correctamente.
            </p>
          ) : (
            <>
              <p className="mt-2 text-sm font-medium text-gray-600">
                Archivo seleccionado:
              </p>
              <p className="mt-2 text-sm font-medium text-gray-600">
                {fileName}
              </p>
            </>
          )}
        </label>

        {/* Input oculto para seleccionar archivos */}
        <input
          id="fileInput"
          type="file"
          accept=".png, .jpg, .gif"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {/* Botón de subida */}
      <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pl-3 pb-4 dark:!bg-navy-800">
        {/* Tu contenido de perfil */}
        {/* ... */}
        <button
          href=" "
          className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={handleUpload} // Manejar la subida del archivo al hacer clic en el botón
        >
          Publicar ahora
        </button>
        <br></br>
        <div>
          {Userdata.usuario.image && (
            <img
              src={`${process.env.REACT_APP_API_BACKEND}images/${Userdata.usuario.image}`}
              alt="Profile"
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default Upload;
