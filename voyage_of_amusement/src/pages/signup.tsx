import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/GlobaclContext'
import Image from 'next/image'
import Button from '@/component/Button';
import { useRouter } from 'next/router';
const Signup: React.FC = () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const router = useRouter();
  const { isLoggedIn } = useAppContext();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentImage, setCurrentImage] = useState(0);
  const [showProcess, setShowProcess] = useState(false)
  const [showDone, setShowDone] = useState(false)
  const imagePaths = ['/asset_img/1.jpg', '/asset_img/2.jpg', '/asset_img/3.jpg', '/asset_img/4.jpg', '/asset_img/5.jpg'];
  const [showError, setShowError] = useState(false)
  useEffect(() => {

    let count = 1
    const intervalId = setInterval(() => {
      // img.classList.add('w-0')
      const img = document.getElementById(`rotate_img${count - 1}`)
      let newImg = document.getElementById(`rotate_img${count}`)
      if (!newImg) {
        newImg = document.getElementById(`rotate_img${0}`)
      }
      console.log(img, newImg)
      console.log(img)
      img?.classList.add('opacity-0')
      img?.classList.add('w-0')
      newImg?.classList.remove('opacity-0')
      newImg?.classList.remove('w-0')
      count = ((count + 1) % (imagePaths.length + 1))

      // setCurrentImage(currentImage => (currentImage + 1) % imagePaths.length);
      console.log(count - 1, count)
    }, 5000);

    return () => { clearInterval(intervalId) };

  }, []);

  const [unfilled, setUnfilled] = useState<string>([]);
  const checkInfo = (): boolean => {
    setUnfilled([])
    if (firstName.length != 0 && lastName.length != 0 && email.length != 0 && password.length != 0) {
      return true
    } else {
      let updateList = []
      console.log(firstName, lastName, password, email)
      if (firstName.length == 0) {
        updateList.push('firstname')
      }
      if (lastName.length == 0) {
        updateList.push('lastName')
      }
      if (email.length == 0) {
        updateList.push('email')
      }
      if (password.length == 0) {
        updateList.push('password')
      }
      setShowError(true)
      setUnfilled(updateList)
      console.log(unfilled)
    }
    return false
  }


  const handleSignUp = async () => {
    if (!checkInfo()) {
      return
    }
    console.log('signing up')
    setShowProcess(true)
    await delay(3000)
    setShowProcess(false)

    const data = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    };

    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setShowDone(true)
      })
      .catch(error => console.error(error));

    await delay(3000)
    router.push('/')
  }

  return (
    <div className='mt-5 flex items-center justify-center rounded-lg'>

      <div className=' flex justify-center items-center bg-slate-50 p-5 w-4/5'>

        <div className={`cus_max_75vh flex   max-h-min transform-all w-1/2 flex-grow`} >
          <img src={imagePaths[0]} id="rotate_img0" alt="Slider Image" className=" transition-all duration-500 object-cover rounded-lg transition-all ease-in-out" />
          <img src={imagePaths[1]} id="rotate_img1" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out" />
          <img src={imagePaths[2]} id="rotate_img2" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out" />
          <img src={imagePaths[3]} id="rotate_img3" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out" />
          <img src={imagePaths[4]} id="rotate_img4" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-width ease-in-out" />
          {/* <img src={imagePaths[1]} id="rotate_img1" alt="Slider Image" className=" opacity-0 w-0 transition-all duration-500 object-cover rounded-lg transition-all" /> */}
        </div>


        <div className="flex flex-col items-center mt-4 w-1/2">
          <div className='border-4 border-slate-50  px-5 py-5 mt-5'>



            {showProcess == false && showDone == false &&
              <>
                <h1 className="text-2xl font-bold mb-4">Sign up</h1>
                <p className="text-gray-500 mb-4">
                  Create a new account to access all the features of our app.
                </p>
                <hr
                  className="my-6 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                <div className="flex justify-around">
                  <div className="relative">
                    <input
                      onInput=
                      {(event) => { setFirstName(event.target?.value); }
                      }
                      type="text" id="floating_filled"
                      className="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                    <label htmlFor="floating_filled"
                      className="absolute text-sm text-gray-400 duration-150 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                      First Name
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      onInput=
                      {(event) => { setLastName(event.target?.value); }
                      }
                      type="text" id="floating_filled"
                      className={`block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 ${unfilled.includes('lastname') ? 'bg-red-500' : "bg-gray-50"} border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer`} placeholder=" " />
                    <label htmlFor="floating_filled"
                      className="absolute text-sm text-gray-400 duration-150 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="flex justify-around mt-3">
                  <div className="relative">
                    <input
                      onInput=
                      {(event) => { setEmail(event.target?.value); }
                      }
                      type="email" id="floating_filled"
                      className="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                    <label htmlFor="floating_filled"
                      className="absolute text-sm text-gray-400 duration-150 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      onInput=
                      {(event) => { setPassword(event.target?.value); }
                      }
                      type="email" id="floating_filled"
                      className="block rounded-t-md px-3 pb-2 pt-5 w-full text-sm text-gray-900 bg-gray-50 border-0 border-b-2 border-gray-100 appearance-none focus:outline-none focus:bg-indigo-50 focus:ring-0 focus:border-indigo-500 peer" placeholder=" " />
                    <label htmlFor="floating_filled"
                      className="absolute text-sm text-gray-400 duration-150 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-indigo-500  peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
                      Password
                    </label>
                  </div>
                </div>

                <div className={`bg-red-100 text-red-700 px-2 py-2 rounded relative transition-opacity duration-500 shadow-md mt-5 ${showError ? 'opacity-1 h-100' : 'opacity-0 h-0'}`} role="alert">
                  <div className={`${showError ? 'opacity-1 h-100 d-inline' : 'opacity-0 h-0 d-none'}`}>
                    <div><strong className="font-bold ">{"Uh oh :("}</strong></div>
                    <small className="block font-bold flex">You forgot to write:
                      {unfilled.map((str, index) => (
                        <p key={index} className='ml-1'>{str}</p>
                      ))}
                    </small>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={async () => { setShowError(false); await delay(500); setUnfilled([]); }}><title>Close</title><path d="M14.348 5.652a1 1 0 010 1.414L11.414 10l2.934 2.934a1 1 0 11-1.414 1.414L10 11.414l-2.934 2.934a1 1 0 11-1.414-1.414L8.586 10 5.652 7.066a1 1 0 011.414-1.414L10 8.586l2.934-2.934a1 1 0 011.414 0z" /></svg>
                    </span>
                  </div>
                </div>


                <div className='flex justify-end mt-5'>
                  <Button className='mt-5 mx-left' onClick={() => handleSignUp()}>Sign up</Button>
                </div>
                <hr
                  className="my-8 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                <p className="text-gray-500 mt-5 mb-4">
                  You already have an account. <a href="/signin" className="text-blue-500 underline">Sign in</a>.
                </p>
              </>

            }
            {showProcess && <>
              <div className='flex flex-col'>
                <h3 className="text-gray-500 mb-4 ">
                  {`We are processing your signin request :)`}
                </h3>
                <div role="status " className='animate-bounce flex justify-center mt-5'>
                  <svg aria-hidden="true" className="w-14 h-14 mr-2 text-gray-200 animate-spin dark:text-slate-300 fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </>}

            {showDone && <>
              <h3 className="text-4xl flex justify-center font-bold mb-4">
                You are all set!
              </h3>
              <p className="text-gray-500 mb-4">
                You will be redirect to  home page in 3 seconds, view my <button onClick={() => { router.push('/user') }}><b>user profile</b></button>
              </p>
            </>}


          </div>
        </div>
      </div>

    </div>
  );
};

export default Signup;
