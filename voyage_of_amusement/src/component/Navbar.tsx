import React, { ButtonHTMLAttributes } from 'react';
import Button from './Button';
import { useRouter } from 'next/router';


export const Navbar: React.FC = () => {
    const router = useRouter();
    return (
        <div className='inset-x-0 top-0 bg-slate-100 text-white py-2 border-2 shadow-lg flex justify-between'>
            <div className="ml-5">
                <h3 className=' cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 border-b-4 border-indigo-500 hover:border-indigo-700 rounded transition-colors'>
                    VOA</h3>
            </div>
            <div className=' flex justify-center mr-5'>
                <Button className='mx-4' onClick={() => { router.push('/') }}>Home</Button>
                <Button className='mx-4' onClick={() => { router.push('/about') }}>About</Button>
                <Button className='mx-4' onClick={() => {router.push('/signup')}}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
};

export default Navbar