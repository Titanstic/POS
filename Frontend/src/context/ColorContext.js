import { createContext, useEffect, useState } from "react";

const ColorContext = createContext();
export const ColorContextProvider = ({ children }) => {
  const storedTheme = localStorage.getItem("SelectedColors") || "default";
  const [theme, setTheme] = useState(storedTheme);
  useEffect(() => {
    localStorage.setItem("SelectedColors", theme);
  }, [theme]);
  // useEffect(() => {
  //   localStorage.setItem("SelectedColors", "default");
  // }, []);

  return (
    <ColorContext.Provider value={{ theme, setTheme }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
