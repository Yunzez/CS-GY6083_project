import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FacilityType, useAppContext } from "@/contexts/GlobaclContext";
import { CSSTransition } from "react-transition-group";
import FacilityCard from "@/component/AttractionCard";
import styles from "@/styles/attraction.module.css";
import Modal from "@/component/Modal";
import { Transition } from "@headlessui/react";
interface Attraction {
  name: string;
  description: string;
  options: string[];
  image: string;
}

const attractionlist: Attraction[] = [
  {
    name: "Roller Coaster",
    description:
      "Experience the thrill of our roller coasters, with twists, turns, and drops that will leave you breathless!",
    options: ["Option 1", "Option 2", "Option 3"],
    image: "https://source.unsplash.com/random/800x600?rollercoaster",
  },
  {
    name: "Parking",
    description:
      "Our parking lot offers ample space for your vehicle, with easy access to the park entrance. Plus, with our secure parking, you can have peace of mind while you enjoy your day.",
    options: ["Option 1", "Option 2", "Option 3"],
    image: "https://source.unsplash.com/random/800x600?parking",
  },
  {
    name: "Shows",
    description:
      "Enjoy a variety of acts and performances, from music and dancing to acrobatics and comedy. You won't want to miss our shows!",
    options: ["Option 1", "Option 2", "Option 3"],
    image: "https://source.unsplash.com/random/800x600?shows",
  },
  {
    name: "Stores",
    description:
      "Visit our store for a range of souvenirs, snacks, and gifts for you to take home and remember your day at the park.",
    options: ["Option 1", "Option 2", "Option 3"],
    image: "https://source.unsplash.com/random/800x600?stores",
  },
  {
    name: "Restaurant",
    description:
      "Our restaurants offer a wide range of food options, from quick bites to sit-down meals. With options for all tastes and diets, you're sure to find something you love.",
    options: ["Option 1", "Option 2", "Option 3"],
    image: "https://source.unsplash.com/random/800x600?restaurant",
  },
];

const Attractions = () => {
  const { isLoggedIn, ready, facility } = useAppContext();
  const router = useRouter();
  const { type } = router.query;
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
    console.log(modalData);
  };
  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      <h1 className="text-3xl md:text-5xl font-bold mb-8">
        {type?.charAt(0).toUpperCase() + type?.slice(1)} Attractions
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
        className={`container mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-5 ${styles.cardContainer}`}
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
                onClick={() => console.log("checkout")}
              >
                Checkout
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Attractions;
