import React, { useState } from "react";

interface EntranceTicketProps {
  ticketPrice: number;
}

export const EntranceTicket: React.FC<EntranceTicketProps> = ({
  ticketPrice,
}) => {
  if (!ticketPrice) {
    ticketPrice = 100;
  }
  const [ticketCount, setTicketCount] = useState(0);
  const [visitDate, setVisitDate] = useState("");
  const handleTicketCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const count = parseInt(event.target.value, 10);
    setTicketCount(count);
  };

  const handlePurchaseClick = () => {
    const totalPrice = ticketCount * ticketPrice;
    console.log(
      `Purchasing ${ticketCount} ticket(s) for a total of $${totalPrice}`
    );
    // Perform purchase logic here...
  };
  const handleVisitDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = event.target.value;
    setVisitDate(selectedDate);
  };
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to Voyage of Amusement!
        </h1>
        <p className="text-lg mb-8 max-w-[70vw]">
          Discover a world of wonder and excitement at Voyage of Amusement!
          Immerse yourself in thrilling rides, captivating shows, and a myriad
          of delightful stores. Prepare for an unforgettable experience that
          will create lasting memories.
        </p>
        <h2 className="text-3xl font-semibold mb-8">
          Ticket Price: ${ticketPrice}
        </h2>
        <p className="text-xl mb-4">How many tickets would you like to buy?</p>
        <div className="flex items-center justify-center mb-8">
          <button
            onClick={() => setTicketCount(ticketCount - 1)}
            className="text-2xl font-bold px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300"
          >
            -
          </button>
          <input
            type="number"
            value={ticketCount}
            onChange={handleTicketCountChange}
            className="w-20 mx-4 text-2xl font-semibold text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => setTicketCount(ticketCount + 1)}
            className="text-2xl font-bold px-4 py-2 rounded-full bg-purple-500 hover:bg-purple-600 text-white transition-colors duration-300"
          >
            +
          </button>
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
      </div>
    </div>
  );
};

export default EntranceTicket;
