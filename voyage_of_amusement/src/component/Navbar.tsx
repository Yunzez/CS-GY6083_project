import React, { useState } from 'react';
import Button from './Button';
import { useRouter } from 'next/router';
import avator from '../../public/user.png'
import { useAppContext } from '@/contexts/GlobaclContext';
const Navbar: React.FC = () => {
    const router = useRouter();
    const [firstLoad, setFirstLoad] = useState(true)
    const [showMenu, setShowMenu] = useState(false);
    const { isLoggedIn, setLoggedIn } = useAppContext();
    const toggleMenu = () => {
        setShowMenu(!showMenu);
        if (firstLoad) {
            setFirstLoad(false)
        }

    };

    return (
        <>
            <div id="sideNav" className={`${showMenu ? "show" : (firstLoad ? "" : "close")} side-nav`}>
                <Button className="absolute top-2 right-2" onClick={() => {
                    toggleMenu()
                }}>
                    Back
                </Button>
                <div className="flex flex-col justify-center items-center h-full">
                    <div className="flex flex-col items-center justify-center">
                        <Button
                            className="text-lg font-bold text-gray-800 my-4"
                            onClick={() => router.push('/')}
                        >
                            Home
                        </Button>
                        <Button
                            className="text-lg font-bold text-gray-800 my-4"
                            onClick={() => router.push('/about')}
                        >
                            About
                        </Button>
                        <Button
                            className="text-lg font-bold text-gray-800 my-4"
                            onClick={() => router.push('/signup')}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>

            <div className="inset-x-0 top-0 bg-slate-100 text-white py-2 border-2 shadow-lg flex flex-col md:flex-row justify-between md:items-center w-full">
                <div className="ml-5 hidden md:flex">
                    <h3 className="cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 border-b-4 border-indigo-500 hover:border-indigo-700 rounded transition-colors">
                        VOA
                    </h3>
                </div>
                <div className="hidden md:flex items-center justify-end md:flex-1 mr-5">
                    <Button className="mx-4" onClick={() => router.push('/')}>
                        Home
                    </Button>
                    <Button className="mx-4" onClick={() => router.push('/about')}>
                        About
                    </Button>
                    <Button className="mx-4" onClick={() => router.push('/signup')}>
                        Sign Up
                    </Button>
                    {isLoggedIn &&
                        <Button className="mx-4 flex items-center justify-center" onClick={() => router.push('/user')}>
                            <img className="h-5 w-5 rounded-full " src='/user.png' alt="Avatar" />
                        </Button>
                    }

                </div>
                <div className="flex md:hidden items-center justify-end md:flex-1 mr-5">
                    <button
                        onClick={() => { toggleMenu() }}
                        className=" rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"

                        aria-haspopup="true">
                        <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5">
                                <path
                                    fill-rule="evenodd"
                                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                    </button>

                </div >



            </div>

        </>




    );
};

export default Navbar;

