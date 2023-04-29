import { summarizeUserInfo } from "@/util/userUtil";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  ready: boolean;
  facility: FacilityType[];
  notification: NotificationType[];
  setNotification: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  userInfo: any;
  setUserInfo: React.Dispatch<React.SetStateAction<any>>;
};

const AppContext = createContext<AppContextType>(null!);

type AppProviderProps = {
  children: React.ReactNode;
};

export type FacilityType = {
  facility_id?: number;
  facility_name?: string;
  url?: string;
  [key: string]: any;
};

export type NotificationType = {
  title: string;
  des: string;
  url: string;
};

export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState({
    attraction: [],
    show: [],
    payment: [],
    shop: [],
  });
  const [ready, setReady] = useState(false);
  const [facility, setFacility] = useState<FacilityType[]>(
    [] as FacilityType[]
  );
  const [notification, setNotification] = useState<NotificationType[]>([
    {
      title: "Welcome to voa",
      des: "we are thrilled for your arrival, please check out our fantastic facilities and have a great time!",
      url: "/attractions",
    },
    {
      title: "A test",
      des: "This is a test",
      url: "/attractions",
    },
  ]);

  useEffect(() => {
    fetch("/api/facility")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFacility(data);
        setReady(true);
  
        // Check login status after getting facility data
        if (
          sessionStorage.getItem("isLoggedIn") &&
          sessionStorage.getItem("isLoggedIn") === "true"
        ) {
          setUser(JSON.parse(sessionStorage.getItem("user") ?? ""));
          setLoggedIn(true);
          fetch(`/api/getUserInfo?userId=${user.Visitor_ID}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.summary) {
                setUserInfo(summarizeUserInfo(data.summary));
              }
            });
        } else {
          sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
          sessionStorage.setItem("user", JSON.stringify(user));
        }
      })
      .catch((error) => {
        console.error("Error fetching facility data:", error);
      });
  }, []);
  

  const contextValue: AppContextType = {
    isLoggedIn,
    setLoggedIn,
    user,
    setUser,
    userInfo,
    setUserInfo,
    ready,
    facility,
    notification,
    setNotification,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
