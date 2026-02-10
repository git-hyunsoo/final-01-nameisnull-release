// input 컴포넌트

'use client';

import { useState } from 'react';

interface BaseInputProps {
  label: string; // 라벨 텍스트
  value: string; // 입력 값
  onChange: (val: string) => void; // 값 변경 시 호출되는 함수
  placeholder?: string; // 플레이스홀더 텍스트
  type?: 'text' | 'textarea'; // 일반 입력 vs 설명란
  suffix?: React.ReactNode; // 중복확인 버튼, kg 단위 등이 들어갈 자리
  disabled?: boolean; // 비활성화 여부
  isError?: boolean; // 에러 상태 여부
  hint?: string; // 아래쪽 안내 문구
  errorMsg?: string; // 에러 문구
}

export default function BaseInput({
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
}: BaseInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // 포커스 해제 상태에서 값이 존재하는지 여부
  const isFilled = !isFocused && value.trim().length > 0;

  // 비활성화 > 에러 > 포커스 > 값 존재 > 기본 순으로 테두리 색상 결정
  const getBorderColor = () => {
    if (disabled) return 'border-[#b6bcc8]';
    if (isError) return 'border-[#ff4646]';
    if (isFocused) return 'border-[#60cfff]';
    if (isFilled) return 'border-[#b6bcc8]';
    return 'border-[#e5e5ea]';
  };

  return (
    <div className="w-full">
      <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
        {label}
        <span className="ml-0.5 text-[#60CFFF]">*</span>
      </p>

      <div className="relative mt-1.5">
        {type === 'text' ? (
          <input
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
