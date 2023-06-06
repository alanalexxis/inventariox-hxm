import Card from "components/card";
import React from "react";

const General = () => {
  return (
    <Card extra={"w-full h-full p-3"}>
      {/* Header */}
      <div className="mt-2 mb-8 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          Información general
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          Como seres humanos, estamos dispuestos a abrir nuestro corazón y
          compartir nuestra información personal con el mundo. Creemos en la
          magia de compartir nuestras historias, nuestros sueños, nuestras
          experiencias y nuestros logros. Cada pedazo de información que
          compartimos es como una semilla que plantamos, esperando que crezca y
          florezca en nuevas oportunidades y conexiones significativas...
          Comparte tu informacion personal.
        </p>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-2 gap-4 px-2">
        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Educación</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Universidad tecnológica de la selva
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Idiomas</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Inglés, Español, Italiano
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Teléfono </p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            9191686541
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Intereses</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            Aprender a programar y jugar videjuegos
          </p>
        </div>

        <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Cumpleaños</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            05 de Octubre de 1999
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          <p className="text-sm text-gray-600">Correo secundario</p>
          <p className="text-base font-medium text-navy-700 dark:text-white">
            ema12@gmail.com
          </p>
        </div>
      </div>
    </Card>
  );
};

export default General;
