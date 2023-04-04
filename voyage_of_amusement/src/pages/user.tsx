import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import SettingCard from '@/component/settingCard';

const parkingTextContent = [
    '  You can view your payment history for all transactions made on our platform',
    'To view the details of a specific transaction, click on the transaction in the list.',
    ' If you have any questions about a transaction or notice any discrepancies, please contact our support team.'
]
const UserSettings: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);


    const [rightCardPosition, setRightCardPosition] = useState(0);

    const mainContentRef = useRef(null);
    const cardRef = useRef(null);
    useEffect(() => {
        function handleScroll() {
            const sections = document.querySelectorAll(".section");
            const selected = Array.from(sections).find((section) => {
              const rect = section.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            });
      
            setSelectedId(selected ? selected.id : null);
      
            // Calculate the position of the right card based on the scroll position
            // const mainContentRect = mainContentRef.current.getBoundingClientRect();
            // const cardRect = rightCardRef.current.getBoundingClientRect();
      
            // const top = cardRect.top - mainContentRect.top;
            // const maxTop = mainContentRect.height - rightCardRect.height;
      
            // setRightCardPosition(Math.max(0, Math.min(maxTop, top)));
          }
      
          window.addEventListener("scroll", handleScroll);
      
          return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <div className="flex" ref={cardRef} >
            {/* Sidebar */}
            <div className="w-1/6 ml-5 rounded-md border-slate-100 shadow-lg border-4 flex flex-col items-center mt-[10%] w-[20vw] fixed bg-gray-50 p-4 border-slate-200 border-gray-200 h-72">
                <div className="space-y-2 max-h-screen flex flex-col items-centers w-100">
                    <div
                        className={`cursor-pointer p-3 border border-slate-300 rounded-lg hover:border-slate-700 text-center ${selectedId === 'payment-history' ? 'font-bold bg-gray-300' : ''
                            }`}
                        onClick={() => document.getElementById('payment-history')?.scrollIntoView()}
                    >
                        Payment 
                    </div>
                    <div
                        className={`cursor-pointer p-3 border border-slate-300 rounded-lg hover:border-slate-700 text-center ${selectedId === 'parking-history' ? 'font-bold bg-gray-300' : ''
                            }`}
                        onClick={() => document.getElementById('parking-history')?.scrollIntoView()}
                    >
                        Parking
                    </div>
                    <div
                        className={`cursor-pointer p-3 border border-slate-300 rounded-lg hover:border-slate-700 text-center ${selectedId === 'shows-visited' ? 'font-bold bg-gray-300' : ''
                            }`}
                        onClick={() => document.getElementById('shows-visited')?.scrollIntoView()}
                    >
                        Shows
                    </div>
                    <div
                        className={`cursor-pointer p-3 border border-slate-300 rounded-lg hover:border-slate-700 text-center ${selectedId === 'shops-visited' ? 'font-bold bg-gray-300' : ''
                            }`}
                        onClick={() => document.getElementById('shops-visited')?.scrollIntoView()}
                    >
                        Shops
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-5/6 h-screen bg-white p-4 right-0 mt-5 ml-[20vw]">
                <div id="payment-history" className="py-8 px-4">
                    <SettingCard title={'Payment History'} content={parkingTextContent} />

                </div>

                <div id="parking-history" className="py-8 px-4">

                    <SettingCard title={'Parking Record'} content={parkingTextContent} />
                </div>


                <div id="shows-visited" className=' h-80 section'>
                    <SettingCard title={'Visited Shows'} content={parkingTextContent} />
                </div>

                <div id="shops-visited" className=' h-80 section'>
                    <SettingCard title={'Visited Shops'} content={parkingTextContent} />
                </div>

            </div>
        </div >
    );
};

export default UserSettings;