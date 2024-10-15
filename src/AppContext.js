import React, { createContext, ReactNode, useState } from "react";

// Create App Context
const AppContext = createContext(null);
export default AppContext;

// Create Context Provider
function AppContextProvider({ children }) {
  const [listBooks, setListBooks] = useState([]);
  const [listCurrent, setListCurrent] = useState([]);
  const [listWant, setListWant] = useState([]);
  const [listRead, setListRead] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchList, setSearchList] = useState([]);
  return (
    <AppContext.Provider
      value={{
        searchInput,
        setSearchInput,
        listCurrent,
        setListCurrent,
        listWant,
        setListWant,
        listRead,
        setListRead,
        listBooks,
        setListBooks,
        searchList,
        setSearchList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };
