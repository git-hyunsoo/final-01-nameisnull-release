// 상품 등록 페이지

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import SubmitButton from '@/components/shared/SubmitButton';
import BaseInput from '@/components/shared/BaseInput';
import ToggleButton from '@/components/shared/ToggleButton';
import useUserStore from '@/store/authStore';
import { registProduct, uploadFile } from '@/lib/api/new';
import { SellerProduct } from '@/types/product';
import { embedSingleProduct } from '@/actions/ai-search/generate-embeddings';
import {
  CATEGORY_MAP,
  PetType,
  MainCategoryKey,
  MAIN_CATEGORY_LABELS,
} from '@/app/products/new/category';

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  tradeLocation?: string;
}

export default function NewPage() {
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const accessToken = useUserStore(state => state.accessToken);

  useEffect(() => {
    if (!accessToken) {
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
  const handlePriceChange = (value: string) => {
    const rawValue = value.replace(/[^0-9]/g, '');

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

    setIsSubmitted(true);

    const newErrors: FormErrors = {};

    if (photos.length === 0) return alert('사진을 1장 이상 추가해주세요');
    if (!title.trim()) newErrors.title = '제목을 입력해주세요';
    if (!description.trim()) newErrors.description = '설명을 입력해주세요';
    if (!price.trim()) newErrors.price = '가격을 입력해주세요';
    if (!tradeLocation.trim())
      newErrors.tradeLocation = '거래 장소를 입력해주세요';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      const uploadResults = await Promise.all(
        photos.map(file => uploadFile(file))
      );

      const mainImages = uploadResults.map(res => ({
        path: res.item[0].path,
        name: res.item[0].name,
      }));

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

      const result = await registProduct(productData, accessToken);

      if (result.ok) {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header title="상품 등록" />
      <main className="min-h-screen flex justify-center">
        <div className="relative w-full px-4 pb-40 bg-white">
          {/* 사진 등록 영역 */}
          <section
            className="flex flex-col mt-7.5"
            aria-labelledby="photo-upload-label"
          >
            <p
              id="photo-upload-label"
              className="ml-1 text-[13px] font-medium text-[#0F1218]"
            >
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
                aria-label={`사진 추가 (${photos.length}/10)`}
              >
                <span
                  className={`text-xl ${photos.length >= 10 ? 'text-[#C7C7CC]' : 'text-[#8A8F99]'}`}
                  aria-hidden="true"
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

              {/* 업로드된 사진 목록 */}
              {photos.map((photo, index) => (
                <div key={index} className="relative w-21 h-21 shrink-0">
                  <div className="w-full h-full overflow-hidden rounded-lg bg-[#E5E5EA]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`등록된 사진 ${index + 1}`}
                      className="w-full h-full object-cover border border-[#e5e5ea] rounded-lg "
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeletePhoto(index)}
                    className="absolute -top-2 -right-2 z-10 cursor-pointer"
                    aria-label={`${index + 1}번 사진 삭제`}
                  >
                    <Image
                      src="/icons/delete-photo.svg"
                      alt="" // 접근성: aria-label로 설명 대체
                      width={18}
                      height={18}
                      className="w-6 h-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 상품 정보 입력 폼 */}
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
            {/* 반려동물 선택 */}
            <ToggleButton
              label="반려동물 선택"
              options={[
                { label: '강아지', value: 'dog' },
                { label: '고양이', value: 'cat' },
              ]}
              selectedValue={petType}
              onChange={value => handlePetChange(value as PetType)}
            />

            {/* 메인 카테고리 */}
            <div role="group" aria-labelledby="main-category-label">
              <p
                id="main-category-label"
                className="ml-1 text-[13px] font-medium text-[#0F1218]"
              >
                카테고리
              </p>
              <div className="flex gap-3 mt-1.5">
                {(Object.keys(CATEGORY_MAP[petType]) as MainCategoryKey[]).map(
                  item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleMainChange(item)}
                      aria-pressed={mainCategory === item}
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
            <div
              className="grid justify-between grid-cols-3 gap-4"
              role="radiogroup"
              aria-label="하위 카테고리 선택"
            >
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
                    <div
                      className="w-5.5 h-5.5 rounded-full border border-[#E5E5EA] flex items-center justify-center transition-colors bg-white peer-checked:border-[#60CFFF] peer-checked:[&>div]:scale-100 peer-checked:[&>div]:opacity-100"
                      aria-hidden="true"
                    >
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
            <BaseInput
              id="title"
              label="제목"
              value={title}
              onChange={val => {
                setTitle(val);
                if (errors.title)
                  setErrors(prev => ({ ...prev, title: undefined }));
              }}
              placeholder="제목을 입력하세요."
              className="mt-2.5"
              isError={isSubmitted && !!errors.title}
              errorMsg={errors.title}
            />

            {/* 설명 */}
            <BaseInput
              id="description"
              label="설명"
              type="textarea"
              value={description}
              onChange={val => {
                setDescription(val);
                if (errors.description)
                  setErrors(prev => ({ ...prev, description: undefined }));
              }}
              placeholder={`포포에 올릴 게시글 내용을 작성해주세요.\n(안전한 거래를 위해 유통기한을 입력해주세요)`}
              isError={isSubmitted && !!errors.description}
              errorMsg={errors.description}
            />

            {/* 가격 */}
            <BaseInput
              id="price"
              label="가격"
              value={price}
              onChange={val => {
                handlePriceChange(val);
                if (errors.price)
                  setErrors(prev => ({ ...prev, price: undefined }));
              }}
              placeholder="₩ 가격을 입력해주세요"
              suffix={<span className="mr-4 text-[#0f1218]">원</span>}
              isError={isSubmitted && !!errors.price}
              errorMsg={errors.price}
            />

            {/* 상품 상태 */}
            <ToggleButton
              label="상품 상태"
              options={[
                { label: '중고', value: 'used' },
                { label: '새상품', value: 'new' },
              ]}
              selectedValue={condition}
              onChange={value => setCondition(value as 'new' | 'used')}
            />

            {/* 거래 방식 */}
            <ToggleButton
              label="거래 방식"
              options={[
                { label: '직거래', value: 'direct' },
                { label: '택배거래', value: 'delivery' },
              ]}
              selectedValue={tradeType}
              onChange={value => setTradeType(value as 'direct' | 'delivery')}
            />

            {/* 장소 입력 */}
            <BaseInput
              id="tradeLocation"
              label="거래 장소"
              value={tradeLocation}
              onChange={val => {
                setTradeLocation(val);
                if (errors.tradeLocation)
                  setErrors(prev => ({ ...prev, tradeLocation: undefined }));
              }}
              placeholder="종로 1번 출구"
              isError={isSubmitted && !!errors.tradeLocation}
              errorMsg={errors.tradeLocation}
            />

            {/* 버튼 영역 */}
            <SubmitButton
              title={isSubmitting ? '등록 중...' : '상품 등록'}
              disabled={isSubmitting}
            />
          </form>
        </div>
      </main>
    </>
  );
}
