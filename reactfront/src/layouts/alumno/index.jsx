import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";

import Footer from "components/footer/Footer";
import routesa from "routesa.js";
import SidebarA from "components/sidebara";

export default function Alumno(props) {
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(routesa);
  }, [location.pathname]);

  const getActiveRoute = (routesa) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routesa.length; i++) {
      if (
        window.location.href.indexOf(
          routesa[i].layout + "/" + routesa[i].path
        ) !== -1
      ) {
        setCurrentRoute(routesa[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routesa) => {
    let activeNavbar = false;
    for (let i = 0; i < routesa.length; i++) {
      if (
        window.location.href.indexOf(routesa[i].layout + routesa[i].path) !== -1
      ) {
        return routesa[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutesa = (routesa) => {
    return routesa.map((prop, key) => {
      if (prop.layout === "/alumno") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <SidebarA open={open} onClose={() => setOpen(false)} />
      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          {/* Routesa */}
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              secondary={getActiveNavbar(routesa)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutesa(routesa)}

                <Route
                  path="/"
                  element={<Navigate to="/alumno/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
