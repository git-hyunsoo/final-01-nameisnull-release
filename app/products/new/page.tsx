//상품 등록

'use client';

/* 컴포넌트 및 훅 관리 */
import Header from '@/components/common/Header'; //헤더 컴포넌트
import Image from 'next/image'; //이미지 컴포넌트
import useAuthStore from '@/store/authStore';
import { useEffect, useState } from 'react'; // 상태 관리 훅
import {
  CATEGORY_MAP,
  PetType,
  MainCategoryKey,
  MAIN_CATEGORY_LABELS,
} from '@/app/products/new/category'; //카테고리 상수
import { useRouter } from 'next/navigation'; // 라우터 훅(페이지 이동)
import { registProduct, uploadFile } from '@/lib/api/new'; // 상품 등록 API 함수
import { SellerProduct } from '@/types/product'; // 상품 타입
import { embedSingleProduct } from '@/actions/ai-search/generate-embeddings';

export default function NewPage() {
  /* ========== 상태 ========== */
  const [photos, setPhotos] = useState<File[]>([]);
  const [petType, setPetType] = useState<PetType>('dog');
  const [mainCategory, setMainCategory] = useState<MainCategoryKey>('food');
  const [subCategory, setSubCategory] = useState('dry');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'new' | 'used'>('used');
  const [tradeType, setTradeType] = useState<'direct' | 'delivery'>('direct');
  const [tradeLocation, setTradeLocation] = useState('');

  /* ========== 핸들러 ========== */
  /* 로그인 없으면 글 작성 못 함 */
  const router = useRouter(); // 라우터 인스턴스(페이지 이동)
  const accessToken = useAuthStore(state => state.accessToken); // 인증 토큰 가져오기

  useEffect(() => {
    if (!accessToken) {
      /* alert('로그인이 필요합니다.'); */
      router.push('/auth/login');
    }
  }, [accessToken, router]);

  if (!accessToken) return null;

  /* 사진 등록(input) */
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...newFiles].slice(0, 10));
  };
  const handleDeletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  /* 가격(input) */
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, '');

    if (rawValue === '') {
      setPrice('');
    } else {
      const formattedValue = new Intl.NumberFormat('ko-KR').format(
        Number(rawValue)
      );
      setPrice(formattedValue);
    }
  };

  /* 반려동물 선택(button) <-> 메인 카테고리 */
  const handlePetChange = (type: PetType) => {
    setPetType(type);
    setMainCategory('food');
    const firstSubKey = Object.keys(CATEGORY_MAP[type]['food'])[0];
    setSubCategory(firstSubKey);
  };

  /* 카테고리(button) <-> 서브 카테고리 */
  const handleMainChange = (category: MainCategoryKey) => {
    setMainCategory(category);
    const firstSubKey = Object.keys(CATEGORY_MAP[petType][category])[0];
    setSubCategory(firstSubKey);
  };

  /* 상품 등록(button) */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // TODO alert말고 다른 방법 생각
    // 상품 등록(버튼 클릭 전) ---> 유효성 검사(빈 칸 체크)
    if (photos.length === 0) return alert('사진을 1장 이상 추가해주세요');
    if (!title.trim()) {
      alert('제목을 입력해주세요');
      return;
    }
    if (!description.trim()) {
      alert('설명을 입력해주세요');
      return;
    }
    if (!price.trim()) {
      alert('가격을 입력해주세요');
      return;
    }
    if (!tradeLocation.trim()) {
      alert('거래 장소를 입력해주세요');
      return;
    }

    try {
      // 상품 등록(버튼 클릭 후) ---> 사진 업로드
      const uploadResults = await Promise.all(
        photos.map(file => uploadFile(file))
      );

      // 상품 등록(버튼 클릭 후) ---> 업로드 된 파일 정보 추출
      const mainImages = uploadResults.map(res => ({
        path: res.item[0].path,
        name: res.item[0].name,
      }));

      // 상품 등록(버튼 클릭 후) ---> 전송할 데이터 구성
      const productData: SellerProduct = {
        name: title,
        content: description,
        price: Number(price.replace(/,/g, '')),
        quantity: 1,
        mainImages: mainImages,
        extra: {
          pet: petType,
          mainCategory,
          subCategory,
          condition,
          tradeType,
          tradeLocation,
        },
      };

      // 상품 등록 ---> API 호출
      const result = await registProduct(productData, accessToken);

      // 상품 등록(버튼 클릭 후) ---> 결과 처리
      if (result.ok) {
        // 상품 등록 성공 시 임베딩 작업 시작
        const productId = result.item._id;
        embedSingleProduct(productId).catch(err => {
          console.error('단일 상품 임베딩 실패:', err);
        });
        alert('상품이 성공적으로 등록되었습니다! 🎉');
        router.push('/products');
      } else {
        alert(result.message || '등록에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('상품 등록 통신 에러:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  /* ========== 랜더 ========== */
  return (
    <>
      <Header title="상품 등록" />
      <div className="min-h-screen flex justify-center">
        <div className="relative w-full px-4 bg-white">
          {/* 사진 등록 - 기본 */}
          <div className="flex flex-col mt-7.5">
            <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
              사진 등록
            </p>
            <div className="mt-1.5 pt-1.5 flex gap-3 overflow-x-auto pb-1.5">
              <label
                htmlFor={photos.length < 10 ? 'profileUpload' : undefined}
                className={`flex flex-col items-center justify-center shrink-0 w-21 h-21 border-2 border-dashed rounded-lg transition-colors ${
                  photos.length >= 10
                    ? 'bg-gray-100 border-[#E5E5EA] cursor-not-allowed'
                    : 'bg-white border-[#D1D1D6] cursor-pointer hover:bg-gray-50'
                }`}
                onClick={e => {
                  if (photos.length >= 10) {
                    e.preventDefault();
                    alert('사진은 최대 10장까지만 등록 가능합니다.');
                  }
                }}
              >
                <span
                  className={`text-xl ${photos.length >= 10 ? 'text-[#C7C7CC]' : 'text-[#8A8F99]'}`}
                >
                  +
                </span>
                <span
                  className={`text-[11px] ${photos.length >= 10 ? 'text-[#C7C7CC]' : 'text-[#8A8F99]'}`}
                >
                  {photos.length}/10
                </span>
                <input
                  type="file"
                  id="profileUpload"
                  className="hidden"
                  accept="image/*"
                  multiple
                  disabled={photos.length >= 10}
                  onChange={handleAddPhoto}
                />
              </label>

              {/* 사진 등록 - 업로드 */}
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

          {/* 폼 전체 */}
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            {/* 반려동물 선택 */}
            <div>
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                반려동물 선택
              </p>
              <div className="flex gap-3.75 mt-1.5">
                <button
                  type="button"
                  onClick={() => handlePetChange('dog')}
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
                  onClick={() => handlePetChange('cat')}
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

            {/* 메인 카테고리 */}
            <div>
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                카테고리
              </p>
              <div className="flex gap-3 mt-1.5">
                {(Object.keys(CATEGORY_MAP[petType]) as MainCategoryKey[]).map(
                  item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleMainChange(item)}
                      className={`flex-1 px-4.5 py-2.25 rounded-lg text-[13px] ${
                        mainCategory === item
                          ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                          : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                      }`}
                    >
                      {MAIN_CATEGORY_LABELS[item]}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* 하위 카테고리 */}
            <div className="grid justify-between grid-cols-3 gap-4">
              {Object.entries(CATEGORY_MAP[petType][mainCategory]).map(
                ([key, label], idx) => (
                  <label
                    key={key}
                    htmlFor={`food-${idx}`}
                    className="flex items-center gap-2.5 ml-4 cursor-pointer"
                  >
                    <input
                      type="radio"
                      id={`food-${idx}`}
                      name="subCategory"
                      value={key}
                      checked={subCategory === key}
                      onChange={e => setSubCategory(e.target.value)}
                      className="peer hidden"
                    />
                    <div className="w-5.5 h-5.5 rounded-full border border-[#E5E5EA] flex items-center justify-center transition-colors bg-white peer-checked:border-[#60CFFF] peer-checked:[&>div]:scale-100 peer-checked:[&>div]:opacity-100">
                      <div className="w-3 h-3 rounded-full bg-[#60CFFF] transition-all duration-200 transform scale-0 opacity-0" />
                    </div>
                    <span className="text-[13px] text-[#8A8F99] peer-checked:text-[#0F1218]">
                      {label}
                    </span>
                  </label>
                )
              )}
            </div>

            {/* 제목 */}
            <div className="mt-3.5">
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                제목
              </p>
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
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                설명
              </p>
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
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                가격
              </p>
              <div className="relative mt-1.5 h-12">
                <input
                  type="text"
                  inputMode="decimal"
                  value={price}
                  onChange={handlePriceChange}
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
                    onClick={() => setCondition('used')}
                    className={`flex-1 h-13 rounded-lg text-[15px] ${
                      condition === 'used'
                        ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                        : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                    }`}
                  >
                    중고
                  </button>
                  <button
                    type="button"
                    onClick={() => setCondition('new')}
                    className={`flex-1 h-13 rounded-lg text-[15px] ${
                      condition === 'new'
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
                    onClick={() => setTradeType('direct')}
                    className={`flex-1 h-13 rounded-lg text-[15px] ${
                      tradeType === 'direct'
                        ? 'text-[#60CFFF] font-semibold border border-[#60cfff] bg-[#E8F8FF]'
                        : 'text-[#8A8F99] border border-[#E5E5EA] bg-white'
                    }`}
                  >
                    직거래
                  </button>
                  <button
                    type="button"
                    onClick={() => setTradeType('delivery')}
                    className={`flex-1 h-13 rounded-lg text-[15px] ${
                      tradeType === 'delivery'
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
              <p className="ml-1 text-[13px] font-medium text-[#0F1218]">
                장소
              </p>
              <div className="relative mt-1.5 h-12">
                <input
                  type="text"
                  value={tradeLocation}
                  onChange={e => setTradeLocation(e.target.value)}
                  placeholder="종로 1번 출구"
                  className="w-full h-full px-4 border border-[#E5E5EA] rounded-lg text-[15px] text-[#0F1218] placeholder-[#8A8F99] focus:outline-none focus:border-[#60CFFF]"
                />
              </div>
            </div>

            {/* 상품 등록(button) */}
            <div className="mb-5 pb-safe">
              <button
                type="submit"
                className="flex items-center justify-center mt-10 w-full h-14 rounded-lg bg-[#60CFFF] text-white font-medium"
              >
                상품 등록
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
