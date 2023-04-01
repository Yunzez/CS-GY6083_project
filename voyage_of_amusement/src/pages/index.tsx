import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Button from '@/component/Button'
import { useAppContext } from '@/contexts/GlobaclContext'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Modal from '@/component/Modal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, setLoggedIn } = useAppContext();
  const [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const [currentImage, setCurrentImage] = useState(0);
  const imagePaths = [
    '/home_img/rollercoaster.jpg',
    '/home_img/store.jpg',
    '/home_img/restaurant.jpg',
    '/home_img/parking.jpg',
    '/home_img/show.jpg'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage(currentImage => (currentImage + 1) % imagePaths.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex flex-col  mb-5  bottom-0 pb-16 w-full">\

        <div className="relative h-80 mb-5 transition-opacity">
          <Image
            src={imagePaths[currentImage]}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            alt="Coursal Image"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Amusement Park</h1>
            <p className="text-xl md:text-2xl font-medium text-center max-w-3xl mb-8">
              Our park is the perfect place for a day of fun and excitement. With a wide range of attractions
              including stores, restaurants, parking, shows, and roller coasters, there's something for everyone!
            </p>
            <button className="px-8 py-4 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300">Buy Tickets</button>
          </div>
        </div>
        <div className="bg-gray-100 py-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Attractions</h2>
          <div className="flex flex-col md:flex-row justify-around max-w-7xl mx-auto">

          <div className={`${styles.hoverEffect} ${styles.card} w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-md p-8 mb-8 md:mb-0 m-4`}>
              <div className="w-full relative">
                <Image
                priority={true} // Add this line
                  className='object-cover cus_max_25vh rounded-md'
                  src="/home_img/rollercoaster.jpg"
                  width={1920}
                  height={1080}
                  alt="Roller Coaster Icon"
                />
              </div>
              <h3 className="text-2xl font-bold mt-4 mb-2">Roller Coasters</h3>
              <p className="text-lg mb-6">
                Our roller coasters are some of the most exciting and thrilling rides in the world.
                From twists and turns to drops and loops, our coasters will leave you breathless!
              </p>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300" onClick={() => {
                router.push(`/attractions?type=rollercoasters`);
              }}>Learn More</button>
            </div>

            <div className={`${styles.hoverEffect} ${styles.card} w-full md:w-1/2 lg:w-1/3  bg-white rounded-lg shadow-md p-8 mb-8 md:mb-0 m-4`}>

              <div className="w-full relative transition-opacity">
                <Image 
                priority={true} // Add this line
                  className='object-cover cus_max_25vh rounded-md'
                  src="/home_img/store.jpg"
                  alt="Store Icon"
                  width={1920}
                  height={1080}
                />
              </div>

              <h3 className="text-2xl font-bold mt-4 mb-2">Store</h3>
              <p className="text-lg mb-6">
                Visit our store for a range of souvenirs, snacks, and gifts for you to take home and remember your day at the park.
              </p>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300" onClick={() => {
                router.push(`/attractions?type=store`);
               
              }}>Learn More</button>
            </div>
            <div className={`${styles.hoverEffect} ${styles.card} w-full md:w-1/2 lg:w-1/3  bg-white rounded-lg shadow-md p-8 mb-8 md:mb-0 m-4`}>
              <div className="w-full relative transition-opacity">
                <Image
                priority={true} // Add this line
                  className='object-cover cus_max_25vh rounded-md'
                  src="/home_img/restaurant.jpg"
                  alt="Store Icon"
                  width={1920}
                  height={1080}
                />
              </div>

              <h3 className="text-2xl font-bold mt-4 mb-2">Restaurants</h3>
              <p className="text-lg mb-6">
                Our restaurants offer a wide range of food options, from quick bites to sit-down meals.
                With options for all tastes and diets, you're sure to find something you love.
              </p>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300" onClick={() => {
                router.push(`/attractions?type=restaurants`);
               
              }}>Learn More</button>
            </div>
          </div>
          <div className=" flex flex-col md:flex-row justify-around max-w-7xl mx-auto">
          <div className={`${styles.hoverEffect} ${styles.card} w-full md:w-1/2 lg:w-1/3  bg-white rounded-lg p-8 mb-8 md:mb-0 m-4`}>
              <div className="w-full relative transition-opacity">
                <Image
                priority={true} // Add this line
                  className='object-cover cus_max_25vh rounded-md'
                  src="/home_img/parking.jpg"
                  alt="Parking Icon"
                  width={1920}
                  height={1080}
                />
              </div>
              <h3 className="text-2xl font-bold mt-4 mb-2">Parking</h3>
              <p className="text-lg mb-6">
                Our parking lot offers ample space for your vehicle, with easy access to the park entrance.
                Plus, with our secure parking, you can have peace of mind while you enjoy your day.
              </p>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300" onClick={() => {
                router.push(`/attractions?type=parking`);
               
              }}>Learn More</button>
            </div>


            <div className={`${styles.hoverEffect} ${styles.card} w-full md:w-1/2 lg:w-1/3  bg-white rounded-lg shadow-md p-8 mb-8 md:mb-0 m-4`}>
              <div className="w-full relative transition-opacity">
                <Image
                priority={true} // Add this line
                  className='object-cover cus_max_25vh rounded-md'
                  src="/home_img/show.jpg"
                  alt="show Icon"
                  width={1920}
                  height={1080}

                />
              </div>

              <h3 className="text-2xl font-bold mt-4 mb-2">Shows</h3>
              <p className="text-lg mb-6">
                Our shows offer entertainment for all ages, with a variety of acts and performances.
                From music and dancing to acrobatics and comedy, you won't want to miss our shows!
              </p>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300" onClick={() => {
                 router.push(`/attractions?type=shows`);
              }}>View Details</button>
            </div>


            <div className={`${styles.hoverEffect} ${styles.card} w-full md:w-1/2 lg:w-1/3  bg-white rounded-lg shadow-md p-8 mb-8 md:mb-0 m-4`}>
              <div className="w-full relative transition-opacity">
                <Image
                priority={true} // Add this line
                  className='object-cover cus_max_25vh rounded-md'
                  src="/home_img/show.jpg"
                  alt="show Icon"
                  width={1920}
                  height={1080}

                />
              </div>

              <h3 className="text-2xl font-bold mt-4 mb-2">Others</h3>
              <p className="text-lg mb-6">
               View all of our fancy facilities that can facilitate your experience to an upper level!
              </p>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-300" onClick={() => {
                 router.push(`/attractions?type=shows`);
              }}>Learn More</button>
            </div>

          </div>
        </div>
      </div>
    </>

  );

}
