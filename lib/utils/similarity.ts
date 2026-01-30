// 코사인 유사도 계산
export default function cosineSimilarity(
  vecA: number[],
  vecB: number[]
): number {
  // 1단계: 내적 계산
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);

  // 2단계: 벡터 A의 크기 계산
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));

  // 3단계: 벡터 B의 크기 계산
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

  // 4단계: 코사인 유사도 = 내적 / (크기A × 크기B)
  return dotProduct / (magnitudeA * magnitudeB);
}
