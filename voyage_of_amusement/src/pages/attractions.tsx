import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FacilityType, useAppContext } from "@/contexts/GlobaclContext";
import { CSSTransition } from "react-transition-group";
import FacilityCard from "@/component/AttractionCard";
import styles from "@/styles/attraction.module.css";
import Modal from "@/component/Modal";
import { Transition } from "@headlessui/react";
import { summarizeUserInfo } from "@/util/userUtil";
interface Attraction {
  name: string;
  description: string;
  options: string[];
  image: string;
}

const Attractions = () => {
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));
  const { isLoggedIn, ready, facility, user, setUserInfo } = useAppContext();
  const router = useRouter();
  const { type } = router.query;
  const [hasCheckout, setHasCheckout] = useState(false);
  const [checkoutProcess, setCheckoutProcess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardData, setCardData] = useState([] as FacilityType);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [numTickets, setNumTickets] = useState(0);

  const [selected, setSelected] = useState("");

  const attractions = [
    "Roller Coaster",
    "Water Ride",
    "Dark Rides",
    "Kid Ride",
  ];
  const stores = ["Clothing", "Toys", "Food", "Souvenirs"];
  const shows = ["Musical", "Comedy", "Magic", "Acrobatics"];
  const handleFilterClick = (type: string) => {
    setSelected(type);
  };

  const renderSubtypes = () => {
    switch (selected) {
      case "Attractions":
        return attractions.map((subtype) => (
          <div
            key={subtype}
            className="cursor-pointer border-2 border-violet-500 px-4 py-2 rounded-full text-gray-500 hover:bg-violet-500 hover:text-white transition-colors duration-300"
          >
            {subtype}
          </div>
        ));
      case "Stores":
        return stores.map((subtype) => (
          <div
            key={subtype}
            className="cursor-pointer border-2 border-amber-500 px-4 py-2 rounded-full text-gray-500 hover:bg-amber-500 hover:text-white transition-colors duration-300"
          >
            {subtype}
          </div>
        ));
      case "Shows":
        return shows.map((subtype) => (
          <div
            key={subtype}
            className="border-2 border-lime-500 px-4 py-2 rounded-full text-gray-500 hover:bg-lime-500 hover:text-white transition-colors duration-300"
          >
            {subtype}
          </div>
        ));
      default:
        return null;
    }
  };

  useEffect(() => {
    if (ready) {
      setCardData(facility.data.map((item) => ({ ...item, visible: true })));
      console.log(cardData);
    }
  }, [ready, facility]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const newCardData = cardData.map((item) => {
        const visible = item.Facility_Name.toLowerCase().includes(
          searchTerm.toLowerCase()
        );
        return { ...item, visible };
      });

      setCardData(newCardData);
      console.log(cardData);
    } else {
      setCardData((prevCardData) =>
        prevCardData.map((item) => ({ ...item, visible: true }))
      );
    }
  }, [searchTerm]);

  const handleAttractionClick = () => {
    setNumTickets(0);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHasCheckout(false);
    setCheckoutProcess(false);
  };
  const handleCheckout = async (modalData) => {
    console.log("checkout", modalData);
    setCheckoutProcess(true);
    setHasCheckout(true);
    if (numTickets == 0) {
      return;
    }
   const data = {
        facilityId: modalData.Facility_ID,
        num: numTickets,
        visitorId: user.Visitor_ID,
        sourceType:  modalData.Source_Type
    }
    console.log(data)
    await fetch(
      `/api/makeTransaction?visitorId=${user.Visitor_ID}'`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserInfo(summarizeUserInfo(data.summary))
        delay(2000);
        setCheckoutProcess(false);
      });
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">
       Attractions
      </h1>
      <div className="relative mb-5 w-full ml-5 mr-5 container">
        <input
          onInput={(e) => {
            setSearchTerm(e.currentTarget.value);
          }}
          type="text"
          id="floating_filled"
          className=" block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer"
          placeholder=" "
        />
        <label
          htmlFor="floating_filled"
          className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
        >
          Search...
        </label>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex justify-center space-x-4 w-full">
          {selected === "Attractions" ? (
            renderSubtypes()
          ) : (
            <div
              className={`d-flex cursor-pointer border-2 border-violet-500 px-4 py-2 rounded-full text-gray-500 hover:bg-violet-500 transition-colors duration-300 `}
              onClick={() => handleFilterClick("Attractions")}
            >
              Attractions
            </div>
          )}

          {selected === "Stores" ? (
            renderSubtypes()
          ) : (
            <div
              className={`d-flex cursor-pointer border-2 border-amber-500 px-4 py-2 rounded-full text-gray-500 hover:bg-amber-500 transition-colors duration-300 `}
              onClick={() => handleFilterClick("Stores")}
            >
              Stores
            </div>
          )}

          {selected === "Shows" ? (
            renderSubtypes()
          ) : (
            <div
              className={`d-flex cursor-pointer border-2 border-lime-500 px-4 py-2 rounded-full text-gray-500 hover:bg-lime-500 transition-colors duration-300 `}
              onClick={() => handleFilterClick("Shows")}
            >
              Shows
            </div>
          )}
        </div>
      </div>

      <div
        className={` ${styles.cardContainer}`}
      >
        {cardData &&
          cardData.map((data, key) => {
            return (
              data.visible && (
                <div
                  key={key}
                  className={`${styles.card} ${styles.cardAnimation}`}
                  onClick={() => {
                    setModalData(data);
                    handleAttractionClick();
                  }}
                >
                  <FacilityCard facility={data} index={key} />
                </div>
              )
            );
          })}
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          {!hasCheckout &&
            (isLoggedIn ? (
              <div className="p-8 bg-white rounded-lg shadow-lg">
                {modalData.Source_Type == "Att" && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      {modalData.Facility_Name}
                    </h2>
                    <p className="text-gray-600 mb-4 font-semibold">
                      {modalData.Facility_Description}
                    </p>

                    <h5 className="text-gray-600 my-2 font-semibold">
                      {modalData.visible
                        ? "Open to public"
                        : "Closed for maintenance"}
                    </h5>
                    <hr className="my-2" />
                    <h5 className="text-gray-600">
                      Minimum Height: {modalData.Minimum_Height} inches
                    </h5>

                    <h5 className="text-gray-600">
                      Duration: {modalData.Durations}
                    </h5>
                  </div>
                )}

                <div className="text-gray-600 mr-2 flex mt-5 justify-center">
                  Number of tickets:
                </div>
                <div className="flex items-center justify-center my-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-600 px-3 py-2 hover:bg-gray-400 hover:text-white"
                      onClick={() =>
                        setNumTickets(numTickets > 0 ? numTickets - 1 : 1)
                      }
                    >
                      -
                    </button>
                    <div className="bg-gray-200 px-3 py-2 text-gray-600 font-bold">
                      {numTickets}
                    </div>
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-600 px-3 py-2 hover:bg-gray-400 hover:text-white"
                      onClick={() => setNumTickets(numTickets + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-600 px-3 py-2 ml-auto rounded-lg transition-colors duration-300 hover:bg-gray-400 hover:text-white"
                    onClick={() => {
                      handleCheckout(modalData);
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96">
                <h4 className="text-2xl font-bold mb-5 px-2">
                  Please sign in or sign up to continue
                </h4>
                <div className="flex justify-around">
                  <button
                    className="px-6 py-3 bg-slate-500 text-white rounded-full hover:bg-slate-600 transition-colors duration-300 me-5"
                    onClick={() => {
                      router.push("/signin");
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    className="px-6 py-3 bg-slate-500 text-white rounded-full hover:bg-slate-600 transition-colors duration-300"
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            ))}
          {hasCheckout &&
            (checkoutProcess ? (
              <div className="flex flex-col">
                <h3 className="text-gray-500 mb-4 ">
                  {`We are processing your order :)`}
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
            ) : (
              <div className=" p-4 rounded-lg">
                <h5 className="text-xl font-semibold mb-3 text-center">
                  Thank you for your purchase! 
                </h5>
                <h5 className="text-xl font-semibold mb-5 pb-4 text-center">
                You can view your tickets in your
                  user page
                </h5>
                
                <div className="flex justify-end">
                <button
                  className="px-6 py-3 me-4 bg-slate-500 text-white rounded-full hover:bg-slate-600 transition-colors duration-300"
                  onClick={() => {
                    setIsModalOpen(false);
                    setHasCheckout(false);
                    setCheckoutProcess(false);
                  }}
                >
                  Sick
                </button>
                <button
                  className="px-6 py-3 bg-slate-500 text-white rounded-full hover:bg-slate-600 transition-colors duration-300"
                  onClick={() => {
                    setIsModalOpen(false);
                    setHasCheckout(false);
                    setCheckoutProcess(false);
                    router.push('/user')
                  }}
                >
                  Check it out
                </button>
                </div>
                
              </div>
            ))}
        </Modal>
      )}
    </div>
  );
};

export default Attractions;
