//상품 등록

'use client';

/* import Header from '@/components/common/Header'; */
import Image from 'next/image';
import ArrowIcon from '@/public/icons/arrow-left.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function MyFofoPage() {
  const goBack = useRouter();
  const [petType, setPetType] = useState('dog');
  const [mainCategory, setMainCategory] = useState('사료');
  const [subCategory, setSubCategory] = useState('건식');
  /* TODO state 이름 다시 확인 */
  const [productStatus, setProductStatus] = useState('dog');
  const [tradeMethod, setTradeMethod] = useState('dog');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  /* TODO 임시 - 추후 삭제 */
  const [price, setPrice] = useState('');

  /* 1. 사진 등록 */
  const [photos, setPhotos] = useState<File[]>([]);
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...newFiles].slice(0, 10));
  };
  const handleDeletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const [displayValue, setDisplayValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. 숫자 이외의 문자 제거
    const rawValue = e.target.value.replace(/[^0-9]/g, '');

    // 2. 세 자리마다 콤마 추가 (Intl.NumberFormat 사용)
    if (rawValue === '') {
      setDisplayValue('');
    } else {
      const formattedValue = new Intl.NumberFormat('ko-KR').format(
        Number(rawValue)
      );
      setDisplayValue(formattedValue);
    }
  };

  /* 버튼 이벤트 */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /* TODO 이름들 하기 */
    if (photos.length === 0) {
      alert('사진을 1장 이상 추가해주세요');
      return;
    }

    if (!petType.trim()) {
      alert('반려 동물을 선택해주세요');
      return;
    }
    if (!mainCategory.trim()) {
      alert('카테고리를 선택해주세요');
      return;
    }
    if (!subCategory.trim()) {
      alert('서브 카테고리를 선택해주세요');
      return;
    }
    if (!subCategory.trim()) {
      alert('서브 카테고리를 선택해주세요');
      return;
    }
    if (!subCategory.trim()) {
      alert('서브 카테고리를 선택해주세요');
      return;
    }
    if (!subCategory.trim()) {
      alert('서브 카테고리를 선택해주세요');
      return;
    }
    if (!subCategory.trim()) {
      alert('서브 카테고리를 선택해주세요');
      return;
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-full  px-4 bg-white">
        {/* 뒤로 가기 섹션 */}
        {/* TODO 컴포넌트 크기 좀 작은 것 같음 */}
        {/* <Header title="상품 등록" /> */}
        <Link href={'/products'}>
          <button
            type="button"
            onClick={() => goBack.back()}
            aria-label="뒤로 가기"
            className="absolute left-4 top-14 flex items-center flex-row gap-1.75 cursor-pointer"
          >
            <Image src={ArrowIcon} alt="뒤로 가기 아이콘" />
            <span className="text-[18px] leading-none font-medium">
              상품 등록
            </span>
          </button>
        </Link>

        {/* ----사진 섹션---- */}
        <div className="flex flex-col mt-27.5">
          <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
            사진 등록
          </p>

          <div className="mt-1.5 pt-1.5 flex gap-3 overflow-x-auto pb-1.5">
            {/* + 버튼 */}
            {/* TODO dash가 안 먹힘... */}
            <label
              htmlFor="profileUpload"
              className="flex flex-col items-center justify-center shrink-0 w-21 h-21 border border-dashed border-[#E5E5EA] rounded-lg bg-white cursor-pointer"
            >
              <span className="text-xl text-[#8A8F99]">+</span>
              <span className="text-[11px] text-[#8A8F99]">
                {photos.length}/10
              </span>
              <input
                type="file"
                id="profileUpload"
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleAddPhoto}
              />
            </label>

            {/* 업로드한 사진들 */}
            {/* TODO 10개 됐을때 더 클릭 안 되게 비활성화 */}
            {photos.map((photo, index) => (
              <div key={index} className="relative w-21 h-21 shrink-0">
                <div className="w-full h-full overflow-hidden rounded-lg bg-[#E5E5EA]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={`사진 ${index + 1}`}
                    className="w-full h-full object-cover border border-[#e5e5ea] rounded-lg "
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeletePhoto(index)}
                  className="absolute -top-2 -right-2 z-10 cursor-pointer"
                >
                  <Image
                    src="/icons/delete-photo.svg"
                    alt="삭제"
                    width={18}
                    height={18}
                    className="w-6 h-6"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ----폼 섹션---- */}
        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
          {/* 반려동물 선택(버튼) */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
              반려동물 선택
            </p>
            <div className="flex gap-3.75 mt-1.5">
              <button
                type="button"
                onClick={() => setPetType('dog')}
                className={`flex-1 px-15.75 py-4.25 rounded-lg text-[15px] ${
                  petType === 'dog'
                    ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                    : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                }`}
              >
                강아지
              </button>
              <button
                type="button"
                onClick={() => setPetType('cat')}
                className={`flex-1 px-15.75 py-4.25 rounded-lg text-[15px] ${
                  petType === 'cat'
                    ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                    : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                }`}
              >
                고양이
              </button>
            </div>
          </div>

          {/* 메인 카테고리(버튼) */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
              카테고리
            </p>
            <div className="flex gap-3 mt-1.5">
              {['사료', '간식', '용품', '건강', '의류'].map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMainCategory(item)}
                  className={`flex-1 px-4.5 py-2.25 rounded-lg text-[13px] ${
                    mainCategory === item
                      ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                      : 'text-[#8A8F99] border border-[#E5E5EA] bg-wihte'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* 서브 카테고리(라디오) */}
          <div className="grid justify-between grid-cols-3 gap-4">
            {['건식', '습식/화식', '건조', '기타'].map((label, idx) => (
              <label
                key={label}
                htmlFor={`food-${idx}`}
                className="flex items-center gap-2.5 ml-4 cursor-pointer"
              >
                <input
                  type="radio"
                  id={`food-${idx}`}
                  name="food"
                  className="peer hidden"
                />
                {/* TODO 안쪽 점 안 생기는 문제 해결 */}
                {/* 바깥 원 */}
                <span className="w-5.5 h-5.5 rounded-full border border-[#E5E5EA] flex items-center justify-center transition-colors peer-checked:border-[#60CFFF]">
                  {/* 안쪽 점 */}
                  <span className="w-3 h-3 rounded-full bg-[#60CFFF] scale-0 peer-checked:scale-100 transform transition-transform" />
                </span>

                {/* 텍스트 */}
                <span className="text-[13px] text-[#8A8F99] peer-checked:text-[#0F1218]">
                  {label}
                </span>
              </label>
            ))}
          </div>

          {/* 제목 */}
          {/* TODO 상품명 말고 제목? */}
          <div className="mt-3.5">
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">제목</p>
            <div className="relative mt-1.5 h-12">
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                className="w-full h-full px-4 pr-21.25 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
            </div>
          </div>

          {/* 설명 */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">설명</p>
            <div className="relative mt-1.5 ">
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={`포포에 올릴 게시글 내용을 작성해주세요.\n(안전한 거래를 위해 유통기한을 입력해주세요)`}
                className="w-full h-45 px-4 py-4 leading-5.5 border border-[#E5E5EA] rounded-lg resize-none text-[15px] placeholder:text-[#8A8F99] focus:border-[#60CFFF] focus:outline-none"
              />
            </div>
          </div>

          {/* 가격 */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">가격</p>
            <div className="relative mt-1.5 h-12">
              <input
                type="text"
                inputMode="decimal"
                value={displayValue}
                onChange={handleChange}
                placeholder="₩ 가격을 입력해주세요"
                onInput={e => {
                  const target = e.currentTarget;
                  target.value = target.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/(\..*)\./g, '$1');
                }}
                className="w-full h-full px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[13px] font-medium text-[#0F1218]">
                원
              </span>
            </div>
          </div>

          {/* 상품 상태 */}
          <div>
            <div>
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                상품 상태
              </p>
              <div className="flex gap-3.75 mt-1.5">
                <button
                  type="button"
                  onClick={() => setProductStatus('dog')}
                  className={`flex-1 h-13 rounded-lg text-[15px] ${
                    productStatus === 'dog'
                      ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                      : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                  }`}
                >
                  중고
                </button>
                <button
                  type="button"
                  onClick={() => setProductStatus('cat')}
                  className={`flex-1 h-13 rounded-lg text-[15px] ${
                    productStatus === 'cat'
                      ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                      : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                  }`}
                >
                  새상품
                </button>
              </div>
            </div>
          </div>

          {/* 거래 방식 */}
          <div>
            <div>
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                거래 방식
              </p>
              <div className="flex gap-3.75 mt-1.5">
                <button
                  type="button"
                  onClick={() => setTradeMethod('dog')}
                  className={`flex-1 h-13 rounded-lg text-[15px] ${
                    tradeMethod === 'dog'
                      ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                      : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                  }`}
                >
                  직거래
                </button>
                <button
                  type="button"
                  onClick={() => setTradeMethod('cat')}
                  className={`flex-1 h-13 rounded-lg text-[15px] ${
                    tradeMethod === 'cat'
                      ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                      : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                  }`}
                >
                  택배거래
                </button>
              </div>
            </div>
          </div>

          {/* 장소 입력 */}
          <div>
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">장소</p>
            <div className="relative mt-1.5 h-12">
              <input
                type="text"
                /*  value={petWeight}
                onChange={e => setPetWeight(e.target.value)} */
                placeholder="종로 1번 출구"
                className="w-full h-full px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
              />
            </div>
          </div>

          {/* ----변경 버튼---- */}
          <div className="mb-5 pb-safe">
            <Link href="/products">
              <button
                type="submit"
                className="relative flex items-center justify-center mt-10  w-full h-14 rounded-lg bg-[#60CFFF] text-white font-medium cursor-pointer"
              >
                상품 등록
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
