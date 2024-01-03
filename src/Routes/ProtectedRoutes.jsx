import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const useAuth = () => {
  let user = false;

  if (localStorage.getItem("userinfo")) {
    user = true;
  }
  return user;
};

export const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="login" replace state={{ from: location?.pathname }} />
  );
};
export const LoginRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return !isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location?.pathname }} />
  );
};
export const MaintenanceRoutes = () => {
  const maintenance = useSelector((state) => state.maintananceDemo.maintenance?.data?.maintenance_details);
  const location = useLocation();
  return maintenance?.maintenance !== "Y" ? (
    <Outlet />
  ) : (
   <>
   {window.location.href = "https://artdevotee.com/preview/dev/maintenance"}
    </>
  );
};
