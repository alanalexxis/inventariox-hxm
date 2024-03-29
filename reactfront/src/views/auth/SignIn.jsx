import InputField from "components/fields/InputField";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Checkbox from "components/checkbox";

export default function SignIn() {
  const [rememberMe, setRememberMe] = useState(false);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const submitButton = document.getElementById("submit-button");
      if (submitButton) {
        submitButton.click();
      }
    }
  };
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  const [body, setBody] = useState({ correo: "", contrasena: "" });
  const [error, setError] = useState(null); // nuevo estado para almacenar el mensaje de error
  const navigate = useNavigate();

  const inputChange = ({ target }) => {
    const { name, value } = target;
    setBody({
      ...body,
      [name]: value,
    });
  };
  const onSubmit = () => {
    // Validación de correo
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(body.correo)) {
      setError("Introduce un correo válido");
      return;
    }

    // Validación de contraseña
    if (!body.contrasena) {
      setError("Introduce una contraseña");
      return;
    }
    console.log(process.env.REACT_APP_API_BACKEND);
    axios
      .post(process.env.REACT_APP_API_BACKEND + "api/login/", body)
      .then(({ data }) => {
        console.log(data);

        // Guardar datos del usuario en localStorage
        localStorage.setItem("legedin", JSON.stringify(data)); // Almacenar el objeto del usuario como una cadena JSON
        localStorage.setItem("auth", '"yes"'); // Almacenar el valor "yes" para indicar que el usuario ha iniciado sesión
        // Guardar opción "Recordarme" en localStorage si se seleccionó
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        } else {
          localStorage.removeItem("rememberMe");
        }

        // Verificar el valor de idrangos
        if (data.usuario.idrangos === 1) {
          navigate("/admin"); // Redireccionar a /admin si idrangos = 1
        } else if (data.usuario.idrangos === 2) {
          navigate("/admin/"); // Redireccionar a /usuario/ si idrangos = 2
        }
      })
      .catch(({ response }) => {
        console.log(response.data);
        setError(response.data); // establecer el mensaje de error en el estado
      });

    // Agregar un listener de eventos para el evento beforeunload
    window.addEventListener("beforeunload", function () {
      // Verificar si la opción "Recuérdame" no está seleccionada
      if (!rememberMe) {
        // Borrar los datos del localStorage bajo la clave "legedin"
        localStorage.removeItem("legedin");
        localStorage.removeItem("auth");
      }
    });
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Bienvenido de nuevo.
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Introduce tus datos para iniciar sesión!
        </p>
        {error && (
          <p className="mt-2 rounded border border-red-400 bg-red-100 px-4 py-2 text-red-500">
            {error}
          </p>
        )}

        <div className="mb-6 flex items-center  gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>
        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Correo"
          placeholder="example@mail.com"
          id="email"
          type="text"
          value={body.correo}
          onChange={inputChange}
          name="correo"
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Contraseña"
          placeholder=""
          id="password"
          type="password"
          value={body.contrasena}
          onChange={inputChange}
          name="contrasena"
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox checked={rememberMe} onChange={handleRememberMe} />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Recuérdame
            </p>
          </div>
          <a
            className="text-sm font-medium text-green-500 hover:text-green-800 dark:text-green-500 dark:hover:text-green-800"
            href=" "
          >
            Contraseña olvidada?
          </a>
        </div>
        <button
          id="submit-button" // Agrega el id al botón de enviar
          onClick={onSubmit}
          className="linear mt-2 w-full rounded-xl bg-green-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
