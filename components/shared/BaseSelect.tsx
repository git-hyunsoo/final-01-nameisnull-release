// select 컴포넌트 (드롭다운)

'use client';

import { useState } from 'react';
import Image from 'next/image';
import ArrowIcon from '@/public/icons/arrow-bottom.svg';

interface BaseSelectProps {
  label: string;
  value: string;
  placeholder: string;
  options: string[];
  onChange: (val: string) => void;
}

export default function BaseSelect({
  label,
  value,
  placeholder,
  options,
  onChange,
}: BaseSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
        {label}
        <span className="ml-0.5 text-[#60CFFF]">*</span>
      </p>
      <div
        className={`mt-1.5 overflow-hidden border rounded-lg transition-all ${
          isOpen ? 'border-[#60cfff]' : 'border-[#e5e5ea]'
        } bg-white`}
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between h-12 px-4 cursor-pointer "
        >
          <span
            className={`text-[15px] ${!value ? 'text-[#8a8f99]' : 'text-[#0F1218]'}`}
          >
            {value || placeholder}
          </span>
          <Image
            src={ArrowIcon}
            alt="화살표 아이콘"
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && (
          <div className="py-3.5 border-t border-[#e5e5ea]">
            {options.map(option => (
              <div
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="flex cursor-pointer items-center gap-2.5 px-4 py-2 hover:bg-[#f4f5fa]"
              >
                <div
                  className={`flex h-5.5 w-5.5 items-center justify-center rounded-full border transition-all ${
                    value === option
                      ? 'border-[#60cfff] border-[5px]'
                      : 'border-[#e5e5ea] bg-white'
                  }`}
                />
                <span
                  className={`text-[15px] ${
                    value === option ? 'text-[#0F1218]' : 'text-[#8a8f99]'
                  }`}
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
