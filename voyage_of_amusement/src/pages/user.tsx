import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SettingCard from "@/component/settingCard";
import styles from "@/styles/user.module.css";
import { useAppContext } from "@/contexts/GlobaclContext";
import { userInfo } from "os";
import styled from "styled-components";
import Chart from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { UserType } from "@/contexts/GlobaclContext";
// Define the styled component for the information div
const CardDiv = styled.div`
  border-radius: 10px;
  background: white;
  box-shadow: rgba(50, 50, 93, 0.1) 0px 20px 30px -12px inset,
    rgba(0, 0, 0, 0.1) 0px 15px 26px -15px inset;
  margin-left: 2.25rem;
  margin-right: 2.25rem;
  padding: 2rem;
  margin-bottom: 3rem;
`;

const attractionsTextContent = [
  "You can see all history of your visited attractions on here, such as roller coaster, rides, and tours.",
  "Once you have booked an attraction, you will receive a confirmation email with all the details, the information will show here.",
  "Please arrive at the attraction on time and bring any required identification or documents with you.",
];

const ticketsTextContent = [
  "You can purchase tickets for various events, shows, and attractions through our platform.",
  "Once you have purchased your tickets, they will be available for download or you can show them on your mobile device.",
  "Please make sure to read the ticket terms and conditions carefully before purchasing.",
];

const showsTextContent = [
  "You can browse and book shows on our platform, such as concerts, theater productions, and comedy shows.",
  "Once you have booked a show, your tickets will be available for download or you can show them on your mobile device.",
  "Please make sure to arrive at the venue on time and follow any instructions provided by the show organizers.",
];

const paymentsTextContent = [
  "You can view your payment history for all transactions made on our platform.",
  "To view the details of a specific transaction, click on the transaction in the list.",
  "If you have any questions about a transaction or notice any discrepancies, please contact our support team.",
];

const CardContainer = styled.div`
  cursor: pointer;
  margin: 10px;
  background: rgb(255, 255, 255);
  border-radius: 15px;
  border: 2px solid rgb(100 116 139);
  transition: all 0.2s;
  box-shadow: 12px 12px 2px 1px rgb(100 116 139);

  &:hover {
    box-shadow: -12px 12px 2px -1px rgb(100 116 139);
  }
`;

const CardContent = styled.div`
  padding: 16px;

  p {
    margin-bottom: 8px;
  }
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardDescription = styled.p`
  color: #777777;
`;

const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const CardInfoItem = styled.p`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Ticket = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  padding: 3em 2.8em 2.1em;
  border: 2px dashed black;
  border-radius: 15px;
  background-color: rgb(203, 213, 225);
  box-shadow: 0 0 0 4px rgb(203, 213, 225), 2px 2px 4px 2px rgba(0, 0, 0, 0.5);
  transition: 0.4s ease-in-out;
  position: relative;
  @media (max-width: 768px) {
    display: inline;
  }
`;

const TicketsContainer = styled.div`
  margin: 20px;
  padding: 20px;
  margin-top: 50px;
  background: #f4f6fb;
  border: 1px solid white;
  box-shadow: 10px 10px 64px 0px rgba(180, 180, 207, 0.75);
  -webkit-box-shadow: 10px 10px 64px 0px rgba(186, 186, 202, 0.75);
  -moz-box-shadow: 10px 10px 64px 0px rgba(208, 208, 231, 0.75);
  max-height: 40vh;
  overflow-y: auto;

  border-radius: 8px;
  padding: 1rem;
