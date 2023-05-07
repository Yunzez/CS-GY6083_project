import { useRouter } from "next/router";
import { useState } from "react";

const Parking = () => {
  const [selectedSection, setSelectedSection] = useState("");
  const [showModal, setShowModal] = useState(false);
const router = useRouter()
  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
  };

  const handleReserveClick = () => {
    // Handle reservation logic here
    console.log(`Reserved parking section: ${selectedSection}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100 px-8 py-12 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8">Parking</h2>
      <p className="text-xl font-medium text-center max-w-3xl mb-8">
        Park your car with ease and convenience at our parking lot. We offer a
        variety of parking options, including covered and uncovered parking, as
        well as valet parking.
      </p>
      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="bg-white shadow-lg w-[80vw] rounded-lg p-4 flex flex-col items-center">
          <p className="text-gray-600 mt-2  text-lg text-center mb-4">
            Secure and sheltered parking. Protects your vehicle from weather
            conditions.
          </p>
          <button
            className={`${
              selectedSection === "covered" ? "bg-blue-500" : "bg-gray-400"
            } text-white py-4 px-8 rounded-lg hover:bg-blue-600 transition-colors duration-300`}
            onClick={() => handleSectionClick("covered")}
          >
            Covered
          </button>
        </div>
        <div className="bg-white shadow-lg w-[80vw] rounded-lg p-4 flex flex-col items-center">
          <p className="text-gray-600 text-lg mt-2 text-center mb-4">
            Open parking space. Offers convenient accessibility and ease of use.
          </p>
          <button
            className={`${
              selectedSection === "uncovered" ? "bg-blue-500" : "bg-gray-400"
            } text-white py-4 px-8 rounded-lg hover:bg-blue-600 transition-colors duration-300`}
            onClick={() => handleSectionClick("uncovered")}
          >
            Uncovered
          </button>
        </div>
        <div className="bg-white shadow-lg w-[80vw]  rounded-lg p-4 flex flex-col items-center">
          <p className="text-gray-600 mt-2  text-lg text-center mb-4">
            Convenient valet parking service. Professional staff takes care of
            parking your vehicle.
          </p>
          <button
            className={`${
              selectedSection === "valet" ? "bg-blue-500" : "bg-gray-400"
            } text-white py-4 px-8 rounded-lg hover:bg-blue-600 transition-colors duration-300`}
            onClick={() => handleSectionClick("valet")}
          >
            Valet
          </button>
        </div>
      </div>

      <button
        className={`${
          selectedSection ? "bg-yellow-500" : "bg-gray-400"
        } text-white py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors duration-300 mb-20 cursor-pointer`}
        onClick={handleReserveClick}
        disabled={!selectedSection}
      >
        Reserve Parking
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-10">
            <div className="bg-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Success!</h3>
              <p>
                Your parking reservation for {selectedSection} has been
                successfully made.
              </p>
              <div className="flex  justify-end ">
                <button
                  className="bg-slate-500 me-2 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 transition-colors duration-300"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => {router.push('/')}}
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parking;
