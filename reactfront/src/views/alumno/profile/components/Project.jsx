import React from "react";
import image1 from "assets/img/profile/image1.jpeg";
import image2 from "assets/img/profile/image2.jpeg";
import image3 from "assets/img/profile/image3.jpeg";
import Card from "components/card";

const Project = () => {
  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          Nuestras carreras
        </h4>
        <p className="mt-2 text-base text-gray-600">
          ¡Conoce nuestras carreras de la división de TIC y mantente informado!
        </p>
      </div>
      {/* Project 1 */}
      <div className="flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image1} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              T.S.U en Desarrollo de Software Multiplataforma
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href="http://www.utselva.edu.mx/oferta/tsu-software-multiplataforma.php "
              >
                Conoce más...
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white"></div>
      </div>
      {/* Project 1 */}
      <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image3} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              T.S.U en Infraestructura de Redes Digitales
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href="http://www.utselva.edu.mx/oferta/tsu-infraestuctura-redes-digitales.php "
              >
                Conoce más...
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white"></div>
      </div>
      {/* Project 1 */}
      <div className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img className="h-[83px] w-[83px] rounded-lg" src={image2} alt="" />
          </div>
          <div className="ml-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              T.S.U en Entornos Virtuales y Negocios Digitales
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href=" http://www.utselva.edu.mx/oferta/tsu-entornos-virtuales.php"
              >
                Conoce más...
              </a>
            </p>
          </div>
        </div>
        <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white"></div>
      </div>
    </Card>
  );
};

export default Project;
