import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

import Profile from "views/admin/profile";
import DataTables from "views/admin/usuario";
import ProductoTabla from "views/admin/inventario/";
import EntradaTabla from "views/admin/entradas";
import SalidaTabla from "views/admin/salidas";


import { TbDoorEnter, TbDoorExit } from "react-icons/tb";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdSupervisedUserCircle,
  MdBarChart,
  MdPerson,
  MdLock,

  MdInventory,

} from "react-icons/md";
import { ImEnter } from "react-icons/im";
import RouteController from "routes/RouteController";

import CompEditUsuario from "views/admin/usuario/components/usuario/EditUsuario";
import CompCreateUsuario from "views/admin/usuario/components/usuario/CreateUsuario";
import CompCreateProducto from "views/admin/inventario/components/inventario/CreateProducto";
import CompEditProducto from "views/admin/inventario/components/inventario/EditProducto";
import CompCreateEntrada from "views/admin/entradas/components/entradas/CreateEntrada";
import CompEditEntrada from "views/admin/entradas/components/entradas/EditEntrada";
import CompEditSalida from "views/admin/salidas/components/salidas/EditSalida";
import CompEditGeneral from "views/admin/profile/components/editGeneral/editGeneral";
import CompCreateSalida from "views/admin/salidas/components/salidas/CreateSalida";
const routes = [
  {
    name: "Menú principal",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: (
      <RouteController isAuthenticated={true} component={MainDashboard} />
    ),
  },

  {
    name: "Usuarios",
    layout: "/admin",
    icon: <MdSupervisedUserCircle className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  {
    name: "Entradas",
    layout: "/admin",
    icon: <TbDoorEnter className="h-6 w-6" />,
    path: "entradas",
    component: <EntradaTabla />,
  },
  {
    name: "Salidas",
    layout: "/admin",
    icon: <TbDoorExit className="h-6 w-6" />,
    path: "salidas",
    component: <SalidaTabla />,
  },
  {
    name: "Añadir salidas",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "salidas/create",
    component: <CompCreateSalida />,
  },
  {
    name: "Editar salidas",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "salidas/edit/:idsalidas",
    component: <CompEditSalida />,
  },
  {
    name: "Añadir entradas",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "entradas/create",
    component: <CompCreateEntrada />,
  },
  {
    name: "Editar entradas",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "entrada/edit/:identradas",
    component: <CompEditEntrada />,
  },
  {
    name: "Inventario",
    layout: "/admin",
    icon: <MdInventory className="h-6 w-6" />,
    path: "inventario",
    component: <ProductoTabla />,
  },
  

  {
    name: "Editar usuarios",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/edit/:idusuarios",
    component: <CompEditUsuario />,
  },

  {
    name: "Editar info",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "usuario/edit/:idusuarios",
    component: <CompEditGeneral />,
  },
  {
    name: "Editar productos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "inventario/edit/:idproductos",
    component: <CompEditProducto />,
  },



  {
    name: "Añadir usuarios",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/create",
    component: <CompCreateUsuario />,
  },

  {
    name: "Añadir productos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "inventario/create",
    component: <CompCreateProducto />,
  },




  // {
  //   name: "Añadir grupos",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "grupo/create",
  //   component: <CompCreateGrupo />,
  // },


  {
    name: "Perfil",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Cerrar sesión",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    onClick: () => localStorage.clear(),
  },
];
export default routes;
