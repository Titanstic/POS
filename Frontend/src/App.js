import React, { useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Pos from "./view/Pos";
import Home from "./view/Home";
import ColorContext from "./context/ColorContext";

const App = () => {
  const { theme, setTheme } = useContext(ColorContext);
  const [data, setData] = useState(theme); // Initialize data with the current theme

  useEffect(() => {
    if (theme !== data) {
      // Update data when theme changes
      setData(theme);
    }
  }, [theme, data]);

  return (
    <div
      className={
        data === "gray"
          ? "theme-dark"
          : data === "purple"
          ? "theme-purple"
          : data === "orange"
          ? ""
          : ""
      }
    >
      <Routes>
        <Route path="/" element={<Pos />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
