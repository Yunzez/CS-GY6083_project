import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full hover:bg-slate-600 rounded shadow-md transition-colors ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;