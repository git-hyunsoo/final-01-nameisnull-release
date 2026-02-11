// button 컴포넌트

interface SubmitButtonProps {
  title: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
  disabled?: boolean;
}

export default function SubmitButton({
  title,
  onClick,
  type = 'submit',
  disabled = false,
}: SubmitButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 py-5 bg-white z-50">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`flex items-center justify-center w-full py-4.5 rounded-lg text-[18px] font-medium transition-colors cursor-pointer
          ${disabled ? 'bg-[#e5e5ea] text-[#8a8f99]' : 'bg-[#60cfff] text-white active:bg-[#4ebdec]'}`}
      >
        {title}
      </button>
    </div>
  );
}
