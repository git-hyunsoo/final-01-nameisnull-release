import { useEffect, useState } from 'react';
import styles from '../../app/search/searchpage.module.css';

const hints = [
  '"시니어 강아지가 먹을 간식 뭐야?"',
  '"활동량 적은 고양이 장난감 추천해 줘!"',
  '"관절 사료 추천해 줘!"',
];

export default function SearchHint() {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHintIndex(i => (i + 1) % hints.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="mt-5 h-4.5 overflow-hidden text-br-input-disabled-line text-[13px]">
        <span key={hintIndex} className={styles.hint}>
          {hints[hintIndex]}
        </span>
      </div>
    </>
  );
}
