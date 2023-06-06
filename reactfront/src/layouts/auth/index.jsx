import Footer from "components/footer/FooterAuthDefault";
import authImg1 from "assets/img/auth/auth1.jpeg";
import authImg2 from "assets/img/auth/auth2.jpeg";
import authImg3 from "assets/img/auth/auth3.jpeg";
import authImg4 from "assets/img/auth/auth4.jpeg";
import authImg5 from "assets/img/auth/auth5.jpeg";
import authImg6 from "assets/img/auth/auth6.jpeg";
import authImg7 from "assets/img/auth/auth7.jpeg";
import authImg8 from "assets/img/auth/auth8.jpeg";
import authImg9 from "assets/img/auth/auth9.jpeg";
import authImg10 from "assets/img/auth/auth10.jpeg";
import authImg11 from "assets/img/auth/auth11.jpeg";
import authImg12 from "assets/img/auth/auth12.jpeg";
import authImg13 from "assets/img/auth/auth13.jpeg";
import authImg14 from "assets/img/auth/auth14.jpeg";
import authImg15 from "assets/img/auth/auth15.jpeg";
import authImg16 from "assets/img/auth/auth16.jpeg";
import authImg17 from "assets/img/auth/auth17.jpeg";
import authImg18 from "assets/img/auth/auth18.jpeg";
import authImg19 from "assets/img/auth/auth19.jpeg";
import authImg20 from "assets/img/auth/auth20.jpeg";

import { Link, Routes, Route, Navigate } from "react-router-dom";
import routes from "routes.js";
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import React, { useState, useEffect } from "react";

export default function Auth() {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };
  const photos = [
    authImg1,
    authImg2,
    authImg3,
    authImg4,
    authImg5,
    authImg6,
    authImg7,
    authImg8,
    authImg9,
    authImg10,
    authImg11,
    authImg12,
    authImg13,
    authImg14,
    authImg15,
    authImg16,
    authImg17,
    authImg18,
    authImg19,
    authImg20,
  ];

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [previousPhotoIndex, setPreviousPhotoIndex] = useState(0);

  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentPhotoIndex((prevIndex) =>
          prevIndex === photos.length - 1 ? 0 : prevIndex + 1
        );
        setFade(false);
      }, 500); // Wait for the fade transition to complete before changing the photo
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [photos.length]);

  const currentPhoto = photos[currentPhotoIndex];

  document.documentElement.dir = "ltr";
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <FixedPlugin />
        <main className={`mx-auto min-h-screen`}>
          <div className="relative flex">
            <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
              <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">
                <Link to="/admin" className="mt-0 w-max lg:pt-10"></Link>
                <Routes>
                  {getRoutes(routes)}
                  <Route
                    path="/"
                    element={<Navigate to="/auth/sign-in" replace />}
                  />
                </Routes>
                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                  <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">
                    <div
                      className={`absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px] ${
                        fade ? "transition-opacity duration-500" : ""
                      }`}
                      style={{
                        backgroundImage: `url(${currentPhoto})`,
                        opacity: fade ? 0 : 1,
                      }}
                    />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
