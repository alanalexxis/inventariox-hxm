import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";

import Profile from "views/admin/profile";
import DataTables from "views/admin/usuario";
import ProductoTabla from "views/admin/inventario/";
import EntradaTabla from "views/admin/entradas";
import GrupoTable from "views/admin/grupo/";
import PermisoTable from "views/admin/permiso/";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdSupervisedUserCircle,
  MdBarChart,
  MdPerson,
  MdLock,
  MdNoteAdd,
  MdPeople,
  MdInventory,
  MdExitToApp,
} from "react-icons/md";
import { ImEnter } from "react-icons/im";
import RouteController from "routes/RouteController";

import CompEditUsuario from "views/admin/usuario/components/usuario/EditUsuario";
import CompCreateUsuario from "views/admin/usuario/components/usuario/CreateUsuario";
import CompCreateAlumno from "views/admin/usuario/components/alumno/CreateAlumno";
import CompCreateGrupo from "views/admin/grupo/components/grupo/CreateGrupo";
import CompCreatePeriodo from "views/admin/grupo/components/periodo/CreatePeriodo";
import CompCreateCarrera from "views/admin/grupo/components/carrera/CreateCarrera";
import CompEditCarrera from "views/admin/grupo/components/carrera/EditCarrera";
import CompEditPeriodo from "views/admin/grupo/components/periodo/EditPeriodo";
import CompCreateProducto from "views/admin/inventario/components/inventario/CreateProducto";
import CompEditAlumno from "views/admin/usuario/components/alumno/EditAlumno";
import CompCreateTutor from "views/admin/usuario/components/tutor/CreateTutor";
import CompEditTutor from "views/admin/usuario/components/tutor/EditTutor";
import CompEditProducto from "views/admin/inventario/components/inventario/EditProducto";
import CompEditGrupo from "views/admin/grupo/components/grupo/EditGrupo";
import CompCreatePermiso from "views/admin/permiso/components/permiso/CreatePermiso";
import CompEditPermiso from "views/admin/permiso/components/permiso/EditPermiso";
import CompCreateDirector from "views/admin/usuario/components/director/CreateDirector";
import CompEditDirector from "views/admin/usuario/components/director/EditDirector";
import CompEditGeneral from "views/admin/profile/components/editGeneral/editGeneral";
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
    icon: <MdExitToApp className="h-6 w-6" />,
    path: "entradas",
    component: <EntradaTabla />,
  },
  {
    name: "Inventario",
    layout: "/admin",
    icon: <MdInventory className="h-6 w-6" />,
    path: "inventario",
    component: <ProductoTabla />,
  },
  {
    name: "Grupos",
    layout: "/admin",
    icon: <MdPeople className="h-6 w-6" />,
    path: "grupos",
    component: <GrupoTable />,
  },
  {
    name: "Permisos",
    layout: "/admin",
    icon: <MdNoteAdd className="h-6 w-6" />,
    path: "permisos",
    component: <PermisoTable />,
  },

  {
    name: "Editar usuarios",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/edit/:idusuarios",
    component: <CompEditUsuario />,
  },
  {
    name: "Editar carreras",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "carrera/edit/:idcarreras",
    component: <CompEditCarrera />,
  },
  {
    name: "Editar alumnos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "alumno/edit/:idalumnos",
    component: <CompEditAlumno />,
  },
  {
    name: "Editar permisos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "permiso/edit/:idpermisos",
    component: <CompEditPermiso />,
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
    name: "Editar grupos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "grupo/edit/:idgrupos",
    component: <CompEditGrupo />,
  },
  {
    name: "Editar tutores",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "tutor/edit/:idtutores",
    component: <CompEditTutor />,
  },
  {
    name: "Editar directores",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "director/edit/:iddirectores",
    component: <CompEditDirector />,
  },
  {
    name: "Editar periodos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "periodo/edit/:idperiodos",
    component: <CompEditPeriodo />,
  },
  {
    name: "Añadir usuarios",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables/create",
    component: <CompCreateUsuario />,
  },
  {
    name: "Añadir permisos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "permiso/create",
    component: <CompCreatePermiso />,
  },
  {
    name: "Añadir directores",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "director/create",
    component: <CompCreateDirector />,
  },
  {
    name: "Añadir periodos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "periodo/create",
    component: <CompCreatePeriodo />,
  },
  {
    name: "Añadir productos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "inventario/create",
    component: <CompCreateProducto />,
  },
  {
    name: "Añadir carreras",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "carrera/create",
    component: <CompCreateCarrera />,
  },
  {
    name: "Añadir tutores",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "tutor/create",
    component: <CompCreateTutor />,
  },
  {
    name: "Añadir grupos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "grupo/create",
    component: <CompCreateGrupo />,
  },

  // {
  //   name: "Añadir grupos",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "grupo/create",
  //   component: <CompCreateGrupo />,
  // },
  {
    name: "Añadir alumnos",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "alumno/create",
    component: <CompCreateAlumno />,
  },

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
