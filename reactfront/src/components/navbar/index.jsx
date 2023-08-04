import React from "react";
import Dropdown from "components/dropdown";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";

import navbarimagee from "assets/img/layout/UtsBanner.png";
import Profile from "assets/img/avatars/avatarSimmmple.png";
import { BsArrowBarUp } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import {
  IoMdNotificationsOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";

const Navbar = (props) => {
  const data = JSON.parse(localStorage.getItem("legedin"));
  const { onOpenSidenav, brandText } = props;
  const [darkmode, setDarkmode] = React.useState(false);

  const Userdata = localStorage.getItem("legedin")
    ? JSON.parse(localStorage.getItem("legedin"))
    : null;

  const [userImage, setUserImage] = React.useState(
    Userdata && Userdata.usuario && Userdata.usuario.image
      ? Userdata.usuario.image
      : null
  );

  React.useEffect(() => {
    if (Userdata && Userdata.usuario && Userdata.usuario.image) {
      setUserImage(Userdata.usuario.image);
    }
  }, [Userdata?.usuario?.image]);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el localStorage
    localStorage.clear();
    // Redireccionar a la página de inicio de sesión
    navigate("/auth/sig-in");
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-lg dark:bg-[#0b14374d]">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-green-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-green-700 hover:text-green-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-green-700 hover:underline dark:text-white dark:hover:text-white"
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-green-700 dark:text-white">
          <Link
            to="#"
            className="font-bold capitalize hover:text-green-700 dark:hover:text-white"
          >
            {brandText}
          </Link>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-green-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Buscar..."
            class="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-green-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white sm:w-fit"
          />
        </div>
        <span
          className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          onClick={onOpenSidenav}
        >
          <FiAlignJustify className="h-5 w-5" />
        </span>
        {/* start Notification */}
        <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdNotificationsOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
          children={
            <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-green-700 dark:text-white">
                  Recordatorios
                </p>
                <p className="text-sm font-bold text-green-700 dark:text-white"></p>
              </div>

              <button className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-green-200 to-green-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-green-900 dark:text-white">
                    Nota:
                  </p>
                  <p className="font-base text-left text-xs text-green-900 dark:text-white">
                    Los permisos podrán solicitarse como máximo 3 días hábiles
                    después de la inasistencia
                  </p>
                </div>
              </button>

              <button className="flex w-full items-center">
                <div className="flex h-full w-[85px] items-center justify-center rounded-xl bg-gradient-to-b from-green-200 to-green-500 py-4 text-2xl text-white">
                  <BsArrowBarUp />
                </div>
                <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                  <p className="mb-1 text-left text-base font-bold text-green-900 dark:text-white">
                    Recuerda:
                  </p>
                  <p className="font-base text-left text-xs text-green-900 dark:text-white">
                    Durante periodos de evaluación los permisos no podrán ser
                    aprobados, evita perder tus permisos!
                  </p>
                </div>
              </button>
            </div>
          }
          classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
        />
        {/* start Horizon PRO */}
        <Dropdown
          button={
            <p className="cursor-pointer">
              <IoMdInformationCircleOutline className="h-4 w-4 text-gray-600 dark:text-white" />
            </p>
          }
          children={
            <div className="flex w-[350px] flex-col gap-2 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div
                style={{
                  backgroundImage: `url(${navbarimagee})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="mb-2 aspect-video w-full rounded-lg"
              />
              <a
                target="blank"
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl bg-green-500 py-[11px] font-bold text-white transition duration-200 hover:bg-green-600 hover:text-white active:bg-green-700 dark:bg-green-400 dark:hover:bg-green-300 dark:active:bg-green-200"
              >
                Descarga nuestra app móvil
              </a>
              <a
                target="blank"
                href=""
                className="px-full linear flex cursor-pointer items-center justify-center rounded-xl border py-[11px] font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
              >
                Ver documentación
              </a>
              <a
                target="blank"
                href=""
                className="hover:bg-black px-full linear flex cursor-pointer items-center justify-center rounded-xl py-[11px] font-bold text-navy-700 transition duration-200 hover:text-navy-700 dark:text-white dark:hover:text-white"
              >
                Probar ahora
              </a>
            </div>
          }
          classNames={"py-2 top-6 -left-[250px] md:-left-[330px] w-max"}
          animation="origin-[75%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
        />
        <div
          className="cursor-pointer text-gray-600"
          onClick={() => {
            if (darkmode) {
              document.body.classList.remove("dark");
              setDarkmode(false);
            } else {
              document.body.classList.add("dark");
              setDarkmode(true);
            }
          }}
        >
          {darkmode ? (
            <RiSunFill className="h-4 w-4 text-gray-600 dark:text-white" />
          ) : (
            <RiMoonFill className="h-4 w-4 text-gray-600 dark:text-white" />
          )}
        </div>

        <Dropdown
          button={
            Userdata && Userdata.usuario && Userdata.usuario.image ? (
              <img
                className="h-10 w-10 rounded-full"
                alt="Profile"
                src={`${process.env.REACT_APP_API_BACKEND}images/${userImage}`}
              />
            ) : (
              <img
                className="h-10 w-10 rounded-full"
                alt="Profile"
                src={Profile}
              />
            )
          }
          children={
            <div className="flex h-48 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <div className="mt-3 ml-4">
                <div className="flex items-center gap-2">
                  {" "}
                  {data && (
                    <>
                      {data.usuario ? (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          👋 Hey, {data.usuario.correo}
                        </p>
                      ) : data.tutor ? (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          👋 Hey, {data.tutor.nombre}
                        </p>
                      ) : data.director ? (
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          👋 Hey, {data.director.nombre}
                        </p>
                      ) : (
                        // Mensaje por defecto si no se encuentra el tipo de usuario
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                          👋 Hey, usuario desconocido
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />

              <div className="mt-3 ml-4 flex flex-col">
                <a
                  href=" "
                  className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Configuración de perfil
                </a>
                <a
                  href=" "
                  className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                >
                  Newsletter Settings
                </a>

                <Link
                  to="/auth/sign-in/"
                  className="mt-3 text-sm font-medium text-red-500 hover:text-red-500"
                  onClick={handleLogout}
                >
                  Cerrar sesión
                </Link>
              </div>
            </div>
          }
          classNames={"py-2 top-8 -left-[180px] w-max"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
