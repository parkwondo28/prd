import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, CafesResponse } from '@/lib/types/api';
import type { Cafe } from '@/lib/types/cafe';

// 목업 데이터 (실제로는 데이터베이스에서 가져옴)
const mockCafes: Cafe[] = [
  {
    id: '1',
    name: '커피나무',
    address: '서울시 마포구 연남동 123-45',
    latitude: 37.5665,
    longitude: 126.9780,
    outlets: 4,
    noiseLevel: 'quiet',
    chairComfort: 'comfortable',
    wifiSpeed: 'fast',
    currentNoise: 'quiet',
    currentCrowd: 'moderate',
    lastUpdated: new Date(),
    isHiddenGem: true,
  },
  {
    id: '2',
    name: '스타벅스 홍대점',
    address: '서울시 마포구 홍대입구역 456-78',
    latitude: 37.5563,
    longitude: 126.9234,
    outlets: 5,
    noiseLevel: 'moderate',
    chairComfort: 'moderate',
    wifiSpeed: 'fast',
    currentNoise: 'moderate',
    currentCrowd: 'crowded',
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000), // 30분 전
  },
  {
    id: '3',
    name: '골목길 카페',
    address: '서울시 마포구 상수동 789-12',
    latitude: 37.5465,
    longitude: 126.9234,
    outlets: 3,
    noiseLevel: 'quiet',
    chairComfort: 'comfortable',
    wifiSpeed: 'moderate',
    currentNoise: 'quiet',
    currentCrowd: 'empty',
    lastUpdated: new Date(Date.now() - 60 * 60 * 1000), // 1시간 전
    isHiddenGem: true,
  },
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = parseFloat(searchParams.get('lat') || '0');
    const lng = parseFloat(searchParams.get('lng') || '0');
    const maxDistance = searchParams.get('maxDistance')
      ? parseInt(searchParams.get('maxDistance')!)
      : undefined;

    // 간단한 거리 필터링 (실제로는 데이터베이스 쿼리로 처리)
    let filteredCafes = mockCafes;

    if (maxDistance && lat && lng) {
      // 거리 계산 및 필터링은 클라이언트에서 처리
      // 여기서는 모든 카페 반환
    }

    const response: ApiResponse<CafesResponse> = {
      success: true,
      data: {
        cafes: filteredCafes,
        total: filteredCafes.length,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<CafesResponse> = {
      success: false,
      error: error instanceof Error ? error.message : '카페 목록을 불러올 수 없습니다.',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