`;

interface Ticket {
  Activity_ID?: number;
  Method_Type_ID?: number;
  Price?: number;
  Purchase_Date?: string;
  Ticket_ID?: number;
  Ticket_Type_ID?: number;
  Validate?: number;
  Visit_Date?: string;
}

type ChartDataType = {
  labels: never[];
  datasets: {
    label: string;
    data: never[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
};

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const UserSettings: React.FC = () => {
  const router = useRouter();
  Chart.register(CategoryScale);
  const [isOpen, setIsOpen] = useState(false);
  const [ticketChartData, setTicketChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Tickets by Type", // <-- Add a comma after this line
        data: [],
        backgroundColor: [
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [PriceTicketChartData, setPriceTicketChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Tickets by Type", // <-- Add a comma after this line
        data: [],
        backgroundColor: [
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 3,
      },
    ],
  });

  const [VTChartData, setVTChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "User by Visitor Type ", // <-- Add a comma after this line
        data: [],
        backgroundColor: [
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 3,
      },
    ],
  });

  const [CityChartData, setCityChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "User based on City", // <-- Add a comma after this line
        data: [],
        backgroundColor: [
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
          "rgba(255, 255, 255, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  });
  const ResetStep = {
    VERIFY: "verify",
    VERIFYING: "verifying",
    NEW_PASSWORD: "newPassword",
    SUCCESS: "success",
    FAIL: "FUCK",
  };
  const [step, setStep] = useState(ResetStep.VERIFY);
  const { isLoggedIn, setLoggedIn, user, setUser, userInfo, payment } =
    useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [superTickets, setSuperTickets] = useState<Ticket[]>([]);
  const [superVisitors, setSuperVisitors] = useState<UserType[]>([]);
  const [superTicketsData, setSuperTicketsData] = useState();
  const [inputPW, setInputPW] = useState("");
  const [inputNewPW, setInputNewPW] = useState("");
  const cardRef = useRef(null);

  const [showChart, setShowChart] = useState(false);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const toggleView = () => {
    setShowChart(!showChart);
  };
  useEffect(() => {
    console.log(user, userInfo);
    function handleScroll() {
      const sections = document.querySelectorAll(".section");
      const selected = Array.from(sections).find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      setSelectedId(selected ? selected.id : null);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  let showTotalAmount;

  if (userInfo.show.length > 0) {
    const showAmount = userInfo.show.map(
      (activity: { [key: string]: any }) => activity.Amount_Due
    );
    showTotalAmount = showAmount.reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );
  }

  const filterGraphData = (data: { [key: string]: any }, attribute: string) => {
    const separatedData: { [key: string]: any } = [];
    const labelData: { [key: string]: any } = [];
    data.forEach((ticket: { [key: string]: any }) => {
      const attrValue = ticket?.[attribute];
      if (!separatedData?.[attrValue]) {
        labelData.push(attrValue);
        separatedData[attrValue] = [];
      }
      separatedData[attrValue].push(ticket);
    });
    const lengthsArray = Object.values(separatedData).map((arr) => arr.length);

    console.log(lengthsArray, labelData);
    return [lengthsArray, labelData];
  };

  const [unmatch, setUnmatch] = useState(true);
  const [shortPW, setShortPW] = useState(true);
  const handleVerify = () => {
    setStep(ResetStep.VERIFYING);
    const email = user.Email;
    const password = inputPW;
    const data = {
      email: email,
      password: password,
    };
    fetch("/api/verifyPassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((success) => {
        console.log(success);
        if (success) {
          setStep(ResetStep.NEW_PASSWORD);
        } else {
          setStep(ResetStep.FAIL);
        }
      });
  };

  const handleChangePW = () => {
    if (doubleInput.trim() !== inputNewPW.trim()) {
      setUnmatch(true);
    }

    if (inputNewPW.trim().length <= 4) {
      setShortPW(true);
      return;
    }
    console.log("change password");
    const data = { email: user.Email, password: inputNewPW.trim() };
    console.log(data);
    fetch("api/changePassword", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        console.log("set success");
        setStep(ResetStep.SUCCESS);
      }
    });
  };
  // Using the reduce() method to combine all the 'Amount_Due' values
  useEffect(() => {
    if (user.Email === "root@root.com") {
      console.log("fetch super user data");
      fetch("/api/superUser")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSuperTickets(data.ticket);
          const [lengthsArray, labelData] = filterGraphData(
            data.ticket,
            "Ticket_Type"
          );
          const [priceLengthsArray, priceLabelData] = filterGraphData(
            data.ticket,
            "Sold_Price"
          );

          const [VTLengthsArray, VTLabelData] = filterGraphData(
            data.user,
            "Visitor_Type"
          );

          const [CityLengthsArray, CityLabelData] = filterGraphData(
            data.user,
            "City"
          );

          const randomColors = Array.from({ length: lengthsArray.length }, () =>
            getRandomColor()
          );
          const newChartData: { [key: string]: any } = {
            ...ticketChartData, // Copy the existing chart data
            labels: labelData,
            datasets: [
              {
                ...ticketChartData.datasets[0], // Copy the existing dataset
                data: lengthsArray,
                backgroundColor: randomColors,
              },
            ],
          };

          setTicketChartData(newChartData as ChartDataType);

          const pdrandomColors = Array.from(
            { length: priceLengthsArray.length },
            () => getRandomColor()
          );
          const newPDChartData = {
            ...PriceTicketChartData, // Copy the existing chart data
            labels: priceLabelData,
            datasets: [
              {
                ...PriceTicketChartData.datasets[0], // Copy the existing dataset
                data: priceLengthsArray,
                backgroundColor: pdrandomColors,
              },
            ],
          };
          setPriceTicketChartData(newPDChartData as ChartDataType);

          const vtrandomColors = Array.from(
            { length: lengthsArray.length },
            () => getRandomColor()
          );
          const newVTChartData = {
            ...VTChartData, // Copy the existing chart data
            labels: VTLabelData,
            datasets: [
              {
                ...VTChartData.datasets[0], // Copy the existing dataset
                data: VTLengthsArray,
                backgroundColor: vtrandomColors,
              },
            ],
          };
          setVTChartData(newVTChartData as ChartDataType);

          const cityrandomColors = Array.from(
            { length: lengthsArray.length },
            () => getRandomColor()
          );
          const newCityChartData = {
            ...CityChartData, // Copy the existing chart data
            labels: CityLabelData,
            datasets: [
              {
                ...VTChartData.datasets[0], // Copy the existing dataset
                data: CityLengthsArray,
                backgroundColor: cityrandomColors,
              },
            ],
          };
          setCityChartData(newCityChartData as ChartDataType);

          setSuperVisitors(data.user);
        });
    }
  }, [userInfo]);

  const [doubleInput, setDoubleInput] = useState("");

  useEffect(() => {
    setShortPW(false);
    if (doubleInput.trim() !== inputNewPW.trim()) {
      setUnmatch(true);
    } else {
      setUnmatch(false);
    }
  }, [inputNewPW, doubleInput]);
  return (
    <div className="flex" ref={cardRef}>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-100 rounded-lg p-4 w-[90vw] md:w-auto relative">
            {step !== ResetStep.SUCCESS && (
              <button
                className="absolute top-0 px-3 right-0 m-3 p-1 rounded-full bg-red-500 text-white hover:bg-red-700"
                onClick={() => {
                  setIsOpen(false);
                  setStep(ResetStep.VERIFY);
                  setUnmatch(false);
                }}
              >
                X
              </button>
            )}

            {step === ResetStep.VERIFY && (
              <div className="p-5">
                <h2 className="text-lg font-bold mb-2">Change password</h2>
                <p className="text-gray-700 mb-4 pt-5">
                  Please input you current password:
                </p>
                <div className="flex justify-center w-full relative mb-20 pt-5  m-2 container mx-auto ">
                  <input
                    pattern="^[a-zA-Z0-9]*$" // only allow letters and numbers
                    onChange={(e) => {
                      const value = e.currentTarget.value;
                      setInputPW(e.currentTarget.value);
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
                    Current password
                  </label>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleVerify()}
                >
                  Verify
                </button>
              </div>
            )}
            {step === ResetStep.VERIFYING && (
              <div className="p-5">
                <div className="flex flex-col">
                  <h3 className="text-gray-500 mb-4 pt-5 text-center">
                    {`Verifying your password with email `}
                    <b>{user.Email}</b>
                    {` :)`}
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
              </div>
            )}
            {step === ResetStep.FAIL && (
              <div className="p-5">
                <div
                  className="bg-red-100 m-10 p-3 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold me-4">Oops! </strong>
                  <span className="block sm:inline">
                    The password does not match, please try again.
                  </span>
                </div>
              </div>
            )}
            {step === ResetStep.NEW_PASSWORD && (
              <div className="p-5">
                <div className="mb-2 mt-2 text-lg font-semibold">
                  Please enter your new password
                </div>
                <div className="flex justify-center w-80 relative   m-2 container mx-auto ">
                  <input
                    pattern="^[a-zA-Z0-9]*$" // only allow letters and numbers
                    onInput={(e) => {
                      const value = e.currentTarget.value;
                      setInputNewPW(e.currentTarget.value);
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
                    New password
                  </label>
                </div>
                <div className="flex justify-center w-80 relative  m-2 container mx-auto ">
                  <input
                    pattern="^[a-zA-Z0-9]*$" // only allow letters and numbers
                    onInput={(e) => {
                      const value = e.currentTarget.value;
                      setDoubleInput(value);
                      console.log(doubleInput, inputNewPW);
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
                    Please reenter your password
                  </label>
                </div>
                {unmatch ? (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4"
                    role="alert"
                  >
                    <strong className="font-bold">Oops!</strong>
                    <span className="block sm:inline">
                      Your two passwords do not match.
                    </span>
                  </div>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={() => handleChangePW()}
                  >
                    Change my password
                  </button>
                )}
                {shortPW && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4"
                    role="alert"
                  >
                    <span className="block sm:inline">
                      Password length less than 4 characters
                    </span>
                  </div>
                )}
              </div>
            )}
            {step === ResetStep.SUCCESS && (
              <div className="p-5">
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-4"
                  role="alert"
                >
                  <strong className="font-bold me-3">Success!</strong>
                  <span className="block sm:inline">
                    Please login to your account again.
                  </span>
                </div>
                <button
                  className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setLoggedIn(false);
                    setUser({});
                    router.push("/");
                  }}
                >
                  Okay
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles.sidePanel}>
        {user.Email === "root@root.com" ? (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              Super User Admin
            </h2>
            <hr className="mb-2" />
            <div
              className={`cursor-pointer p-3 m-3 bg-red-100 border border-red-300 rounded-lg hover:text-white hover:border-red-600 hover:font-bold  hover:bg-red-600 text-center transition duration-300 ease-in-out `}
              onClick={() => {
                setLoggedIn(false);
                setUser({});
                router.push("/");
              }}
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              {user.Fname} {user.Lname}
            </h2>

            <h5 className="font-bold mb-2 me-2 text-center  mb-2">
              {user.Email}
            </h5>
            <hr className="mb-3" />
            <p className="font-bold mb-2 me-2 text-start">
              {user.Visitor_Type} Visitor
            </p>

            <p className="font-bold mb-2 me-2 text-start">
              Birthday: {new Date(user.Birthdate).toLocaleDateString("en-US")}
            </p>

            <p className="font-bold mb-2 me-2 text-start">
              Tel: {user.Cell_Number}
            </p>

            <div
              className={`cursor-pointer p-3 m-3 bg-red-100 border border-red-300 rounded-lg hover:text-white hover:border-red-600 hover:font-bold  hover:bg-red-600 text-center transition duration-300 ease-in-out `}
              onClick={() => {
                setLoggedIn(false);
                setUser({});
                router.push("/");
              }}
            >
              Logout
            </div>
            <div
              className={`cursor-pointer p-3 m-3 bg-blue-100 border border-blue-300 rounded-lg hover:text-white hover:border-blue-600 hover:font-bold  hover:bg-blue-600 text-center transition duration-300 ease-in-out `}
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Change my password
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      {user.Email === "root@root.com" ? (
        <div className={styles.mainPanel}>
          <hr className="mb-5 mt-5" />
          <h5 className="text-2xl font-bold mb-4">Ticket Summary</h5>
          <TicketsContainer>
            {ticketChartData && PriceTicketChartData && (
              <div className="flex flex-wrap justify-between">
                <div className="w-full md:w-1/3 p-4" style={{ height: "35vh" }}>
                  <Pie
                    data={ticketChartData}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "Tickets sold by type",
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    className="w-full text-xl"
                  />
                </div>
                <div className="w-full md:w-2/3 p-4">
                  <Bar
                    data={PriceTicketChartData}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                          text: "Ticket sold based on price ",
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }}
                    className="w-full text-xl"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between py-2 border-b border-gray-300">
              <div className="w-1/5 text-center">Ticket_ID</div>
              <div className="w-1/5 text-center">Ticket Type</div>
              <div className="w-1/5 text-center">Sold Price</div>
              <div className="w-1/5 text-center">Purchase_Date</div>
              <div className="w-1/5 text-center">Purchase Method</div>
            </div>
            {superTickets.map((ticket) => (
              <div
                className="flex items-center justify-between py-2 border-b border-gray-300"
                key={ticket.Ticket_ID}
              >
                <div className="w-1/5 text-center">{ticket.Ticket_ID}</div>
                <div className="w-1/5 text-center">{ticket.Ticket_Type}</div>
                <div className="w-1/5 text-center">${ticket.Sold_Price}</div>
                <div className="w-1/5 text-center">
                  {new Date(ticket.Activity_Date ?? "").toLocaleDateString()}
                </div>
                <div className="w-1/5 text-center">
                {ticket.Method_Type[0]}
                </div>
              </div>
            ))}
          </TicketsContainer>
          <hr className="mb-5" />
          <h5 className="text-2xl font-bold mb-4">User Summary</h5>
          <TicketsContainer>
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-2/3 p-4">
                <Bar
                  data={VTChartData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Visitor based on type",
                      },
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  className="w-full text-xl" // Adjust the height as needed
                />
              </div>
              <div className="w-full md:w-1/3 p-4" style={{ height: "35vh" }}>
                <Pie
                  data={CityChartData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Visitor based on city",
                      },
                      legend: {
                        display: false,
                      },
                    },
                  }}
                  className="w-full text-xl h-20" // Adjust the height as needed
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-gray-300">
              <div className="w-1/6 text-center">Fisrst Name</div>
              <div className="w-1/6 text-center">Last Name</div>
              <div className="w-1/6 text-center">City</div>
              <div className="w-1/6 text-center">Visitor Type</div>
              <div className="w-1/6 text-center">Email</div>
              <div className="w-1/6 text-center">BirthDay</div>
            </div>
            {superVisitors.map((visitor) => (
              <div
                className="flex items-center justify-between py-2 border-b border-gray-300"
                key={visitor.Visitor_ID}
              >
                <div className="w-1/6 text-center">
                  {visitor.Fname ?? "Unknown"}{" "}
                </div>
                <div className="w-1/6 text-center">
                  {visitor.Lname ?? "Unknown"}
                </div>
                <div className="w-1/6 text-center">
                  {visitor?.City ?? "Unknown"}
                </div>
                <div className="w-1/6 text-center">
                  {visitor.Visitor_Type ?? "Unknown"}
                </div>
                <div className="w-1/6 text-center">
                  {visitor.Email ?? "Unknown"}
                </div>
                <div className="w-1/6 text-center">
                  {new Date(visitor?.Birthdate as string).toLocaleDateString()}
                </div>
              </div>
            ))}
          </TicketsContainer>
        </div>
      ) : (
        <div className={styles.mainPanel}>
          <div id="payment-history" className="py-2 px-4 mt-6">
            <CardDiv>
              <SettingCard title={"Tickets"} content={ticketsTextContent} />

              {userInfo?.ticket.length === 0 ? (
                <p className="text-red-500">You have no information yet</p>
              ) : (
                <div className="text-slate-700">
                  <p className="font-bold  md:text-2xl m-4  ">
                    {" "}
                    Your ticket history:
                  </p>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                    {userInfo.ticket.map(
                      (item: { [key: string]: any }, index: number) => (
                        <Ticket key={index}>
                          <div className="innerCard">
                            <CardTitle>Voyage of Amusement</CardTitle>
                            <small className="text-muted text-md-xl">
                              Admission Ticket
                            </small>
                            <div className="md:flex md:text-xl ">
                              {item.Activity_Date[0] && (
                                <div className="me-3 w-full">
                                  Purchased on:{" "}
                                  {new Date(
                                    item.Activity_Date[0]
                                  ).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  })}
                                </div>
                              )}

                            </div>
                            <div className="mt-1 mb-1">{item.Discount ? "Discounted" : ""}</div>
                            <div className="text-md-xl">
                              <CardInfoItem>
                                Purchased {item.Method_Type ?? "Online"}
                              </CardInfoItem>
                            </div>
                          </div>
                          <div className="text-gray-800 md:text-md ">
                            <p>Valid on:</p>
                            {item.Visit_Date
                              ? new Date(item.Visit_Date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "numeric",
                                  }
                                )
                              : "dd/mm/yyyy"}
                          </div>
                        </Ticket>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardDiv>
          </div>
          <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <div id="parking-history" className="py-2 px-4">
            <CardDiv>
              <SettingCard
                title={"Attraction Reserved"}
                content={attractionsTextContent}
              />

              {userInfo.attraction.length === 0 ? (
                <p className="text-red-500">You have no information yet</p>
              ) : (
                <div className="text-slate-700">
                  <p className="font-bold md:text-2xl  m-4 ">
                    Your attraction record:{" "}
                  </p>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {userInfo.attraction.map(
                      (item: { [key: string]: any }, index: number) => (
                        <CardContainer key={index}>
                          <CardContent>
                            <CardTitle>{item.Facility_Name}</CardTitle>
                            <CardDescription>
                              {item.Facility_Description}
                            </CardDescription>
                            <CardInfoRow>
                              <CardInfoItem>
                              Reserved Date:{" "}
                                {new Date(
                                  item.Activity_Date[0]
                                ).toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })}
                              </CardInfoItem>
                              <CardInfoItem>
                                {item.Discount ? "Discounted" : ""}
                              </CardInfoItem>
                            </CardInfoRow>
                            <CardInfoRow>
                              <CardInfoItem>
                                Location Section ID: {item.Location_Section_ID}
                              </CardInfoItem>
                            </CardInfoRow>
                          </CardContent>
                        </CardContainer>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardDiv>
          </div>
          <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <div id="shows-visited" className="py-2 px-4">
            <CardDiv>
              <SettingCard
                title={"Shows reserved"}
                content={showsTextContent}
              />

              {userInfo.show.length === 0 ? (
                <p className="text-red-500">You have no information yet</p>
              ) : (
                <div className="text-slate-700">
                  <p className="font-bold md:text-2xl m-4">
                    Your recent shows:{" "}
                  </p>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {userInfo.show.map(
                      (item: { [key: string]: any }, index: number) => (
                        <CardContainer key={index}>
                          <CardContent>
                            <CardTitle>{item.Facility_Name}</CardTitle>
                            <CardDescription>
                              {item.Facility_Description}
                            </CardDescription>
                            <CardInfoRow>
                              <CardInfoItem>
                              Reserved Date:{" "}
                                {new Date(
                                  item.Activity_Date[0]
                                ).toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })}
                              </CardInfoItem>
                            </CardInfoRow>
                            <CardInfoRow>
                              <CardInfoItem>
                                Location Section ID: {item.Location_Section_ID}
                              </CardInfoItem>
                            </CardInfoRow>
                          </CardContent>
                        </CardContainer>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardDiv>
          </div>
          <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <div className="py-2 px-4">
            <CardDiv>
              <SettingCard
                title={"Visited Store"}
                content={showsTextContent}
              />

              {userInfo.shop.length === 0 ? (
                <p className="text-red-500">You have no information yet</p>
              ) : (
                <div className="text-slate-700">
                  <p className="font-bold md:text-2xl m-4">
                    Your recent shows:{" "}
                  </p>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {userInfo.shop.map(
                      (item: { [key: string]: any }, index: number) => (
                        <CardContainer key={index}>
                          <CardContent>
                            <CardTitle>{item.Facility_Name}</CardTitle>
                            <CardDescription>
                              {item.Facility_Description}
                            </CardDescription>
                            <CardInfoRow>
                              <CardInfoItem>
                                Purchase Date:{" "}
                                {new Date(
                                  item.Activity_Date[0]
                                ).toLocaleDateString("en-US", {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                })}
                              </CardInfoItem>
                            </CardInfoRow>
                            <CardInfoRow>
                              <CardInfoItem>
                                Location Section ID: {item.Location_Section_ID}
                              </CardInfoItem>
                            </CardInfoRow>
                          </CardContent>
                        </CardContainer>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardDiv>
          </div>
          <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <div id="shops-visited" className="py-2 px-4">
            <CardDiv>
              <SettingCard title={"Payments"} content={paymentsTextContent} />

              {payment.length === 0 ? (
                <p className="text-red-500">You have payment yet</p>
              ) : (
                <div className="text-slate-700">
                  <p className="font-bold md:text-2xl m-4">Recent payments: </p>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {payment.map(
                      (payment: { [key: string]: any }, index: number) => (
                        <div
                          key={index}
                          className="border p-4 rounded-lg shadow-md flex flex-col md:flex-row md:justify-between"
                        >
                          <div className="mb-4 md:mb-0">
                            <h3 className="font-bold text-lg mb-2 md:mb-4">
                              Payment ID:
                            </h3>
                            <p>
                              <span className="font-bold">Payment Date:</span>{" "}
                              {new Date(
                                payment.Payment_Date
                              ).toLocaleDateString("en-US", {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              })}
                            </p>
                            <p>
                              <span className="font-bold">Payment Method:</span>{" "}
                              {payment.Payment_Method}
                            </p>
                            <p>
                              <span className="font-bold">Amount Due:</span> $
                              {payment.Amount_Due}
                            </p>
                            <p>
                              <span className="font-bold">Payment Amount:</span>{" "}
                              ${payment.Payment_Amount}
                            </p>
                            <p>
                              <span className="font-bold">Source Type:</span>{" "}
                              {payment.Source_Type}
                            </p>
                          </div>
                          <div className="md:ml-4">
                            <h3 className="font-bold text-lg mb-2 md:mb-4">
                              {payment.Payment_ID}
                            </h3>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardDiv>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
