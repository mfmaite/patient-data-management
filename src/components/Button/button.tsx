import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button = ({
  className = '',
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`
        ${className}
        flex items-center bg-blue-100 h-fit rounded-md px-3 py-2 border-blue-200 border shadow-md
        hover:bg-blue-200
        disabled:bg-gray-300 disabled:border-gray-400
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button };
