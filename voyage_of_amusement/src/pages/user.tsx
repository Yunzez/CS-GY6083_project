import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import SettingCard from "@/component/settingCard";
import styles from "@/styles/user.module.css";
import { useAppContext } from "@/contexts/GlobaclContext";

const parkingTextContent = [
  "  You can view your payment history for all transactions made on our platform",
  "To view the details of a specific transaction, click on the transaction in the list.",
  " If you have any questions about a transaction or notice any discrepancies, please contact our support team.",
];
const UserSettings: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setLoggedIn, user, setUser } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mainContentRef = useRef(null);
  const cardRef = useRef(null);
  useEffect(() => {
    console.log(user);
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
              router.push("/");
            }}
          >
            Logout
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainPanel}>
        <div id="payment-history" className="py-8 px-4">
          <SettingCard title={"Payment History"} content={parkingTextContent} />
        </div>

        <div id="parking-history" className="py-8 px-4">
          <SettingCard title={"Parking Record"} content={parkingTextContent} />
        </div>

        <div id="shows-visited" className=" h-80 section">
          <SettingCard title={"Visited Shows"} content={parkingTextContent} />
        </div>

        <div id="shops-visited" className=" h-80 section">
          <SettingCard title={"Visited Shops"} content={parkingTextContent} />
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
