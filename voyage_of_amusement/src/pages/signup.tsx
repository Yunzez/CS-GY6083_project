import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/GlobaclContext'
import Image from 'next/image'

const Signup: React.FC = () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const { isLoggedIn } = useAppContext();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [currentImage, setCurrentImage] = useState(0);
  const imagePaths = ['/asset_img/1.jpg', '/asset_img/2.jpg', '/asset_img/3.jpg', '/asset_img/4.jpg', '/asset_img/5.jpg'];

  const handleFocus = (labelId) => {
    // event.target.classList.add('border-cyan-500')
    // event.target.classList.add('border-4')
    console.log(document.getElementById(labelId))
    document.getElementById(labelId)?.classList.remove('hidden')
    document.getElementById(labelId)?.classList.add('text-indigo-500')
    document.getElementById(labelId)?.classList.add('top-0')
    document.getElementById(labelId)?.classList.add('tex-sm')
  }

  const handleBlur = (labelId) => {
    console.log(document.getElementById(labelId))
    document.getElementById(labelId)?.classList.add('hidden')
    document.getElementById(labelId)?.classList.remove('text-indigo-500')
    document.getElementById(labelId)?.classList.remove('top-0')
    document.getElementById(labelId)?.classList.remove('tex-sm')
    // event.target.classList.remove('border-cyan-500')
    // event.target.classList.remove('border-4')
  }

  useEffect(() => {
    let count = 0
    const intervalId = setInterval(() => {
      // img.classList.add('w-0')
      const img = document.getElementById(`rotate_img${count-1}`)
      let newImg = document.getElementById(`rotate_img${count}`)
      if(!newImg) {
        newImg = document.getElementById(`rotate_img${0}`)
      }
      console.log(img, newImg)
    console.log(img)
      img?.classList.add('opacity-0')
      img?.classList.add('w-0')
      newImg?.classList.remove('opacity-0')
      newImg?.classList.remove('w-0')
      count = ((count+1)% (imagePaths.length+1))

      // setCurrentImage(currentImage => (currentImage + 1) % imagePaths.length);
      console.log(count-1, count)
    }, 5000);
    
    
    // img.classList.remove('w-0')
    
    return () => {clearInterval(intervalId)};
  }, []);


  return (
    <>
    
      <div className=' flex justify-center items-center bg-slate-50 p-5 '>
        
        <div className={`cus_max_75vh flex flex-grow w-1/2 max-h-min`} >
          <img src={imagePaths[0]} id="rotate_img0" alt="Slider Image" className=" transition-all duration-500 object-cover rounded-lg transition-all ease-in-out" />
          <img src={imagePaths[1]} id="rotate_img1" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out" />
          <img src={imagePaths[2]} id="rotate_img2" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out" />
          <img src={imagePaths[3]} id="rotate_img3" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out" />
          <img src={imagePaths[4]} id="rotate_img4" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out" />
          {/* <img src={imagePaths[1]} id="rotate_img1" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-all" /> */}
        </div>

        
        <div className="flex flex-col items-center mt-4 w-1/2">
          <div className='border-4 border-slate-50  px-5 py-5 mt-5'>

            <h1 className="text-2xl font-bold mb-4">Sign up</h1>

            <>
              <p className="text-gray-500 mb-4">
                Create a new account to access all the features of our app.
              </p>
              <div className="flex justify-around">
                <div className="relative">
                  <input
                    onInput=
                    {(event) => { setFirstName(event.target?.value); }
                    }
                    type="text" id="floating_filled" class="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                  <label for="floating_filled" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                    First Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    onInput=
                    {(event) => { setFirstName(event.target?.value); }
                    }
                    type="text" id="floating_filled" class="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                  <label for="floating_filled" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                    Last Name
                  </label>
                </div>
              </div>

              <div className="flex justify-around mt-3">
                <div className="relative">
                  <input
                    onInput=
                    {(event) => { setFirstName(event.target?.value); }
                    }
                    type="email" id="floating_filled" class="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                  <label for="floating_filled" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    onInput=
                    {(event) => { setFirstName(event.target?.value); }
                    }
                    type="email" id="floating_filled" class="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                  <label for="floating_filled" class="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                    Password
                  </label>
                </div>
              </div>

            </>
            <p className="text-gray-500 mb-4">
              You already have an account. <a href="/signin" className="text-blue-500 underline">Sign in</a>.
            </p>

          </div>
        </div>
      </div>

    </>
  );
};

export default Signup;
