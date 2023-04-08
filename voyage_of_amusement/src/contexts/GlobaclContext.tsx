import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType>({
  isLoggedIn: true,
  setLoggedIn: () => {},
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const contextValue: AppContextType = {
    isLoggedIn,
    setLoggedIn,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
