import React from "react";

// Admin Imports
import MainDashboard from "views/alumno/default";

import Profile from "views/alumno/profile";

import PermisoTable from "views/alumno/permiso/";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLock,
  MdNoteAdd,
} from "react-icons/md";
import RouteController from "routes/RouteController";
import { HomeRedirect } from "routes/RouteUtils";
import CompCreatePermiso from "views/alumno/permiso/components/permiso/CreatePermiso";
import CompEditPermiso from "views/alumno/permiso/components/permiso/EditPermiso";

const routesa = [
  {
    name: "Menú principal",
    layout: "/alumno",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: (
      <RouteController isAuthenticated={true} component={MainDashboard} />
    ),
  },

  {
    name: "Mis permisos",
    layout: "/alumno",
    icon: <MdNoteAdd className="h-6 w-6" />,
    path: "permisos", // Corrected path to start with a forward slash
    component: <PermisoTable />,
  },
  {
    name: "Añadir permisos",
    layout: "/alumno",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "permiso/create",
    component: <CompCreatePermiso />,
  },
  {
    name: "Editar permisos",
    layout: "/alumno",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "permiso/edit/:idpermisos",
    component: <CompEditPermiso />,
  },
  {
    name: "Perfil",
    layout: "/alumno",
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
export default routesa;
