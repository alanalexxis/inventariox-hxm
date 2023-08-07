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
          Nuestros hoteles.
        </h4>
        <p className="mt-2 text-base text-gray-600">
          ¡Explora nuestras emocionantes opciones de hoteles en Xcaret y
          mantente al día con las últimas novedades!
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
              Hotel Xcaret México.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href="https://www.hotelxcaretmexico.com/es/"
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
              Hotel Xcaret Arte.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href="https://www.hotelxcaretarte.com/es/"
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
              La Casa de la Playa.
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <a
                className="ml-1 font-medium text-brand-500 hover:text-brand-500 dark:text-white"
                href="https://www.lacasadelaplaya.com/es/"
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
