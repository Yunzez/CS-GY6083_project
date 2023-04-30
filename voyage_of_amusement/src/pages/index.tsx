import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Button from "@/component/Button";
import { useAppContext } from "@/contexts/GlobaclContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Modal from "@/component/Modal";
import styled, { keyframes } from "styled-components";

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

  const Card = styled.div`
    background: rgb(236, 236, 236);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    transition: all 0.3s ease;
    padding: 10px;
    &:hover {
      padding: 30px;
      border-radius: 100px;
    }
  `;

  const ActionBtn = styled.button`
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
    user-select: none;
    touch-action: manipulation;

    .shadow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background: hsl(0deg 0% 0% / 0.25);
      will-change: transform;
      transform: translateY(2px);
      transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    }

    .edge {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background: linear-gradient(
        to left,
        hsl(340deg 100% 16%) 0%,
        hsl(340deg 100% 32%) 8%,
        hsl(340deg 100% 32%) 92%,
        hsl(340deg 100% 16%) 100%
      );
    }

    .front {
      display: block;
      position: relative;
      padding: 12px 27px;
      border-radius: 12px;
      font-size: 1.1rem;
      color: white;
      background: hsl(345deg 100% 47%);
      will-change: transform;
      transform: translateY(-4px);
      transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
    }

    &:hover {
      filter: brightness(110%);
    }

    &:hover .front {
      transform: translateY(-6px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }

    &:active .front {
      transform: translateY(-2px);
      transition: transform 34ms;
    }

    &:hover .shadow {
      transform: translateY(4px);
      transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
    }

    &:active .shadow {
      transform: translateY(1px);
      transition: transform 34ms;
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }
  `;

  type IntroCardProps = {
    circle1Top: number;
    circle1Left: number;
    circle2Bottom: number;
    circle2Right: number;
    circle1Color: string;
    circle2Color: string;
  };

  
  const IntroCard = styled.div<IntroCardProps>`
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  margin: 20px;

  .card-inner {
    width: inherit;
    height: inherit;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(10px);
    border-radius: 8px;
  }

  &:hover {
    transform: scale(1.04) rotate(1deg);
  }

  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    animation: move-up6 2s ease-in infinite alternate-reverse;
  }

  .circle:nth-child(1) {
    top: ${({ circle1Top }) => circle1Top}px;
    left: ${({ circle1Left }) => circle1Left}px;
    background: ${({ circle1Color }) => circle1Color};
  }

  .circle:nth-child(2) {
    bottom: ${({ circle2Bottom }) => circle2Bottom}px;
    right: ${({ circle2Right }) => circle2Right}px;
    background: ${({ circle2Color }) => circle2Color};
    animation-name: move-down1;
  }

  @keyframes move-up6 {
    to {
      transform: translateY(-10px);
    }
  }

  @keyframes move-down1 {
    to {
      transform: translateY(10px);
    }
  }
`;


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
        <div className="flex justify-center">
          <Card>
            <div
              className="flex justify-center"
              onClick={() => router.push("/entranceTicket")}
            >
              <button className="flex flex-col relative bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-6 px-12 rounded-full shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl">
                <div className=" ml-auto me-auto flex-grow bg-white p-4 rounded-lg shadow mr-2 animate-bounce">
                  🎢
                </div>

                <div className="ml-4 text-2xl text-center">
                  Get Your Thrill Ticket!
                </div>
              </button>
            </div>
          </Card>
        </div>

        <div
          className={`flex flex-wrap justify-center mx-4 py-5 ${styles.awayFromFooter}`}
        >
          <IntroCard
            circle1Top={-25}
            circle1Left={525}
            circle2Bottom={25}
            circle2Right={25}
            circle1Color="rgb(63 98 18)"
            circle2Color="rgb(77 124 15)"
          >
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="card-inner">
              <div className=" px-4 py-8 flex flex-col items-center mx-3 my-8">
                <h2 className="text-3xl font-bold mb-8">
                  Discover Our Attractions
                </h2>
                <p className="text-lg font-medium text-center max-w-3xl mb-8">
                  We offer a variety of attractions that will suit every
                  interest and age. From thrilling roller coasters to delicious
                  dining options, there's something for everyone. Explore our
                  attractions below to plan your visit!
                </p>

                <ActionBtn
                  onClick={() => {
                    router.push(`/attractions`);
                  }}
                >
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front text"> View All Attractions</span>
                </ActionBtn>
              </div>
            </div>
          </IntroCard>

          <IntroCard
            circle1Top={-20}
            circle1Left={120}
            circle2Bottom={40}
            circle2Right={425}
            circle1Color="rgb(148 163 184)"
            circle2Color="rgb(55 65 81)"
          >
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="card-inner">
              <div className=" px-4 py-8 flex flex-col items-center mx-3 my-8">
                <h2 className="text-3xl font-bold mb-8">Login</h2>
                <p className="text-lg font-medium text-center max-w-3xl mb-8">
                  Sign in to your account and enjoy exclusive benefits, such as
                  early access to new attractions, special discounts, and more.
                </p>

                <ActionBtn
                  onClick={() => {
                    router.push(`/signin`);
                  }}
                >
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front text"> Login Now</span>
                </ActionBtn>
              </div>
            </div>
          </IntroCard>

          <IntroCard
            circle1Top={-25}
            circle1Left={-25}
            circle2Bottom={-25}
            circle2Right={-25}
            circle1Color=" rgb(248 113 113)"
            circle2Color="rgb(239 68 68)"
          >
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="card-inner">
              <div className=" px-4 py-8 flex flex-col items-center mx-3 my-8">
                <h2 className="text-3xl font-bold mb-8">Holidays</h2>
                <p className="text-lg font-medium text-center max-w-3xl mb-8">
                  Spend your holidays with us and create unforgettable memories
                  with your family and friends. We offer a variety of holiday
                  packages that include accommodations, attractions, and dining
                  options.
                </p>
                <ActionBtn
                  onClick={() => {
                    router.push(`/holidays`);
                  }}
                >
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front text"> Learn More</span>
                </ActionBtn>
              </div>
            </div>
          </IntroCard>

          <IntroCard
            circle1Top={-30}
            circle1Left={485}
            circle2Bottom={-25}
            circle2Right={50}
            circle1Color="rgb(251 191 36)"
            circle2Color="rgb(245 158 11)"
          >
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="card-inner">
              <div className=" px-4 py-8 flex flex-col items-center mx-3 my-8">
                <h2 className="text-3xl font-bold mb-8">Parking</h2>
                <p className="text-lg font-medium text-center max-w-3xl mb-8">
                  Park your car with ease and convenience at our parking lot. We
                  offer a variety of parking options, including covered and
                  uncovered parking, as well as valet parking.
                </p>
                <ActionBtn
                  onClick={() => {
                    router.push(`/parking`);
                  }}
                >
                  <span className="shadow"></span>
                  <span className="edge"></span>
                  <span className="front text">Reserve Now</span>
                </ActionBtn>
              </div>
            </div>
          </IntroCard>
        </div>
      </div>
    </>
  );
}
