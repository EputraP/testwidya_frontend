import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components";
import { RequireAuth } from "react-auth-kit";
import { Login, Register, Input, List, Update } from "./containers";
import Dashboard from "./containers/Dashboard";

function App() {
  let flagSideBar = false;
  let classMainContainer = "flex";
  let classRouteContainer = "h-screen w-screen";

  const location = useLocation();

  const [open, setOpen] = useState(false);

  const GetControlValue = (val: any) => {
    setOpen(val);
  };

  if (location.pathname == "/" || location.pathname == "/register") {
    classMainContainer = "flex-none";
    classRouteContainer = "p-7 text-2xl font-semibold h-screen w-screen";
    flagSideBar = true;
  }

  return (
    <div className={classMainContainer}>
      {!flagSideBar && (
        <div
          className={`${
            open ? "w-72" : "w-20"
          } h-screen p-5 pt-8 bg-dark-purple relative duration-300`}
        >
          <Navbar
            FunctionParam={GetControlValue}
            currentFlagOpenValue={open}
            currentLocation={location.pathname}
          />
        </div>
      )}
      <div className={classRouteContainer}>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <RequireAuth loginPath="/">
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/input"
            element={
              <RequireAuth loginPath="/">
                <Input />
              </RequireAuth>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/update"
            element={
              <RequireAuth loginPath="/">
                <Update />
              </RequireAuth>
            }
          />
        </Routes>
        <Routes>
          <Route
            path="/list"
            element={
              <RequireAuth loginPath="/">
                <List />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
