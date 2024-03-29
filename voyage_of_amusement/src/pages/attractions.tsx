import { useRouter } from "next/router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FacilityType,
  useAppContext,
  FacilityDetailType,
} from "@/contexts/GlobaclContext";
import { CSSTransition } from "react-transition-group";
import FacilityCard from "@/component/AttractionCard";
import styles from "@/styles/attraction.module.css";
import Modal from "@/component/Modal";
import { Transition } from "@headlessui/react";
import styled from "styled-components";
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
  const { isLoggedIn, ready, facility, user, setUserInfo, refetchFacility } =
    useAppContext();
  const router = useRouter();

  const [hasCheckout, setHasCheckout] = useState(false);
  const [checkoutProcess, setCheckoutProcess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<FacilityDetailType>({});
  const [numTickets, setNumTickets] = useState(1);
  const [selected, setSelected] = useState("Attractions");
  const [targetFacility, setTargetFacility] = useState<FacilityDetailType>([]);
  const [filteredFacility, setFilteredFacility] = useState([]);
  const FilterDiv = styled.div`
    padding: 25px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    width: 96vw;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #f8fbfe;
    border-radius: 8px;
    z-index: 1;

    .tools {
      display: flex;
      align-items: center;
      padding: 9px;
    }

    .circle {
      padding: 0 4px;
    }

    .box {
      display: inline-block;
      align-items: center;
      width: 10px;
      height: 10px;
      padding: 1px;
      border-radius: 50%;
    }

    .red {
      background-color: #ff605c;
    }

    .yellow {
      background-color: #ffbd44;
    }

    .green {
      background-color: #00ca4e;
    }
  `;

  const SqureSep = styled.hr`
 
    background: rgb(71 85 105);
    width: 30vw;
    margin-bottom:30px;
    
  }`;
  const handleFilterClick = (type: string) => {
    console.log("trigger", type);
    // console.log(facility.data);
    if (!facility.data) {
      return;
    }
    let abbreviation: string;
    switch (type) {
      case "Attractions":
        abbreviation = "Att";
        break;
      case "Shows":
        abbreviation = "Shw";
        break;
      case "Stores":
        abbreviation = "Sto";
        break;
      default:
        abbreviation = "";
        break;
    }

    setTargetFacility(
      facility.data.filter(
        (item) => item.Source_Type === abbreviation
      ) as never[]
    );
    setFilteredFacility(
      facility.data.filter(
        (item) => item.Source_Type === abbreviation
      ) as never[]
    );
  };

  useEffect(() => {
    console.log("trigger [ready, facility]");
    if (ready) {
      console.log("ready");
      setTargetFacility(
        facility.data?.filter((item) => item.Source_Type === "Att") as never[]
      );
      setFilteredFacility(targetFacility as never[]);
      console.log(targetFacility, facility);

      if (facility.length === 0) {
        console.log("refetch facility");
        refetchFacility();
        console.log(facility);
      }
    }
  }, [ready, facility]);

  useEffect(() => {
    console.log("targetFacility changed:", targetFacility);
    if (targetFacility.length > 0) {
      setFilteredFacility(targetFacility as never[]);
    }
  }, [targetFacility]);

  console.log("refresh");
  const handleSearchSubmit = (searchTerm: string) => {
    if (searchTerm.length > 0) {
      const newFacility = targetFacility.filter((item: FacilityDetailType) =>
        item.Facility_Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFacility(newFacility);
    } else {
      handleFilterClick(selected);
      setFilteredFacility(targetFacility as never[]);
    }
  };

  const handleAttractionClick = () => {
    setNumTickets(1);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setHasCheckout(false);
    setCheckoutProcess(false);
  };
  const handleCheckout = async (modalData: FacilityDetailType) => {
    console.log("checkout", modalData);
    setCheckoutProcess(true);
    setHasCheckout(true);
    if (numTickets == 0) {
      return;
    }
    const data = {
      facilityId: modalData?.Facility_ID,
      num: numTickets,
      visitorId: user.Visitor_ID,
      sourceType: modalData?.Source_Type,
    };
    console.log(data);
    await fetch(`/api/makeTransaction?visitorId=${user.Visitor_ID}'`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserInfo(summarizeUserInfo(data.summary));
        delay(2000);
        setCheckoutProcess(false);
      });
  };

  return (
    <div className="flex flex-col items-center p-2 md:p-8">
      <div className="flex flex-col items-center space-y-2">
        <FilterDiv>
          <div className="tools">
            <div className="circle">
              <span className="red box"></span>
            </div>
            <div className="circle">
              <span className="yellow box"></span>
            </div>
            <div className="circle">
              <span className="green box"></span>
            </div>
          </div>
          <div className="card__content">
            <div className="container flex text-center relative md:mb-5 md:pt-5 md:mt-5 container mx-auto justify-center md:w-screen ">
              <div className="flex flex-col">
                <h1 className="  text-3xl md:text-5xl font-bold mb-4 md:ms-8 text-indigo-900">
                  {" "}
                  Browse Our Attractions
                </h1>

                <h6 className=" md:text-xl font-semibold mb-8 md:ms-8 text-indigo-800">
                  {" "}
                  Selected Filter to View Different Attractions
                </h6>
              </div>
            </div>

            <div className="flex justify-center space-x-4 w-full">
              <div
                className={`cursor-pointer border-2 border-violet-500 px-4 py-2 rounded-full text-gray-500 ${
                  selected === "Attractions"
                    ? "bg-violet-500 text-white"
                    : "hover:bg-violet-500 hover:text-white"
                } transition-colors duration-300`}
                onClick={() => {
                  setSelected("Attractions");
                  handleFilterClick("Attractions");
                }}
              >
                Attractions
              </div>

              <div
                className={`cursor-pointer border-2 border-amber-500 px-4 py-2 rounded-full text-gray-500 ${
                  selected === "Stores"
                    ? "bg-amber-500 text-white"
                    : "hover:bg-amber-500 hover:text-white"
                } transition-colors duration-300`}
                onClick={() => {
                  setSelected("Stores");
                  handleFilterClick("Stores");
                }}
              >
                Stores
              </div>

              <div
                className={`cursor-pointer border-2 border-lime-500 px-4 py-2 rounded-full text-gray-500 ${
                  selected === "Shows"
                    ? "bg-lime-500 text-white"
                    : "hover:bg-lime-500 hover:text-white"
                } transition-colors duration-300`}
                onClick={() => {
                  setSelected("Shows");
                  handleFilterClick("Shows");
                }}
              >
                Shows
              </div>
            </div>
          </div>
        </FilterDiv>
        <div className=" w-full flex justify-content-end">
          <div className="flex justify-center w-full relative mb-20 pt-5  m-2 container mx-auto ">
            <input
              pattern="^[a-zA-Z0-9]*$" // only allow letters and numbers
              onChange={(e) => {
                const value = e.currentTarget.value;
                setSearchTerm(value);

                handleSearchSubmit(value);
              }}
              type="text"
              id="floating_filled"
              className="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer"
              placeholder=" "
            />
            <label
              htmlFor="floating_filled"
              className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
            >
              Search...
            </label>
          </div>
        </div>
      </div>

      <div className={` ${styles.cardContainer}`}>
        {filteredFacility &&
          filteredFacility.map((data, key) => {
            return (
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

                {modalData.Source_Type == "Sto" && (
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

                    {modalData.additionalData !== undefined &&
                    modalData.additionalData.length > 0 ? (
                      <div className="flex justify-between mt-2 font-semibold">
                        <p className="text-lg text-gray-600">
                          Open Time:{" "}
                          {new Date(
                            modalData.additionalData[0].Open_Time
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-lg text-gray-600">
                          Close Time:{" "}
                          {new Date(
                            modalData.additionalData[0].Close_Time
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ) : (
                      <p>Under maintenance</p>
                    )}
                    <hr className="my-2" />
                    <div>
                      {modalData.additionalData.length > 0 &&
                        modalData.additionalData.map(
                          (
                            item: {
                              Item_Name: string;
                              Item_Des: string;
                              Unit_Price: string;
                            },
                            index: number
                          ) => (
                            <div
                              key={index}
                              className="bg-white rounded-lg p-4 mb-4"
                            >
                              <h3 className="text-xl font-bold mb-2">
                                {item.Item_Name}
                              </h3>
                              <p className="text-gray-700  font-semibold">
                                {item.Item_Des}
                              </p>
                              <div className="flex justify-between mt-2">
                                <p className="text-lg text-gray-600  font-semibold">
                                  Price: ${Number(item.Unit_Price).toFixed(2)}
                                </p>
                              </div>
                              <hr />
                            </div>
                          )
                        )}
                    </div>
                  </div>
                )}

                {modalData.Source_Type == "Shw" && (
                  <h5>
                    You can reserve a show here, you will only be charged if you
                    make it to the show since the capacity of the show is
                    limited
                  </h5>
                )}
                {modalData.Source_Type !== "Sto" ? (
                  <>
                    {/* <div className="text-gray-600 mr-2 flex mt-5 justify-center">
                      Number of tickets:
                    </div> */}
                    {/* <div className="flex items-center justify-center my-4">
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
                    </div> */}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-gray-300 text-gray-600 px-3 py-2 ml-auto rounded-lg transition-colors duration-300 hover:bg-gray-400 hover:text-white"
                        onClick={() => {
                          handleCheckout(modalData);
                        }}
                      >
                        Reserve
                      </button>
                    </div>
                  </>
                ) : (
                  <h5 className="text-xl mt-2">
                    Please visit the store in our amusement park and make
                    purchase{" "}
                  </h5>
                )}
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
                  You can view your tickets in your user page
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
                    Okay
                  </button>
                  <button
                    className="px-6 py-3 bg-slate-500 text-white rounded-full hover:bg-slate-600 transition-colors duration-300"
                    onClick={() => {
                      setIsModalOpen(false);
                      setHasCheckout(false);
                      setCheckoutProcess(false);
                      router.push("/user");
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
