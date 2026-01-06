import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, CafeDetailResponse } from '@/lib/types/api';
import type { CafeDetail } from '@/lib/types/cafe';

// 목업 데이터
const mockCafeDetails: Record<string, CafeDetail> = {
  '1': {
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
    description: '조용하고 작업하기 좋은 분위기의 카페입니다.',
    phone: '02-1234-5678',
    openingHours: '평일 09:00 - 22:00, 주말 10:00 - 23:00',
    menu: [
      { name: '아메리카노', price: 4500 },
      { name: '카페라떼', price: 5000 },
    ],
  },
  '2': {
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
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
    phone: '02-2345-6789',
    openingHours: '매일 07:00 - 23:00',
  },
  '3': {
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
    lastUpdated: new Date(Date.now() - 60 * 60 * 1000),
    isHiddenGem: true,
    description: '작업하기 최적의 환경을 제공하는 작은 카페입니다.',
    phone: '02-3456-7890',
    openingHours: '평일 10:00 - 20:00, 주말 11:00 - 19:00',
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cafeId = params.id;
    const cafe = mockCafeDetails[cafeId];

    if (!cafe) {
      const response: ApiResponse<CafeDetailResponse> = {
        success: false,
        error: '카페를 찾을 수 없습니다.',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<CafeDetailResponse> = {
      success: true,
      data: {
        cafe,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<CafeDetailResponse> = {
      success: false,
      error: error instanceof Error ? error.message : '카페 정보를 불러올 수 없습니다.',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

