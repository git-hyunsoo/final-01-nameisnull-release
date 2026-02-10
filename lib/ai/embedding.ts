// 임베딩 생성

import { getOpenAIClient } from '@/lib/ai/opeinai-client';

// 텍스트를 임베딩하는 함수
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const client = getOpenAIClient();
    const response = await client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('임베딩 생성 실패:', error);
    if (error instanceof Error) {
      // API 키 문제
      if (error.message.includes('API key')) {
        throw new Error('OpenAI API 키가 유효하지 않습니다.');
      }

      // Rate limit 문제
      if (error.message.includes('rate limit')) {
        throw new Error('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
      }

      // 네트워크 문제
      if (error.message.includes('network')) {
        throw new Error('네트워크 연결에 문제가 있습니다.');
      }

      throw new Error(`임베딩 생성 중 오류: ${error.message}`);
    }
    throw new Error('임베딩 생성 중 알 수 없는 오류가 발생했습니다.');
  }
}
