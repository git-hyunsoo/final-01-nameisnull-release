interface InfoTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// 상품 상세 페이지 - 탭
export default function InfoTabs({ activeTab, onTabChange }: InfoTabsProps) {
  return (
    <div className="flex border-b border-[#F4F5FA]" role="tablist">
      <button
        role="tab"
        aria-selected={activeTab === 'product'}
        onClick={() => onTabChange('product')}
        className={`flex-1 py-3 text-center text-base ${
          activeTab === 'product'
            ? 'border-b-2 border-br-primary-500 text-br-neutral-900'
            : 'text-br-input-disabled-text'
        }`}
      >
        상품 정보
      </button>
      <button
        role="tab"
        aria-selected={activeTab === 'seller'}
        onClick={() => onTabChange('seller')}
        className={`flex-1 py-3 text-center text-base ${
          activeTab === 'seller'
            ? 'border-b-2 border-br-primary-500 text-br-neutral-900'
            : 'text-br-input-disabled-text'
        }`}
      >
        판매자 정보
      </button>
    </div>
  );
}
