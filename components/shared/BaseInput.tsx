// input 컴포넌트

'use client';

import { useState } from 'react';

interface BaseInputProps {
  id?: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: 'text' | 'textarea';
  suffix?: React.ReactNode;
  disabled?: boolean;
  isError?: boolean;
  hint?: string;
  errorMsg?: string;
  required?: boolean;
  className?: string;
}

export default function BaseInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  suffix,
  disabled = false,
  isError = false,
  hint,
  errorMsg,
  required = false,
  className,
}: BaseInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = !isFocused && value.trim().length > 0;

  const getBorderColor = () => {
    if (disabled) return 'border-[#b6bcc8]';
    if (isError) return 'border-[#ff4646]';
    if (isFocused) return 'border-[#60cfff]';
    if (isFilled) return 'border-[#b6bcc8]';
    return 'border-[#e5e5ea]';
  };

  return (
    <div className={`w-full ${className ?? ''}`}>
      <label
        htmlFor={id}
        className="block ml-1 text-[13px] font-medium text-[#0F1218] cursor-pointer"
      >
        {label}
        {required && <span className="ml-0.5 text-[#60CFFF]">*</span>}
      </label>

      <div className="relative mt-1.5">
        {type === 'text' ? (
          <input
            id={id}
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`
              w-full h-12 px-4 pr-21.25
              border rounded-lg text-[15px]
              outline-none transition-colors
              ${getBorderColor()} ${disabled ? 'bg-[#f4f5fa]' : 'bg-white'}`}
          />
        ) : (
          <textarea
            id={id}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`
              w-full h-45 p-4
              border rounded-lg text-[15px] leading-5.5
              outline-none resize-none overflow-y-auto transition-colors
              
              ${getBorderColor()} ${disabled ? 'bg-[#f4f5fa]' : 'bg-white'}`}
          />
        )}
        {suffix && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex items-center text-[13px] font-medium">
            {suffix}
          </div>
        )}
      </div>

      <div className="mt-2 ml-1">
        {isError && errorMsg ? (
          <p className="text-[13px] text-[#ff4646]">{errorMsg}</p>
        ) : (
          hint && <p className="text-[13px] text-[#b6bcc8]">{hint}</p>
        )}
      </div>
    </div>
  );
}
