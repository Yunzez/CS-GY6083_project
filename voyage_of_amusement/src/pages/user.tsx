import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserSettings: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        function handleScroll() {
            const sections = document.querySelectorAll('.section');
            const selected = Array.from(sections).find((section) => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });

            setSelectedId(selected ? selected.id : null);
            console.log(selectedId)
        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/5 h-screen bg-gray-100 p-4 border-r border-gray-200 fixed top-0 left-0  top-[64px]">
                <ul className="space-y-2 max-h-screen overflow-y-auto">
                    <li
                        className={`cursor-pointer ${selectedId === 'payment-history' ? 'font-bold bg-gray-300' : ''
                            }`}
                        onClick={() => document.getElementById('payment-history')?.scrollIntoView()}
                    >
                        Payment History
                    </li>
                    <li
                        className={`cursor-pointer ${selectedId === 'parking-history' ? 'font-bold bg-gray-300' : ''
                            }`}
                        onClick={() => document.getElementById('parking-history')?.scrollIntoView()}
                    >
                        Parking History
                    </li>
                    <li
                        className={`cursor-pointer ${selectedId === 'shows-visited' ? 'font-bold bg-gray-300' : ''
                            }`}
                        onClick={() => document.getElementById('shows-visited')?.scrollIntoView()}
                    >
                        Shows Visited
                    </li>
                    <li
                        className={`cursor-pointer ${selectedId === 'shops-visited' ? 'font-bold bg-gray-300' : ''
                            }`}
                        onClick={() => document.getElementById('shops-visited')?.scrollIntoView()}
                    >
                        Shops Visited
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-4/5 h-screen bg-white p-4 right-0 ml-[20%]">
                <div id="payment-history" className="py-8 px-4">
                    <div className=' h-80 section'>
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
                    </div>




                </div>
                <div id="parking-history" className=' h-80 section'>
                    Parking History content here

                </div>

                <div id="shows-visited" className=' h-80 section'>
                    Shows Visited
                </div>

                <div id="shops-visited" className=' h-80 section'>
                    Shops Visited
                </div>

            </div>
        </div >
    );
};

export default UserSettings;