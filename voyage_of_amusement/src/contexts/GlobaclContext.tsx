import React, { createContext, useContext, useState } from 'react';

type AppContextType = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  ready: boolean;
  facility: FacilityType[];
};

const AppContext = createContext<AppContextType>({
  isLoggedIn: false,
  setLoggedIn: () => { },
  ready: false,
  facility: []
});

type AppProviderProps = {
  children: React.ReactNode;
};

type FacilityType = {
  facility_id?: number,
  facility_name?: string,
  url?: string,
  [key: string]: any
}

export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false)
  const [facility, setFacility] = useState<FacilityType[]>([] as FacilityType[])
  fetch('/api/facility').then(res => res.json()).then(data => {
    console.log(data)
  })

  const contextValue: AppContextType = {
    isLoggedIn,
    setLoggedIn,
    ready,
    facility
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
