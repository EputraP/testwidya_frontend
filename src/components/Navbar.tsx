import React from "react";
import {
  Control,
  Logo,
  Chart_fill,
  Keyboard,
  List,
  Logout,
  Update,
} from "../asset";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";

interface INavbarProps {
  FunctionParam?: (params: any) => any;
  currentFlagOpenValue: boolean;
  currentLocation: string;
}

const Navbar = (props: INavbarProps) => {
  const navigate = useNavigate();

  const signOut = useSignOut();

  const menus = [
    { title: "Dashboard", src: Chart_fill, path: "/dashboard" },
    { title: "List Device", src: List, path: "/list" },
    { title: "Input Device", src: Keyboard, path: "/input" },
    { title: "Update Device", src: Update, path: "/update" },
    { title: "Logout", src: Logout, path: "" },
  ];

  const { FunctionParam, currentFlagOpenValue, currentLocation } = props;

  const ControlClickHandler = () => {
    if (FunctionParam) FunctionParam(!currentFlagOpenValue);
  };

  const LogOutHandler = () => {
    signOut();
    navigate("/");
  };

  return (
    <>
      <img
        src={Control}
        className={`${
          currentFlagOpenValue ? "" : "transform -scale-x-100"
        } absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full `}
        onClick={ControlClickHandler}
      />
      <div className="flex gap-x-4 items-center">
        <img src={Logo} className={`cursor-pointer duration-500`} />
        <h1
          className={`text-white origin-left font-medium text-xl duration-300 ${
            !currentFlagOpenValue && "scale-0"
          }`}
        >
          Admin
        </h1>
      </div>
      <ul className="pt-6">
        {menus.map((menu, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
            mt-2 ${menu.path === currentLocation && "bg-light-white"}  `}
            onClick={() => {
              if (menu.path == "") LogOutHandler();
              navigate(menu.path);
            }}
          >
            <img src={menu.src} />
            <span
              className={`${
                !currentFlagOpenValue && "hidden"
              } origin-left duration-200`}
            >
              {menu.title}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
