import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { icons } from "../constant/index";
import classNames from "classnames";
import icon from "../constant/icon";
import ColorContext from "../context/ColorContext";

const Nav = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const { theme, setTheme } = useContext(ColorContext);

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  const linkClass =
    "text-lg flex items-center mb-2 gap-2  rounded-md px-4 py-2";
  const navLinks = [
    {
      id: 1,
      name: "Dashboard",
      pathname: "/dashboard",
      icon: icons.product,
    },
    {
      id: 2,
      name: "POS",
      pathname: "/",
      icon: icons.pos,
    },
  ];

  const ColorButton = () => {
    return (
      <div className="flex absolute right-3 top-[70px] bg-gray-300 w-40 h-auto p-3 rounded-md gap-2 hover:cursor-pointer">
        <ColorTheme bg="bg-orange-400" value="orange" />
        <ColorTheme bg="bg-purple-400" value="purple" />
        <ColorTheme bg="bg-gray-400" value="gray" />
      </div>
    );
  };

  const ColorTheme = ({ bg, value }) => {
    console.log(bg);
    const setColor = (color) => {
      setTheme(color);
      setShow(false);
    };
    const dynamicClass = `w-10 rounded-full ${bg}`;
    return <div className={dynamicClass} onClick={() => setColor(value)}></div>;
  };

  return (
    <div className="h-[11vh]">
      <div className="flex justify-between items-center bg-skin-nav w-full h-full shadow-md py-2  ">
        <img
          src={icons.bePos}
          alt="mula_logo"
          className="w-[70px] h-auto object-cover ml-10"
        />
        <div className="flex gap-3 mr-5 items-center justify-center">
          {navLinks?.map((link) => (
            <div key={link.id}>
              <Link
                to={link.pathname}
                className={classNames(
                  pathname === link.pathname
                    ? "bg-skin-fill text-white"
                    : "text-secondary",
                  linkClass
                )}
              >
                <img src={link.icon} alt="" className="w-6 h-6" />
                <h1>{link.name}</h1>
              </Link>
            </div>
          ))}
          <div className="">
            {show ? (
              <img
                src={icon.setting}
                className="w-6 h-6 animate-spin"
                alt=""
                onClick={() => setShow(false)}
              />
            ) : (
              <img
                src={icon.setting}
                className="w-6 h-6 "
                alt=""
                onClick={() => setShow(true)}
              />
            )}

            {show && <ColorButton />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
