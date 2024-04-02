import { createContext, useState } from "react";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [search, DataSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, DataSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
