import { useEffect, useState } from "react";

const holidaysData = [
  { Holiday_Name: "New Year's Day", Holiday_Date: "2023-01-01" },
  { Holiday_Name: "Easter", Holiday_Date: "2023-04-09" },
  { Holiday_Name: "Memorial Day", Holiday_Date: "2023-05-29" },
  { Holiday_Name: "Independence Day", Holiday_Date: "2023-07-04" },
  { Holiday_Name: "Labor Day", Holiday_Date: "2023-09-04" },
  { Holiday_Name: "Thanksgiving Day", Holiday_Date: "2023-11-23" },
  { Holiday_Name: "Christmas Day", Holiday_Date: "2023-12-25" },
  { Holiday_Name: "Valentine's Day", Holiday_Date: "2023-02-14" },
  { Holiday_Name: "St. Patrick's Day", Holiday_Date: "2023-03-17" },
  { Holiday_Name: "Halloween", Holiday_Date: "2023-10-31" },
];

type Holiday = {
  Holiday_Name: string;
  Holiday_Date: string;
};

const Holidays = () => {
  const [holidays, setHolidays] = useState<Holiday[]>(holidaysData);

  return (
    <div className="bg-gray-100 px-8 py-12">
      <h2 className="text-4xl font-bold mb-8">Our Holidays:</h2>
      <div className="w-full bg-white shadow-md rounded-md overflow-hidden">
        <div className="flex justify-between bg-gray-200 px-4 py-2">
          <div className="text-gray-600 font-bold">Holiday</div>
          <div className="text-gray-600 font-bold">Date</div>
        </div>
        {holidays &&
          holidays.map((holiday: Holiday, index: number) => (
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
