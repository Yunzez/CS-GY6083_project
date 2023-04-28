import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/contexts/GlobaclContext";
import Button from "@/component/Button";
import { useRouter } from "next/router";

const SigninPage = () => {
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));
  const router = useRouter();
  const [showProcess, setShowProcess] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const { isLoggedIn, setLoggedIn, user, setUser } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const imagePaths = [
    "/asset_img/1.jpg",
    "/asset_img/2.jpg",
    "/asset_img/3.jpg",
    "/asset_img/4.jpg",
    "/asset_img/5.jpg",
  ];

  useEffect(() => {
    let count = 0;
    const intervalId = setInterval(() => {
      // img.classList.add('w-0')
      const img = document.getElementById(`rotate_img${count - 1}`);
      let newImg = document.getElementById(`rotate_img${count}`);
      if (!newImg) {
        newImg = document.getElementById(`rotate_img${0}`);
      }
      console.log(img, newImg);
      console.log(img);
      img?.classList.add("opacity-0");
      img?.classList.add("w-0");
      newImg?.classList.remove("opacity-0");
      newImg?.classList.remove("w-0");
      count = (count + 1) % (imagePaths.length + 1);

      // setCurrentImage(currentImage => (currentImage + 1) % imagePaths.length);
      console.log(count - 1, count);
    }, 5000);

    // img.classList.remove('w-0')

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleLogin = async () => {
    console.log(email, password);
    if (email.length == 0 || password.length == 0) {
      if (email.length == 0) setError("Invalid Email");
      else if (password.length == 0) setError("Invalid password length");
      console.log("error");
      return;
    }
    setShowProcess(true);
    const data = {
      email: email,
      password: password,
    };
    await delay(2000);
    fetch("/api/authenticate?type=login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response)
          response.json().then((errorData) => {
            console.log(errorData)
            setError(errorData.error); // Throw the error with the specific error message
            setShowProcess(false);
          });
        }
      })
      .then((data) => {
        console.log(data)
        if(data !== undefined) {
          
          setUser(data.user);
          setLoggedIn(true);
          setShowProcess(false);
          setShowDone(true);
        }
      
      }).catch((err) => {
        console.log(err)
      })

  };

  return (
    <div className="mt-5 flex items-center justify-center rounded-lg">
      <div className=" flex justify-center items-center bg-slate-50 p-5 w-4/5">
        <div className={`cus_max_75vh flex flex-grow w-1/4 max-h-min`}>
          <img
            src={imagePaths[0]}
            id="rotate_img0"
            alt="Slider Image"
            className=" transition-all duration-500 object-cover rounded-lg transition-all ease-in-out"
          />
          <img
            src={imagePaths[1]}
            id="rotate_img1"
            alt="Slider Image"
            className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out"
          />
          <img
            src={imagePaths[2]}
            id="rotate_img2"
            alt="Slider Image"
            className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out"
          />
          <img
            src={imagePaths[3]}
            id="rotate_img3"
            alt="Slider Image"
            className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out"
          />
          <img
            src={imagePaths[4]}
            id="rotate_img4"
            alt="Slider Image"
            className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out"
          />
          {/* <img src={imagePaths[1]} id="rotate_img1" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-all" /> */}
        </div>
        <div className="flex flex-col items-center mt-4 w-2/5">
          {showProcess == false && showDone == false && (
            <div className="border-4 border-slate-50  px-5 py-5 mt-5">
              {error.length > 0 && (
                <div className="bg-red-200 text-red-800 px-4 py-2 rounded-md mb-4">
                  <h1 className="text-xl font-bold">{error}</h1>
                </div>
              )}
              <h1 className="text-2xl font-bold mb-4">Welcome back</h1>

              <>
                <p className="text-gray-500 mb-4">
                  We&apos;re glad to have you here
                </p>
                <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />

                <div className="flex flex-col justify-around mt-3">
                  <div className="relative mb-5">
                    <input
                      onInput={(event) => {
                        setError("");
                        setEmail((event.target as HTMLInputElement)?.value);
                      }}
                      type="email"
                      id="floating_filled"
                      className="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_filled"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      onInput={(event) => {
                        setError("");
                        setPassword((event.target as HTMLInputElement)?.value);
                      }}
                      type="email"
                      id="floating_filled"
                      className="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_filled"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Password
                    </label>
                  </div>
                </div>
              </>
              <div className="flex justify-end mt-5">
                <Button className="mt-5 mx-left" onClick={() => handleLogin()}>
                  Log in
                </Button>
              </div>
              <hr className="my-8 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
              <p className="text-gray-500 mt-5 mb-4">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-500 underline">
                  Sign up
                </Link>
                .
              </p>
            </div>
          )}

          {showProcess && (
            <>
              <div className="flex flex-col">
                <h3 className="text-gray-500 mb-4 ">
                  {`We are processing your signin request :)`}
                </h3>
                <div
                  role="status "
                  className="animate-bounce flex justify-center mt-5"
                >
                  <svg
                    aria-hidden="true"
                    className="w-14 h-14 mr-2 text-gray-200 animate-spin dark:text-slate-300 fill-indigo-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </>
          )}

          {showDone && (
            <>
              <h3 className="text-4xl flex justify-center font-bold mb-4">
                You are all set!
              </h3>
              <p className="text-gray-500 mb-4">
                You will be redirect to home page in 3 seconds, view my{" "}
                <button
                  onClick={() => {
                    router.push("/user");
                  }}
                >
                  <b>user profile</b>
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
