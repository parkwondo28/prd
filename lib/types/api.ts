// API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 카페 목록 조회 응답
export interface CafesResponse {
  cafes: import('./cafe').Cafe[];
  total: number;
}

// 카페 상세 조회 응답
export interface CafeDetailResponse {
  cafe: import('./cafe').CafeDetail;
}

// 상태 업데이트 요청
export interface StatusUpdateRequest {
  cafeId: string;
  noiseLevel: 'quiet' | 'moderate' | 'loud';
  crowdLevel: 'empty' | 'moderate' | 'crowded';
}

