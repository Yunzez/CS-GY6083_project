import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  isLoggedIn: true,
  setLoggedIn: () => {},
});

export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const contextValue: AppContextType = {
    isLoggedIn,
    setLoggedIn,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
