import { HiX } from "react-icons/hi";
import Links from "./components/Links";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  // Eliminar la ruta "Editar usuarios" de la lista de rutas
  const sidebarRoutes = routes.filter(
    (route) =>
      route.name !== "Editar usuarios" &&
      route.name !== "Añadir usuarios" &&
      route.name !== "Añadir productos" &&
      route.name !== "Editar productos" &&
      route.name !== "Editar entradas" &&
      route.name !== "Editar info" &&
      route.name !== "Añadir salidas" &&
      route.name !== "Editar salidas" &&
      route.name !== "Añadir entradas" &&
      route.name !== "Grupos" &&
      route.name !== "Permisos"
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
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[24px] font-bold uppercase text-green-700 dark:text-white">
          HXM <span class="font-medium">INVENTARIO</span>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={sidebarRoutes} />
      </ul>
    </div>
  );
};

export default Sidebar;
