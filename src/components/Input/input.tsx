import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  error?: string;
}

const Input = ({
  type, value, className, onChange, placeholder, disabled,
  maxLength, label, id, error, ...props
}: InputProps) => {
  return (
    <div className={className}>
      {label && id && (
        <label
          htmlFor={id}
          className="text-gray-700 text-md"
        >
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        className={
          `p-2 rounded-md w-full
          bg-gray-50 border border-blue-900 text-black transition-all
          focus:outline-blue-300 focus:outline-none
          ${error && 'border-red-500'}`
        }
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        {...props}
      />

      <div className="text-red-600 font-light text-sm text-end h-3">
        {error}
      </div>
    </div>
  )
}

export { Input };
