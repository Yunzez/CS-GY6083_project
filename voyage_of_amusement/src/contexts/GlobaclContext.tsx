import React, { createContext, useContext, useEffect, useState } from 'react';


type AppContextType = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any,
  setUser:  React.Dispatch<React.SetStateAction<any>>;
  ready: boolean;
  facility: FacilityType[];
};

const AppContext = createContext<AppContextType>(null!);


type AppProviderProps = {
  children: React.ReactNode;
};

export type FacilityType = {
  facility_id?: number,
  facility_name?: string,
  url?: string,
  [key: string]: any
}

export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [ready, setReady] = useState(false)
  const [facility, setFacility] = useState<FacilityType[]>([] as FacilityType[])
  useEffect(() => {
    fetch('/api/facility')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setFacility(data);
        setReady(true);
      })
      .catch(error => {
        console.error('Error fetching facility data:', error);
      });
  }, []);

  
  const contextValue: AppContextType = {
    isLoggedIn,
    setLoggedIn,
    user, 
    setUser,
    ready,
    facility
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
