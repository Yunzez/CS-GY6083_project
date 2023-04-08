import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FacilityType, useAppContext } from '@/contexts/GlobaclContext';
interface Attraction {
    name: string;
    description: string;
    options: string[];
    image: string;
}

const attractionlist: Attraction[] = [
    {
        name: 'Roller Coaster',
        description:
            'Experience the thrill of our roller coasters, with twists, turns, and drops that will leave you breathless!',
        options: ['Option 1', 'Option 2', 'Option 3'],
        image: 'https://source.unsplash.com/random/800x600?rollercoaster',
    },
    {
        name: 'Parking',
        description:
            'Our parking lot offers ample space for your vehicle, with easy access to the park entrance. Plus, with our secure parking, you can have peace of mind while you enjoy your day.',
        options: ['Option 1', 'Option 2', 'Option 3'],
        image: 'https://source.unsplash.com/random/800x600?parking',
    },
    {
        name: 'Shows',
        description:
            'Enjoy a variety of acts and performances, from music and dancing to acrobatics and comedy. You won\'t want to miss our shows!',
        options: ['Option 1', 'Option 2', 'Option 3'],
        image: 'https://source.unsplash.com/random/800x600?shows',
    },
    {
        name: 'Stores',
        description:
            'Visit our store for a range of souvenirs, snacks, and gifts for you to take home and remember your day at the park.',
        options: ['Option 1', 'Option 2', 'Option 3'],
        image: 'https://source.unsplash.com/random/800x600?stores',
    },
    {
        name: 'Restaurant',
        description:
            'Our restaurants offer a wide range of food options, from quick bites to sit-down meals. With options for all tastes and diets, you\'re sure to find something you love.',
        options: ['Option 1', 'Option 2', 'Option 3'],
        image: 'https://source.unsplash.com/random/800x600?restaurant',
    },
];

const Attractions = () => {
    const { isLoggedIn, ready, facility } = useAppContext();
    const router = useRouter();
    const { type } = router.query;
    const [searchTerm, setSearchTerm] = useState('');
    const [cardData, setCardData] = useState([] as FacilityType)
 
  
    useEffect(() => {
        if(ready){
            setCardData(facility)
        }

        
        // if (type) {
        //     const url = '/api/attractions?type=' + type;
        //     fetch(url)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data.data);
        //             setCardData(data.data);
        //         })
        //         .catch(error => console.log(error));
        // }
    }, [ready,facility]);


    useEffect(() => {
        console.log(searchTerm)
        if(searchTerm.length >0) {
            console.log('perform search')
        }
    }, [searchTerm])
    
    return (
        <div className="flex flex-col items-center p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-8">
                {type?.charAt(0).toUpperCase() + type?.slice(1)} Attractions
            </h1>
            <div className="relative mb-5 w-full ml-5 mr-5 container">
                <input
                    onInput={(e)=>{
                        setSearchTerm(e.currentTarget.value)
                    }}
                    type="text" id="floating_filled" className=" block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                <label htmlFor="floating_filled" className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                    Search...
                </label>
            </div>
            <div>
                {cardData && cardData.map(((data, key) => {
                    return (
                        <div key={key}>
                            {/* {data.Store_Name} */}
                        </div>
                    )
                }))}
            </div>

        </div>
    );
}

export default Attractions