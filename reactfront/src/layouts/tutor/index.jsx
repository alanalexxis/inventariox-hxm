import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";

import Footer from "components/footer/Footer";
import routest from "routest.js";
import SidebarT from "components/sidebart";

export default function Tutor(props) {
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
    getActiveRoute(routest);
  }, [location.pathname]);

  const getActiveRoute = (routest) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routest.length; i++) {
      if (
        window.location.href.indexOf(
          routest[i].layout + "/" + routest[i].path
        ) !== -1
      ) {
        setCurrentRoute(routest[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routest) => {
    let activeNavbar = false;
    for (let i = 0; i < routest.length; i++) {
      if (
        window.location.href.indexOf(routest[i].layout + routest[i].path) !== -1
      ) {
        return routest[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getRoutest = (routest) => {
    return routest.map((prop, key) => {
      if (prop.layout === "/tutor") {
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
      <SidebarT open={open} onClose={() => setOpen(false)} />
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
              secondary={getActiveNavbar(routest)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutest(routest)}

                <Route
                  path="/"
                  element={<Navigate to="/tutor/default" replace />}
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
