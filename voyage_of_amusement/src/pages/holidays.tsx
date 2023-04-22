import { useEffect, useState } from "react";

const holidaysData = [
  { name: "New Year's Day", date: "January 1st" },
  { name: "Easter", date: "Variable, usually in April" },
  { name: "Memorial Day", date: "Last Monday in May" },
  { name: "Independence Day", date: "July 4th" },
  { name: "Labor Day", date: "First Monday in September" },
  { name: "Thanksgiving Day", date: "Fourth Thursday in November" },
  { name: "Christmas Day", date: "December 25th" },
];

type holidayProp = {
  Holiday_Name?: string;
  Holiday_Date?: string;
};

const Holidays = () => {
  const [holidays, setHolidays] = useState<holidayProp>({});
  useEffect(() => {
    fetch("/api/getHolidays")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setHolidays(data.data);
      });
  }, []);
  return (
    <div className="bg-gray-100 px-8 py-12">
      <h2 className="text-4xl font-bold mb-8">Our Holidays:</h2>
      <div className="w-full bg-white shadow-md rounded-md overflow-hidden">
        <div className="flex justify-between bg-gray-200 px-4 py-2">
          <div className="text-gray-600 font-bold">Holiday</div>
          <div className="text-gray-600 font-bold">Date</div>
        </div>
        {holidays.map((holiday, index) => (
          <div
            key={index}
            className={`flex justify-between px-4 py-2 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            } hover:bg-gray-200 transition-colors duration-300`}
          >
            <div className="text-gray-800">{holiday.Holiday_Name}</div>
            <div className="text-gray-800">
              {new Date(holiday.Holiday_Date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Holidays;
