import React from "react";

// Admin Imports
import MainDashboard from "views/tutor/default";

import Profile from "views/tutor/profile";

import PermisoTable from "views/tutor/permiso/";

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
import CompCreatePermiso from "views/tutor/permiso/components/permiso/CreatePermiso";

const routest = [
  {
    name: "Menú principal",
    layout: "/tutor",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: (
      <RouteController isAuthenticated={true} component={MainDashboard} />
    ),
  },
  {
    path: "/",
    exact: true,
    component: HomeRedirect,
  },

  {
    name: "Mis permisos",
    layout: "/tutor",
    icon: <MdNoteAdd className="h-6 w-6" />,
    path: "permisos", // Corrected path to start with a forward slash
    component: <PermisoTable />,
  },
  {
    name: "Añadir permisos",
    layout: "/tutor",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "permiso/create",
    component: <CompCreatePermiso />,
  },

  {
    name: "Perfil",
    layout: "/tutor",
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
export default routest;
