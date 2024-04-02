import { createContext, useState } from "react";

const NavContext = createContext();

export const NavContextProvider = ({ children }) => {
    const [ nav, setNav ] = useState("");
    const [ mainNav, setMainNav ] = useState("");

    return (
        <NavContext.Provider value={{ nav, setNav, mainNav, setMainNav }}>
            { children }
        </NavContext.Provider>
    )
}

export default NavContext;

