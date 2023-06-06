import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routest from "routest.js";

const SidebarT = ({ open, onClose }) => {
  // Eliminar la ruta "Editar usuarios" de la lista de rutas
  const sidebarRoutes = routest.filter(
    (route) => route.name !== "Añadir permisos"
  );

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-green-700 dark:text-white">
          UTS <span class="font-medium">PERMISOS</span>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={sidebarRoutes} />
      </ul>

      {/* Free Horizon Card */}

      {/* Nav item end */}
    </div>
  );
};

export default SidebarT;
