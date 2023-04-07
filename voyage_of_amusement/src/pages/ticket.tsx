import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/contexts/GlobaclContext';


const Tickets: React.FC = () => {

    const [adults, setAdults] = useState(1);
    const [seniors, setSeniors] = useState(0);
    const [children, setChildren] = useState(0);

    const increment = (type: string) => {
        if (type === "adults") {
            setAdults((prev) => prev + 1);
        } else if (type === "seniors") {
            setSeniors((prev) => prev + 1);
        } else if (type === "children") {
            setChildren((prev) => prev + 1);
        }
    };

    const decrement = (type: string) => {
        if (type === "adults" && adults > 0) {
            setAdults((prev) => prev - 1);
        } else if (type === "seniors" && seniors > 0) {
            setSeniors((prev) => prev - 1);
        } else if (type === "children" && children > 0) {
            setChildren((prev) => prev - 1);
        }
    };

    return (
        <div className="flex justify-center mt-5">
            <div className="container flex flex-col space-y-8 items-center w-full md:w-[50%] lg:w-[40%] xl:w-[30%]">
                <h1 className="text-3xl font-semibold mt-3"> Tickets</h1>
                <div className="flex flex-col space-y-2 items-center w-full rounded-lg shadow p-4">
                    <div className="flex flex-row justify-between w-full">
                        <div>
                            <p className="text-lg font-medium">Adults (Ages 18-64)</p>
                            <p className="text-gray-500 text-sm italic flex justify-start">Price: $X per ticket</p>
                        </div>

                        <div className="flex flex-row space-x-4 items-center">
                            <button
                                className="rounded-full border border-gray-400 w-7 h-7 flex justify-center items-center transition duration-200 hover:bg-gray-100 hover:shadow"
                                onClick={() => decrement("adults")}
                            >
                                <span className="text-gray-500 text-sm font-medium hover:text-gray-700">-</span>
                            </button>
                            <p className="text-gray-700 font-medium">{adults}</p>
                            <button
                                className="rounded-full border border-gray-400 w-7 h-7 flex justify-center items-center transition duration-200 hover:bg-gray-100 hover:shadow"
                                onClick={() => increment("adults")}
                            >
                                <span className="text-gray-500 text-sm font-medium hover:text-gray-700">+</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 items-center w-full rounded-lg shadow p-4">
                    <div className="flex flex-row justify-between w-full">
                        <div>
                            <p className="text-lg font-medium">Seniors (Ages 65+)</p>
                            <p className="text-gray-500 text-sm italic">Price: $Y per ticket</p>
                        </div>
                        <div className="flex flex-row space-x-4 items-center">
                            <button
                                className="rounded-full border border-gray-400 w-7 h-7 flex justify-center items-center transition duration-200 hover:bg-gray-100 hover:shadow"
                                onClick={() => decrement("seniors")}
                            >
                                <span className="text-gray-500 text-sm font-medium hover:text-gray-700">-</span>
                            </button>
                            <p className="text-gray-700 font-medium">{seniors}</p>
                            <button
                                className="rounded-full border border-gray-400 w-7 h-7 flex justify-center items-center transition duration-200 hover:bg-gray-100 hover:shadow"
                                onClick={() => increment("seniors")}
                            >
                                <span className="text-gray-500 text-sm font-medium hover:text-gray-700">+</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2 items-center w-full rounded-lg shadow p-4">
                    <div className="flex flex-row justify-between w-full">
                        <div>
                            <p className="text-lg font-medium">Children (Ages 0-17)</p>
                            <p className="text-gray-500 text-sm italic">Price: $Y per ticket</p>
                        </div>
                        <div className="flex flex-row space-x-4 items-center">
                            <button
                                className="rounded-full border border-gray-400 w-7 h-7 flex justify-center items-center transition duration-200 hover:bg-gray-100 hover:shadow"
                                onClick={() => decrement("children")}
                            >
                                <span className="text-gray-500 text-sm font-medium hover:text-gray-700">-</span>
                            </button>
                            <p className="text-gray-700 font-medium">{children}</p>
                            <button
                                className="rounded-full border border-gray-400 w-7 h-7 flex justify-center items-center transition duration-200 hover:bg-gray-100 hover:shadow"
                                onClick={() => increment("children")}>
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-slate-500 hover:bg-slate-600 text-white py-2 px-4 rounded-md transition duration-200 w-full md:w-auto"
                    onClick={() => console.log("buy")}
                >
                    Buy Tickets
                </button>
            </div>
        </div>
    );
}


export default Tickets