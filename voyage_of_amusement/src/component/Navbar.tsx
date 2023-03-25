import React, { ButtonHTMLAttributes } from 'react';
import Button from './Button';
import { useRouter } from 'next/router';


export const Navbar: React.FC = () => {
    const router = useRouter();
    return (
        <div className='inset-x-0 top-0 bg-slate-200 text-white py-2 border-2 shadow-lg flex justify-around'>
            <div>
                <h3 className=' cursor-pointer py-2 rounded-lg bg-indigo-300 px-2 border-4 border-indigo-200 border-b-indigo-500 ml-5 text-2xl font-bold text-black'>VOA</h3>
            </div>
            <div className=' flex justify-center flex-1'>
                <Button className='mx-3' onClick={() => { router.push('/') }}>Home</Button>
                <Button className='mx-3' onClick={() => { router.push('/about') }}>About</Button>
                <Button className='mx-3' >Test</Button>
                <Button className='mx-3' onClick={() => {router.push('/signup')}}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default Navbar