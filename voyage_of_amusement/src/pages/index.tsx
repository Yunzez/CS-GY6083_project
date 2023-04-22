import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Button from "@/component/Button";
import { useAppContext } from "@/contexts/GlobaclContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "@/component/Modal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, setLoggedIn, facility } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);
  console.log("facility", facility);

  const [currentImage, setCurrentImage] = useState(0);
  const imagePaths = [
    {
      src: "/home_img/rollercoaster.jpg",
      title: "Roller Coaster",
      description:
        "Get your heart racing with our thrilling roller coasters, featuring drops, loops, and twists that will leave you screaming for more. With rides for all ages and levels of excitement, there's something for everyone at our amusement park.",
    },
    {
      src: "/home_img/store.jpg",
      title: "Store",
      description:
        "Shop to your heart's content at our many stores, offering a wide variety of souvenirs, clothing, and snacks. Whether you're looking for a keepsake to remember your visit, or just need a quick bite to eat, our stores have you covered.",
    },
    {
      src: "/home_img/restaurant.jpg",
      title: "Restaurant",
      description:
        "Satisfy your hunger with a delicious meal at one of our many restaurants, serving up everything from classic burgers and fries to gourmet cuisine. With options for every taste and dietary preference, you're sure to find something to love at our park.",
    },
    {
      src: "/home_img/parking.jpg",
      title: "Parking",
      description:
        "Leave the hassle of finding parking to us! Our convenient parking lot offers plenty of space for your vehicle, and easy access to the park entrance. Plus, with affordable rates and friendly staff, you can park with confidence and peace of mind.",
    },
    {
      src: "/home_img/show.jpg",
      title: "Show",
      description:
        "Be entertained by our talented performers with our exciting shows, featuring music, dance, comedy, and more. From Broadway-style productions to interactive experiences, there's never a dull moment at our park. Don't miss out on the fun!",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage + 1) % imagePaths.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [currentImage]);

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + imagePaths.length) % imagePaths.length);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % imagePaths.length);
  };

  return (
    <>
      <div className="relative  py-5 mb-5 mt-2">
        <div className="relative md:h-96  py-5  h-full mb-5">
          <Image
            src={imagePaths[currentImage].src}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt={imagePaths[currentImage].title}
            className="z-10"
          />
          <div className="absolute bottom-0 left-0 right-0 p-0 bg-white shadow-lg z-10">
            <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-gray-900 bg-opacity-60 rounded">
              <div className="mx-5 px-5 flex flex-col ">
                <div className="mx-5 px-5 ">
                  <h1 className="text-xl md:text-5xl font-bold mb-4 text-white mx-5 px-5 flex justify-center ">
                    {imagePaths[currentImage].title}
                  </h1>
                </div>

                <div className="mx-5 px-5 ">
                  <h5 className="w-100 md:text-xl text-base font-medium text-white mb-8 md:px-4  px-1 flex justify-center ">
                    {imagePaths[currentImage].description}
                  </h5>
                </div>
                <div className="flex justify-center">
                  {imagePaths.map((_, index) => (
                    <span
                      key={index}
                      className={`w-3 h-3 rounded-full mx-2 ${
                        index === currentImage ? "bg-gray-900" : "bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-4 top-3/4 transform -translate-y-1/2 flex items-center justify-center h-full z-20">
            <button
              onClick={prevImage}
              className="rounded-full lg:h-16 lg:w-16 md:h-12 md:w-12 h-8 w-8 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors duration-300 focus:outline-none shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
          <div className="absolute right-4  top-3/4 transform -translate-y-1/2 flex items-center justify-center h-full z-20">
            <button
              onClick={nextImage}
              className="rounded-full lg:h-16 lg:w-16 md:h-12 md:w-12 h-8 w-8 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-300 transition-colors duration-300 focus:outline-none shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={`flex flex-wrap justify-center mx-4 py-5 ${styles.awayFromFooter}`}>
          <div
            className={`lg:w-1/3 bg-blue-100 px-4 py-8 flex flex-col items-center mx-3 my-8 ${styles.card}`}
          >
            <h2 className="text-3xl font-bold mb-8">
              Discover Our Attractions
            </h2>
            <p className="text-lg font-medium text-center max-w-3xl mb-8">
              We offer a variety of attractions that will suit every interest
              and age. From thrilling roller coasters to delicious dining
              options, there's something for everyone. Explore our attractions
              below to plan your visit!
            </p>
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-violet-400 to-red-300 text-white rounded-full hover:bg-blue-500 transition-colors duration-300 hover:opacity-90 transition-all duration-300"
              onClick={() => {
                router.push(`/attractions`);
              }}
            >
              View All Attractions
            </button>
          </div>
          <div
            className={`lg:w-1/3 bg-red-100 px-4 py-8 flex flex-col items-center mx-3 my-8 ${styles.card}`}
          >
            <h2 className="text-3xl font-bold mb-8">Login</h2>
            <p className="text-lg font-medium text-center max-w-3xl mb-8">
              Sign in to your account and enjoy exclusive benefits, such as
              early access to new attractions, special discounts, and more.
            </p>
            <button
              className="px-8 py-4 bg-gradient-to-r from-red-400 via-green-400 to-blue-400 text-white rounded-full hover:bg-red-500 transition-colors duration-300 hover:opacity-90 transition-all duration-300"
              onClick={() => {
                router.push(`/signin`);
              }}
            >
              Login Now
            </button>
          </div>
          <div
            className={`lg:w-1/3 bg-green-100 px-4 py-8 flex flex-col items-center mx-3 my-8 ${styles.card}`}
          >
            <h2 className="text-3xl font-bold mb-8">Holidays</h2>
            <p className="text-lg font-medium text-center max-w-3xl mb-8">
              Spend your holidays with us and create unforgettable memories with
              your family and friends. We offer a variety of holiday packages
              that include accommodations, attractions, and dining options.
            </p>
            <button
              className="px-8 py-4 bg-gradient-to-r from-green-600 via-blue-500 to-violet-300 text-white rounded-full hover:bg-red-500 transition-colors duration-300"
              onClick={() => {
                router.push(`/holidays`);
              }}
            >
              Learn More
            </button>
          </div>

          <div
            className={`lg:w-1/3 bg-yellow-100 px-4 py-8 flex flex-col items-center mx-3 my-8 ${styles.card}`}
          >
            <h2 className="text-3xl font-bold mb-8">Parking</h2>
            <p className="text-lg font-medium text-center max-w-3xl mb-8">
              Park your car with ease and convenience at our parking lot. We
              offer a variety of parking options, including covered and
              uncovered parking, as well as valet parking.
            </p>
            <button
              className="px-8 py-4 bg-gradient-to-r from-yellow-600 via-red-400 to-blue-300 text-white rounded-full hover:bg-yellow-500 hover:opacity-90 transition-all duration-300"
              onClick={() => {
                router.push(`/parking`);  
              }}
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
