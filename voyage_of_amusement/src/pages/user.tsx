import { useRouter } from 'next/router';
import { useState } from 'react';

const UserSettings: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/5 h-screen bg-gray-100 p-4">
                <ul className="space-y-2">
                    <li
                        className="cursor-pointer"
                        onClick={() => document.getElementById('payment-history').scrollIntoView()}
                    >
                        Payment History
                    </li>
                    <li
                        className="cursor-pointer"
                        onClick={() => document.getElementById('parking-history').scrollIntoView()}
                    >
                        Parking History
                    </li>
                    <li
                        className="cursor-pointer"
                        onClick={() => document.getElementById('shows-visited').scrollIntoView()}
                    >
                        Shows Visited
                    </li>
                    <li
                        className="cursor-pointer"
                        onClick={() => document.getElementById('shops-visited').scrollIntoView()}
                    >
                        Shops Visited
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-4/5 h-screen bg-white p-4">
                <div id="payment-history" className="py-8 px-4">
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="px-4 py-2 flex justify-between items-center border-b border-gray-200">
                            <div className='flex justify-between flex-grow w-100'>
                                <h2 className="text-lg font-semibold">Payment History</h2>
                            </div>
                            <button
                                type="button"
                                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                                onClick={() => (setIsOpen(!isOpen))}
                            >
                                <svg
                                    className="h-6 w-6 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        x-show="!isOpen"
                                        d="M9.293 14.707a1 1 0 011.414 0L12 16.586l1.293-1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l2.293-2.293z"
                                    />
                                    <path
                                        x-show="isOpen"
                                        d="M15.707 9.293a1 1 0 01-1.414 0L12 7.414l-1.293 1.293a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-2.293 2.293z"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div
                            className={`max-h-0 transition-max-height duration-500 ease-in-out ${isOpen ? 'max-h-screen' : ''
                                } bg-white rounded-md shadow-md overflow-hidden`}
                        >
                            <p className="mb-4">You can view your payment history for all transactions made on our platform.</p>
                            <p className="mb-4">To view the details of a specific transaction, click on the transaction in the list.</p>
                            <p>If you have any questions about a transaction or notice any discrepancies, please contact our support team.</p>
                        </div>
                    </div>


                    <div id="parking-history">
                    Parking History content here
                    
                </div>

                <div id="shows-visited">
                    Shows Visited
                </div>

                <div id="shops-visited">
                    Shops Visited
                </div>
                </div>

               
            </div>
        </div>
    );
};

export default UserSettings;