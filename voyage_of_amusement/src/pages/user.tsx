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

const parkingTextContent = [
  "  You can view your payment history for all transactions made on our platform",
  "To view the details of a specific transaction, click on the transaction in the list.",
  " If you have any questions about a transaction or notice any discrepancies, please contact our support team.",
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

  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setLoggedIn, user, setUser, userInfo } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [superTickets, setSuperTickets] = useState<Ticket[]>([]);
  const [superVisitors, setSuperVisitors] = useState<Ticket[]>([]);
  const [superTicketsData, setSuperTicketsData] = useState();

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
    const showAmount = userInfo.show.map((activity) => activity.Amount_Due);
    showTotalAmount = showAmount.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  }

  const filterGraphData = (data, attribute) => {
    const separatedData = [];
    const labelData = [];
    data.forEach((ticket) => {
      const attrValue = ticket[attribute];
      if (!separatedData[attrValue]) {
        labelData.push(attrValue);
        separatedData[attrValue] = [];
      }
      separatedData[attrValue].push(ticket);
    });
    const lengthsArray = Object.values(separatedData).map((arr) => arr.length);

    console.log(lengthsArray, labelData);
    return [lengthsArray, labelData];
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
            "Ticket_Type_ID"
          );
          const [priceLengthsArray, priceLabelData] = filterGraphData(
            data.ticket,
            "Price"
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
          const newChartData = {
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

          setTicketChartData(newChartData);

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
          setPriceTicketChartData(newPDChartData);

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
          setVTChartData(newVTChartData);

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
          setCityChartData(newCityChartData);

          setSuperVisitors(data.user);
        });
    }
  }, [userInfo]);

  return (
    <div className="flex" ref={cardRef}>
      {/* Sidebar */}

      <div className={styles.sidePanel}>
        {user.Email === "root@root.com" ? (
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              Super User Admin
            </h2>
            <hr className="mb-2"/>
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
                <div className="w-full md:w-1/3 p-4" style={{ height: "30vh" }}>
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
              <div className="w-1/6 text-center">Ticket_ID</div>
              <div className="w-1/6 text-center">Activity_ID</div>
              <div className="w-1/6 text-center">Price</div>
              <div className="w-1/6 text-center">Purchase_Date</div>
              <div className="w-1/6 text-center">Visit_Date</div>
              <div className="w-1/6 text-center">Validate</div>
            </div>
            {superTickets.map((ticket) => (
              <div
                className="flex items-center justify-between py-2 border-b border-gray-300"
                key={ticket.Ticket_ID}
              >
                <div className="w-1/6 text-center">{ticket.Ticket_ID}</div>
                <div className="w-1/6 text-center">{ticket.Activity_ID}</div>
                <div className="w-1/6 text-center">${ticket.Price}</div>
                <div className="w-1/6 text-center">
                  {new Date(ticket.Purchase_Date).toLocaleDateString()}
                </div>
                <div className="w-1/6 text-center">
                  {new Date(ticket.Visit_Date).toLocaleDateString()}
                </div>
                <div className="w-1/6 text-center">
                  {ticket.Validate === 0 ? "Yes" : "No"}
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
              <div className="w-full md:w-1/3 p-4" style={{ height: "30vh" }}>
                <Pie
                  data={CityChartData}
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
                  {visitor.Fname ?? "Unkown"}{" "}
                </div>
                <div className="w-1/6 text-center">
                  {visitor.Lname ?? "Unkown"}
                </div>
                <div className="w-1/6 text-center">
                  {visitor.City ?? "Unkown"}
                </div>
                <div className="w-1/6 text-center">
                  {visitor.Visitor_Type ?? "Unkown"}
                </div>
                <div className="w-1/6 text-center">
                  {visitor.Email ?? "Unkown"}
                </div>
                <div className="w-1/6 text-center">
                  {new Date(visitor.Birthdate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </TicketsContainer>
        </div>
      ) : (
        <div className={styles.mainPanel}>
          <div id="payment-history" className="py-2 px-4 mt-6">
            <CardDiv>
              <SettingCard title={"Tickets"} content={parkingTextContent} />

              {userInfo?.ticket.length === 0 ? (
                <p className="text-red-500">You have no information yet</p>
              ) : (
                <div className="text-slate-700">
                  <p className="font-bold  text-2xl m-4  ">
                    {" "}
                    Your ticket history:
                  </p>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
                    {userInfo.ticket.map((item, index) => (
                      <Ticket key={index}>
                        <div className="innerCard">
                          <CardTitle>Voyage of Amusement</CardTitle>
                          <small className="text-muted text-md-xl">
                            Admission Ticket
                          </small>
                          <div className="flex text-md-xl">
                            <div className="me-3">
                              Purchased on:{" "}
                              {new Date(item.Activity_Date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </div>
                            <div>{item.Discount ? "Discounted" : ""}</div>
                          </div>
                          <div className="text-md-xl">
                            <CardInfoItem>
                              Purchased {item.Method_Type ?? "Online"}
                            </CardInfoItem>
                          </div>
                        </div>
                        <div className="text-gray-800 text-xl">
                          <p>Entrance:</p>
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
                    ))}
                  </div>
                </div>
              )}
            </CardDiv>
          </div>
          <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <div id="parking-history" className="py-2 px-4">
            <CardDiv>
              <SettingCard
                title={"Attraction visited"}
                content={parkingTextContent}
              />

              {userInfo.attraction.length === 0 ? (
                <p className="text-red-500">You have no information yet</p>
              ) : (
                <div className="text-slate-700">
                  <p className="font-bold text-2xl  m-4 ">
                    Your attraction record:{" "}
                  </p>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {userInfo.attraction.map((item, index) => (
                      <CardContainer key={index}>
                        <CardContent>
                          <CardTitle>{item.Facility_Name}</CardTitle>
                          <CardDescription>
                            {item.Facility_Description}
                          </CardDescription>
                          <CardInfoRow>
                            <CardInfoItem>
                              Date:{" "}
                              {new Date(item.Activity_Date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </CardInfoItem>
                            <CardInfoItem>
                              {item.Discount ? "Discounted" : ""}
                            </CardInfoItem>
                          </CardInfoRow>
                          <CardInfoRow>
                            <CardInfoItem>
                              Method Type:{" "}
                              {item.Method_Type == 2 ? "Online" : "Onsite"}
                            </CardInfoItem>
                            <CardInfoItem>
                              Location Section ID: {item.Location_Section_ID}
                            </CardInfoItem>
                          </CardInfoRow>
                        </CardContent>
                      </CardContainer>
                    ))}
                  </div>
                </div>
              )}
            </CardDiv>
          </div>
          <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <div id="shows-visited" className="py-2 px-4">
            <CardDiv>
              <SettingCard
                title={"Visited Shows"}
                content={parkingTextContent}
              />

              {userInfo.show.length === 0 ? (
                <p className="text-red-500">You have no information yet</p>
              ) : (
                <div className="text-slate-700">
                  <p className="font-bold text-2xl m-4">Your recent shows: </p>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {userInfo.show.map((item, index) => (
                      <CardContainer key={index}>
                        <CardContent>
                          <CardTitle>{item.Facility_Name}</CardTitle>
                          <CardDescription>
                            {item.Facility_Description}
                          </CardDescription>
                          <CardInfoRow>
                            <CardInfoItem>
                              Date:{" "}
                              {new Date(item.Activity_Date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "2-digit",
                                  day: "2-digit",
                                  year: "numeric",
                                }
                              )}
                            </CardInfoItem>
                            <CardInfoItem>
                              Discount: {item.Discount}
                            </CardInfoItem>
                          </CardInfoRow>
                          <CardInfoRow>
                            <CardInfoItem>
                              Method Type: {item.Method_Type}
                            </CardInfoItem>
                            <CardInfoItem>
                              Location Section ID: {item.Location_Section_ID}
                            </CardInfoItem>
                          </CardInfoRow>
                        </CardContent>
                      </CardContainer>
                    ))}
                  </div>
                  <h2 className=" text-slate-900 mt-3 text-2xl">
                    You better pay ${showTotalAmount} before we beat your ass
                    off
                  </h2>
                  <button className=" text-slate-900 mt-3 text-2xl border shadow p-3 rounded hover:bg-slate-900 hover:text-white transition">
                    PAY
                  </button>
                </div>
              )}
            </CardDiv>
          </div>
          <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
          <div id="shops-visited" className="py-2 px-4">
            <CardDiv>
              <SettingCard
                title={"Visited Shops"}
                content={parkingTextContent}
              />

              {userInfo.shop.length === 0 ? (
                <p className="text-red-500">You have no information yet</p>
              ) : (
                <p className="text-green-500">You have info</p>
              )}
            </CardDiv>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
