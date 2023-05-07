import React, { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/router";
import avator from "../../public/user.png";
import { useAppContext } from "@/contexts/GlobaclContext";
import Image from "next/image";

type LayoutProps = {
  className?: string;
};

const Navbar: React.FC<LayoutProps> = ({ className }) => {
  const router = useRouter();
  const [firstLoad, setFirstLoad] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, setLoggedIn, notification, setUser } = useAppContext();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    if (firstLoad) {
      setFirstLoad(false);
    }
  };

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsNotifOpen(!isNotifOpen);
    // Add your logic for dropdown behavior here
  };

  return (
    <div className={className}>
      <div
        id="sideNav"
        className={`${showMenu ? "show" : firstLoad ? "" : "close"} side-nav `}
      >
        <Button
          className="absolute top-2 right-2"
          onClick={() => {
            toggleMenu();
          }}
        >
          Back
        </Button>
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex flex-col items-center justify-center">
            <Button
              className="text-lg font-bold text-gray-800 my-4"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            <Button
              className="text-lg font-bold text-gray-800 my-4"
              onClick={() => router.push("/about")}
            >
              About
            </Button>
            {!isLoggedIn && (
              <Button
                className="text-lg font-bold text-gray-800 my-4"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            )}

            {isLoggedIn && (
              <Button
                className="text-lg font-bold text-gray-800 my-4"
                onClick={() => {
                  setLoggedIn(false);
                  setUser({});
                  router.push("/");
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="inset-x-0 top-0 bg-slate-100 text-white py-2 border-2 shadow-lg flex flex-col md:flex-row justify-between md:items-center w-full z-50">
        <div className="ml-5 hidden md:flex cursor-pointer">
          <Image src="/logo.png" alt="Logo" width={90} height={90} />
          {/* <h3 className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 border-b-4 border-indigo-500 hover:border-indigo-700 rounded transition-colors">
                        VOA
                    </h3> */}
        </div>
        <div className="hidden md:flex items-center justify-end md:flex-1 mr-5">
          {isLoggedIn && (
            <div
              className="cursor-pointer mx-2 flex items-center bg-slate-500 text-white font-bold py-2 px-4 rounded-full hover:bg-slate-600 rounded shadow-md transition-colors"
              onClick={handleDropdownClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bell-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
              </svg>
              <h5 className="ml-2">{notification.length}</h5>

              {/* Add your dropdown content here */}
              {isNotifOpen && (
                <div
                  className="absolute bg-white p-5 text-black py-2 px-4 mt-5 rounded-lg shadow-lg translate-x-[-100px] z-[999] animate-fade-in"
                  style={{
                    top: "40px",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <div>
                    <div className="m-2">
                    <small >Click anywhere beyound the notification card to close</small>
                    </div>
                  
                    {notification.length > 0 ? (
                      notification.map((element, index) => (
                        <div
                          key={index}
                          className="mb-4 p-4 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
                          onClick={() => router.push(element.url)}
                        >
                          <h5 className="text-lg font-semibold">
                            {element.title}
                          </h5>
                          <p className="text-sm text-gray-600">{element.des}</p>
                        </div>
                      ))
                    ) : (
                      <h5 className="text-gray-600">
                        You have no new notifications
                      </h5>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          <Button className="mx-2" onClick={() => router.push("/")}>
            Home
          </Button>
          <Button className="mx-2" onClick={() => router.push("/about")}>
            About
          </Button>
          {!isLoggedIn && (
              <Button
              className="mx-2"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
            )}

            {isLoggedIn && (
              <Button
              className="mx-2"
                onClick={() => {
                  setLoggedIn(false);
                  setUser({});
                  sessionStorage.setItem("isLoggedIn", 'false')
                  router.push("/");
                }}
              >
                Logout
              </Button>
            )}
          {isLoggedIn && (
            <>
              <Button
                className="mx-2 flex items-center justify-center"
                onClick={() => router.push("/user")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              </Button>
            </>
          )}
        </div>
        <div className="flex md:hidden items-center justify-end md:flex-1 mr-5">
          <button
            onClick={() => {
              toggleMenu();
            }}
            className=" rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
            aria-haspopup="true"
          >
            <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
