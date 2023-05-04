import { summarizeUserInfo } from "@/util/userUtil";
import React, { createContext, useContext, useEffect, useState } from "react";

type AppContextType = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  ready: boolean;
  facility: FacilityType;
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
  data? : FacilityDetailType[];
  [key: string]: any;
};
export type FacilityDetailType = {
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

export type UserType = {
  Visitor_ID?: string;
  Email?: string;
  Fname?: string;
  Lname?: string;
  Visitor_Type?: string;
  Birthdate?: string;
  Cell_Number?: string;
  City?: string
};

export const useAppContext = () => useContext(AppContext);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType>({});
  const [userInfo, setUserInfo] = useState({
    attraction: [],
    show: [],
    payment: [],
    shop: [],
    ticket: [],
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
    console.log(
      sessionStorage.getItem("isLoggedIn"),
      sessionStorage.getItem("isLoggedIn") === "true"
    );
    fetch("/api/facility")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFacility(data);
        setReady(true);
      })
      .catch((error) => {
        console.error("Error fetching facility data:", error);
      });
  }, []);

  useEffect(() => {
    if (
      sessionStorage.getItem("isLoggedIn") &&
      sessionStorage.getItem("isLoggedIn") === "true"
    ) {
      setUser(JSON.parse(sessionStorage.getItem("user") ?? ""));
      setLoggedIn(true);
    } else {
      sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      sessionStorage.setItem("user", JSON.stringify(user));
    }
    // const currUser = JSON.parse(sessionStorage.getItem("user"))
    // const currLoginStatus = Boolean(sessionStorage.getItem("isLoggedIn"));
    // console.log("check user", currUser, currLoginStatus);
    // if (currLoginStatus && currUser) {
    //   console.log("fetch user", currUser);
    //   fetch(`/api/getUserInfo?userId=${currUser.Visitor_ID}`)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.summary) {
    //         setUserInfo(summarizeUserInfo(data.summary));
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching user info:", error);
    //     });
    // }
  }, []);

  useEffect(() => {
    console.log("run");
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    if (isLoggedIn && user) {
      console.log("fetch user", user);
      fetch(`/api/getUserInfo?userId=${user.Visitor_ID}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.summary) {
            setUserInfo(summarizeUserInfo(data.summary));
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [user, isLoggedIn]);

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
