import React, { useState, useEffect } from "react";
import { delay } from "@/util/generalUtil";
import { useRouter } from "next/router";
import { useAppContext } from "@/contexts/GlobaclContext";
import { summarizeUserInfo } from "@/util/userUtil";
import PayForm from "@/component/PayForm";
import styled from "styled-components";
interface EntranceTicketProps {
  ticketPrice: number;
}

type Row = {
  id: number;
  email: string;
  phone: string;
  fname: string;
  lname: string;
  dob: string;
  city: string;
};

const Gobtn = styled.div`
  margin-bottom: 35px;
  margin-top: 35px;
  font-size: 1.2rem;
  padding: 1rem 2.5rem;
  border: none;
  outline: none;
  border-radius: 1rem;
  cursor: pointer;
  text-transform: uppercase;
  background-color: rgb(14, 14, 26);
  color: rgb(234, 234, 234);
  font-weight: 700;
  transition: 0.6s;
  box-shadow: 0px 0px 60px #1f4c65;
  -webkit-box-reflect: below 10px
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));

  &:active {
    scale: 0.92;
  }

  &:hover {
    background: rgb(2, 29, 78);
    background: linear-gradient(
      270deg,
      rgba(2, 29, 78, 0.681) 0%,
      rgba(31, 215, 232, 0.873) 60%
    );
    color: rgb(4, 4, 38);
  }
`;
export const EntranceTicket: React.FC<EntranceTicketProps> = ({
  ticketPrice,
}) => {
  if (!ticketPrice) {
    ticketPrice = 100;
  }
  const { user, setUserInfo } = useAppContext();
  const router = useRouter();
  const [visitDate, setVisitDate] = useState("");
  const [showProcess, setShowProcess] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const [unpaidTickets, setUnpaidTickets] = useState([]);
  const [activityID, setActivityID] = useState(-1);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<Row[]>([
    {
      id: 1,
      email: "",
      phone: "",
      fname: "",
      lname: "",
      dob: "",
      city: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: rows.length + 1,
        email: "",
        phone: "",
        fname: "",
        lname: "",
        dob: "",
        city: "",
      },
    ]);
  };

  const updateRow = (id: number, field: keyof Row, value: string) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handlePurchaseClick = async () => {
    console.log(rows);

    if (rows.length == 0) {
      setShowProcess(false);
      setShowPay(false);
      setShowDone(false);
      setError("please select at least one ticket to purchase ");
      return;
    }

    if (visitDate.length == 0) {
      setShowProcess(false);
      setShowPay(false);
      setShowDone(false);
      setError("please tell us when are you vsiting ");
      return;
    }

    if (!user.Visitor_ID) {
      setShowProcess(false);
      setShowPay(false);
      setShowDone(false);
      setError("please login first");
      return;
    }
    setShowProcess(true);
    let master_activity_id = -1;
    let ticketList: any = [];
    for (const row of rows) {
      const data = {
        visitor_id: master_activity_id == -1 ? user.Visitor_ID : null,
        visit_date: visitDate,
        email: row.email,
        phone: row.phone,
        fname: row.fname,
        lname: row.lname,
        dob: row.dob,
        city: row.city,
        master_activity_id: master_activity_id,
      };
      console.log(data);
      await fetch(`/api/purchaseTicket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            res.json().then((data) => console.log(data));
          }
        })
        .then((data) => {
          if (data != undefined) {
            console.log(data);
            setUserInfo(summarizeUserInfo(data.summary));
            delay(2000);
            if (master_activity_id == -1) {
              master_activity_id = data.activity_id;
            }
            ticketList.push(data.ticket);
          } else {
            setShowProcess(false);
            setShowPay(false);
            setShowDone(false);
            setError("Some error occurred, please try again later");
          }
        });
    }
    setUnpaidTickets(ticketList);
    setActivityID(master_activity_id);
    setShowProcess(false);
    setShowPay(true);
    setShowDone(false);
  };
  const handleVisitDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = event.target.value;
    setVisitDate(selectedDate);
  };

  useEffect(() => {
    if (user) {
      setRows((prevState) => {
        const firstRow = {
          ...prevState[0],
          email: user.Email,
          phone: user.Cell_Number,
          fname: user.Fname,
          lname: user.Lname,
          dob: user.Birthdate,
          city: user.City,
        };

        return [firstRow, ...prevState.slice(1)];
      });
    }
  }, [user]);
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen flex items-center justify-center ">
      <div className="bg-white  md:p-10 p-2 rounded-lg shadow-lg text-center md:w-[70vw] w-[90vw]">
        {!showDone && !showPay && !showProcess && (
          <>
            <h1 className="text-md-5xl text-xl font-bold mb-6">
              Welcome to Voyage of Amusement!
            </h1>
            {error.length > 0 && (
              <div
                className={`bg-red-100 text-red-700 px-2 py-6 mb-4 rounded relative transition-opacity duration-500 shadow-md mt-5 ${
                  error.length > 0 ? "opacity-1 h-100" : "opacity-0 h-0"
                }`}
                role="alert"
              >
                <div
                  className={`${
                    error.length > 0
                      ? "opacity-1 h-100 d-inline"
                      : "opacity-0 h-0 d-none"
                  }`}
                >
                  <small className="block font-bold flex">
                    <h1 className="ml-1">{error}</h1>
                  </small>
                  <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      onClick={async () => {
                        setError("");
                      }}
                    >
                      <title>Close</title>
                      <path d="M14.348 5.652a1 1 0 010 1.414L11.414 10l2.934 2.934a1 1 0 11-1.414 1.414L10 11.414l-2.934 2.934a1 1 0 11-1.414-1.414L8.586 10 5.652 7.066a1 1 0 011.414-1.414L10 8.586l2.934-2.934a1 1 0 011.414 0z" />
                    </svg>
                  </span>
                </div>
              </div>
            )}
            <p className="md:text-lg  text-md mb-8 max-w-[70vw]">
              Discover a world of wonder and excitement at Voyage of Amusement!
              Immerse yourself in thrilling rides, captivating shows, and a
              myriad of delightful stores. Prepare for an unforgettable
              experience that will create lasting memories.
            </p>
            <h2 className="md:text-3xl text-lg font-semibold mb-8">
              Ticket Price: ${ticketPrice}
              <br />
              <span className="text-base text-gray-600">
                Child & Senior Price: ${ticketPrice * 0.85}
              </span>
            </h2>
            <p className="md:text-xl text-md mb-4">
              Hey there! As a valued member, you can enjoy an extra{" "}
              <b className="text-green-500">10% discount</b> on the first five
              tickets every day!
              <br />
              Plus, when you purchase online, you'll get an additional{" "}
              <b className="text-green-500">5% discount</b> all the time!
              <br />
              Best part? You can <b>STACK</b> these discounts together!
            </p>
            <p className="text-sm mb-4 text-red-500">
              *Please note that no discounts apply on holidays.
            </p>
            <p className="text-sm mb-4">
              **No discount can apply on holiday.**
            </p>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
                onClick={addRow}
              >
                Add One More Visitor
              </button>
              <div className="flex flex-wrap justify-center">
                {rows.map((row) => (
                  <div
                    key={row.id}
                    className="bg-white w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg shadow-md p-4 mb-4 m-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="flex items-center mb-2">
                      <div className="font-bold mr-2">ID:</div>
                      <div>{row.id}</div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-4 gap-2">
                      {(
                        [
                          "fname",
                          "lname",
                          "email",
                          "phone",
                          "dob",
                          "city",
                        ] as Array<keyof Row>
                      ).map((field) => (
                        <div key={field} className="flex flex-col">
                          <label
                            htmlFor={`${field}-${row.id}`}
                            className="font-bold text-md-md text-sm mb-1"
                          >
                            {field.charAt(0).toUpperCase() + field.slice(1)}:
                          </label>
                          <input
                            className="border border-gray-300 rounded py-2 px-3"
                            type={field === "dob" ? "date" : "text"}
                            id={`${field}-${row.id}`}
                            value={row[field]}
                            onChange={(e) =>
                              updateRow(row.id, field, e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                    {rows.length > 1 && (
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded"
                        onClick={() => removeRow(row.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xl mb-4">When do you plan to visit?</p>
            <input
              type="date"
              value={visitDate}
              onChange={handleVisitDateChange}
              className="w-60 px-4 py-2 mb-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handlePurchaseClick}
              className="w-full text-2xl font-bold px-6 py-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white shadow-lg transition-colors duration-300"
            >
              Purchase Tickets
            </button>
          </>
        )}
        {showProcess && (
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
        )}
        {showPay && (
          <PayForm
            callBackFn={() => {
              setShowPay(false);
              setShowDone(true);
            }}
            activityID={activityID}
          >
            <>
              <div className="grid grid-cols-1 gap-y-4">
                <div className="grid grid-cols-3 items-center gap-y-4">
                  <p className="font-bold">Ticket ID</p>
                  <p className="font-bold">Discount</p>
                  <p className="font-bold">Ticket Price</p>
                </div>
                {unpaidTickets.map((ticket, index) => {
                  return (
                    <div
                      key={index}
                      className="grid grid-cols-3 items-center gap-y-1 mb-1 border pb-1 pt-1 rounded-lg"
                    >
                      <p>{ticket["Ticket_ID"]}</p>
                      <div className="flex flex-col">
                        <div>
                          {ticket["Ticket_Type"]}{" "}
                          {ticket["Discount"][0] < 1 && (
                            <>
                              ({((1 - ticket["Discount"][0]) * 100).toFixed(0)}%
                              off)
                            </>
                          )}
                        </div>
                        <div>
                          {ticket["Method_Type"]}{" "}
                          {ticket["Discount"][1] < 1 && (
                            <>
                              ({((1 - ticket["Discount"][1]) * 100).toFixed(0)}%
                              off)
                            </>
                          )}
                        </div>
                      </div>
                      <p>
                        ${100 * ticket["Discount"][0] * ticket["Discount"][1]}
                      </p>
                    </div>
                  );
                })}
                <div className="grid grid-cols-3 items-center gap-y-4 shadow rounded-lg p-4">
                  <p className="font-bold">Total</p>
                  <p></p>
                  <p>
                    $
                    {unpaidTickets.reduce(
                      (acc, crr) =>
                        100 * crr["Discount"][0] * crr["Discount"][1] + acc,
                      0
                    )}
                  </p>
                </div>
              </div>
            </>
          </PayForm>
        )}
        {showDone && (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Thank you for your order
            </h3>
            <h5 className="text-lg mb-6">
              Thank you for your order! Once you enter the park, you will have
              access to all the attractions, which are complimentary. However,
              if you wish to attend any of our captivating shows, please
              purchase tickets in advance. Our shows promise to amaze and
              entertain you with their exceptional performances. Enjoy exploring
              the various facilities and experiences our amusement park has to
              offer!
            </h5>
            <Gobtn
              onClick={() => {
                router.push("/attractions");
              }}
            >
              Go to explore
            </Gobtn>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntranceTicket;
