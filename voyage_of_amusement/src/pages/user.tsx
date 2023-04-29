import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SettingCard from "@/component/settingCard";
import styles from "@/styles/user.module.css";
import { useAppContext } from "@/contexts/GlobaclContext";
import { userInfo } from "os";
import styled from "styled-components";

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
const UserSettings: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setLoggedIn, user, setUser, userInfo } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mainContentRef = useRef(null);
  const cardRef = useRef(null);
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
  
if(userInfo.show.length > 0) {
    const showAmount = userInfo.show.map((activity) => activity.Amount_Due);
    showTotalAmount  = showAmount.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
// Using the reduce() method to combine all the 'Amount_Due' values



  return (
    <div className="flex" ref={cardRef}>
      {/* Sidebar */}
      <div className={styles.sidePanel}>
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Welcome {user.Fname} {user.Lname}
          </h2>
          <div className="mb-4 flex ">
            <h5 className="font-bold mb-2 me-2">Email:</h5>
            <p>{user.Email}</p>
          </div>
          <div className="mb-4 flex">
            <h5 className="font-bold mb-2 me-2">User Type:</h5>
            <p>{user.Visitor_Type}</p>
          </div>

          <div
            className={`cursor-pointer p-3 m-3 bg-gray-100 border border-slate-300 rounded-lg hover:text-white hover:font-bold hover:border-slate-600 hover:bg-slate-600 text-center transition duration-300 ease-in-out ${
              selectedId === "payment-history" ? "font-bold bg-gray-300" : ""
            }`}
            onClick={() =>
              document.getElementById("payment-history")?.scrollIntoView()
            }
          >
            Payment
          </div>
          <div
            className={`cursor-pointer p-3 m-3 bg-gray-100 border border-slate-300 rounded-lg hover:text-white hover:font-bold hover:border-slate-600 hover:bg-slate-600 text-center transition duration-300 ease-in-out ${
              selectedId === "parking-history" ? "font-bold bg-gray-300" : ""
            }`}
            onClick={() =>
              document.getElementById("parking-history")?.scrollIntoView()
            }
          >
            Parking
          </div>
          <div
            className={`cursor-pointer p-3 m-3 bg-gray-100 border border-slate-300 rounded-lg hover:text-white hover:font-bold hover:border-slate-600 hover:bg-slate-600  text-center transition duration-300 ease-in-out ${
              selectedId === "shows-visited" ? "font-bold bg-gray-300" : ""
            }`}
            onClick={() =>
              document.getElementById("shows-visited")?.scrollIntoView()
            }
          >
            Shows
          </div>
          <div
            className={`cursor-pointer p-3 m-3 bg-gray-100 border border-slate-300 rounded-lg hover:text-white hover:font-bold hover:border-slate-600 hover:bg-slate-600 text-center transition duration-300 ease-in-out ${
              selectedId === "shops-visited" ? "font-bold bg-gray-300" : ""
            }`}
            onClick={() =>
              document.getElementById("shops-visited")?.scrollIntoView()
            }
          >
            Shops
          </div>
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
      </div>

      {/* Main Content */}
      <div className={styles.mainPanel}>
        <div id="payment-history" className="py-2 px-4 mt-6">
          <CardDiv>
            <SettingCard
              title={"Payment History"}
              content={parkingTextContent}
            />

            {userInfo?.payment.length === 0 ? (
              <p className="text-red-500">You have no information yet</p>
            ) : (
              <p className="text-green-500">You have info</p>
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
                <p className="font-bold text-2xl">Your recent record: </p>
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
                            Activity Date: {item.Activity_Date}
                          </CardInfoItem>
                          <CardInfoItem>Discount: {item.Discount}</CardInfoItem>
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
              </div>
            )}
          </CardDiv>
        </div>
        <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <div id="shows-visited" className="py-2 px-4">
          <CardDiv>
            <SettingCard title={"Visited Shows"} content={parkingTextContent} />

            {userInfo.show.length === 0 ? (
              <p className="text-red-500">You have no information yet</p>
            ) : (
                <div className="text-slate-700">
                <p className="font-bold text-2xl">Your recent record: </p>
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
                            Activity Date: {item.Activity_Date}
                          </CardInfoItem>
                          <CardInfoItem>Discount: {item.Discount}</CardInfoItem>
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
              <h2 className=" text-slate-900 mt-3 text-2xl">You better pay ${showTotalAmount} before we beat your ass off</h2>
              <button className=" text-slate-900 mt-3 text-2xl border shadow p-3 rounded hover:bg-slate-900 hover:text-white transition">PAY</button>
              </div>
            )}
          </CardDiv>
        </div>
        <hr className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
        <div id="shops-visited" className="py-2 px-4">
          <CardDiv>
            <SettingCard title={"Visited Shops"} content={parkingTextContent} />

            {userInfo.shop.length === 0 ? (
              <p className="text-red-500">You have no information yet</p>
            ) : (
              <p className="text-green-500">You have info</p>
            )}
          </CardDiv>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
