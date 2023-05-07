import React, { useState } from "react";

type ParkingHistoryProps = {
    content: Array<String>,
    title: String,
}

function SettingCard(props: ParkingHistoryProps): JSX.Element {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const content = props.content
    return (
        <div className="py-2 ">
            <div className=" section">
                <div className="bg-white rounded-lg shadow">
                    <div className="px-4 py-2 flex justify-between items-center border-b border-gray-200">
                        <div className="flex justify-between flex-grow w-100">
                            <h2 className="text-lg font-semibold">{props.title}</h2>
                        </div>
                        <button
                            type="button"
                            className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                className="h-6 w-6 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    x-show={!isOpen}
                                    d="M9.293 14.707a1 1 0 011.414 0L12 16.586l1.293-1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l2.293-2.293z"
                                />
                                <path
                                    x-show={isOpen}
                                    d="M15.707 9.293a1 1 0 01-1.414 0L12 7.414l-1.293 1.293a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-2.293 2.293z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`max-h-0 transition-max-height duration-500 ease-in-out ${isOpen ? "max-h-screen" : ""
                            } bg-white rounded-md shadow-md overflow-hidden`}
                    >
                        {content.map((str, index) => (
                            <p key={index} className='my-2 px-4'>{str}</p>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingCard;
