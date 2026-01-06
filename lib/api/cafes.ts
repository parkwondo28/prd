import type { Cafe, CafeDetail } from '@/lib/types/cafe';
import type { ApiResponse, CafesResponse, CafeDetailResponse } from '@/lib/types/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * 주변 카페 목록 조회
 */
export async function getNearbyCafes(
  latitude: number,
  longitude: number,
  maxDistance?: number
): Promise<Cafe[]> {
  try {
    const params = new URLSearchParams({
      lat: latitude.toString(),
      lng: longitude.toString(),
    });
    
    if (maxDistance) {
      params.append('maxDistance', maxDistance.toString());
    }

    const response = await fetch(`${API_URL}/cafes?${params}`);
    const data: ApiResponse<CafesResponse> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || '카페 목록을 불러올 수 없습니다.');
    }

    return data.data.cafes;
  } catch (error) {
    console.error('Failed to fetch cafes:', error);
    throw error;
  }
}

/**
 * 카페 상세 정보 조회
 */
export async function getCafeDetail(cafeId: string): Promise<CafeDetail> {
  try {
    const response = await fetch(`${API_URL}/cafes/${cafeId}`);
    const data: ApiResponse<CafeDetailResponse> = await response.json();

    if (!data.success || !data.data) {
      throw new Error(data.error || '카페 정보를 불러올 수 없습니다.');
    }

    return data.data.cafe;
  } catch (error) {
    console.error('Failed to fetch cafe detail:', error);
    throw error;
  }
}

/**
 * 실시간 상태 업데이트
 */
export async function updateCafeStatus(
  cafeId: string,
  noiseLevel: 'quiet' | 'moderate' | 'loud',
  crowdLevel: 'empty' | 'moderate' | 'crowded'
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/cafes/${cafeId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        noiseLevel,
        crowdLevel,
      }),
    });

    const data: ApiResponse<void> = await response.json();

    if (!data.success) {
      throw new Error(data.error || '상태 업데이트에 실패했습니다.');
    }
  } catch (error) {
    console.error('Failed to update cafe status:', error);
    throw error;
  }
}

