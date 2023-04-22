import { useState } from "react";

const Parking = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleReserveClick = () => {
    // Handle reservation logic here
    console.log(`Reserved parking section: ${selectedSection}`);
  };

  return (
    <div className="bg-gray-100 px-8 py-12 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Parking</h2>
      <p className="text-xl font-medium text-center max-w-3xl mb-8">
        Park your car with ease and convenience at our parking lot. We offer a
        variety of parking options, including covered and uncovered parking, as
        well as valet parking.
      </p>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`${
            selectedSection === "covered" ? "bg-blue-500" : "bg-gray-400"
          } text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300`}
          onClick={() => handleSectionClick("covered")}
        >
          Covered
        </button>
        <button
          className={`${
            selectedSection === "uncovered" ? "bg-blue-500" : "bg-gray-400"
          } text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300`}
          onClick={() => handleSectionClick("uncovered")}
        >
          Uncovered
        </button>
        <button
          className={`${
            selectedSection === "valet" ? "bg-blue-500" : "bg-gray-400"
          } text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300`}
          onClick={() => handleSectionClick("valet")}
        >
          Valet
        </button>
      </div>
      <button
        className={`${
          selectedSection ? "bg-yellow-500" : "bg-gray-400"
        } text-white py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors duration-300`}
        onClick={handleReserveClick}
        disabled={!selectedSection}
      >
        Reserve Parking
      </button>
    </div>
  );
};

export default Parking;
