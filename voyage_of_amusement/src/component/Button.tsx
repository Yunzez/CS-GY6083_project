import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`text-white font-bold px-3 py-2 bg-slate-500 hover:bg-slate-600 rounded shadow-md transition-colors ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;