import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string,
  error?: string,
}

const TextArea = ({
  value, className, onChange, placeholder, disabled,
  maxLength, label, id, error, ...props
}: TextAreaProps) => {
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
      <textarea
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

export { TextArea };
