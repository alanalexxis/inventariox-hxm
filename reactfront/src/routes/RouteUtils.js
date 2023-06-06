import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export const HomeRedirect = () => <Navigate to="/auth/sign-in" />;

export const renderRoutes = (routes, extraProps = {}) =>
  routes ? (
    <Routes>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          element={
            route.render ? (
              route.render({ ...extraProps, route: route })
            ) : (
              <route.component {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Routes>
  ) : null;
