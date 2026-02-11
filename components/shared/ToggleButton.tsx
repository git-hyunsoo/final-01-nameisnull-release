// Toggle Button 컴포넌트

'use client';

interface Option {
  label: string;
  value: string;
}

interface ToggleButtonProps {
  label: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function ToggleButton({
  label,
  options,
  selectedValue,
  onChange,
  required = false,
}: ToggleButtonProps) {
  return (
    <div className="w-full">
      <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
        {label}
        {required && <span className="ml-0.5 text-[#60CFFF]">*</span>}
      </p>
      <div
        className="mt-1.5 grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
        }}
      >
        {options.map(option => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                flex-1 px-15.75 py-4.25 rounded-lg text-[15px] cursor-pointer transition-all
                ${
                  isSelected
                    ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                    : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                }
              `}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
