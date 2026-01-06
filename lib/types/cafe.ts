// 카페 기본 정보 타입
export interface Cafe {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number; // 현재 위치로부터의 거리 (미터)
  
  // 작업 환경 정보
  outlets: number; // 콘센트 개수 (0-5)
  noiseLevel: 'quiet' | 'moderate' | 'loud'; // 소음 수준
  chairComfort: 'hard' | 'moderate' | 'comfortable'; // 의자 편안함
  wifiSpeed: 'slow' | 'moderate' | 'fast'; // 와이파이 속도
  
  // 실시간 정보
  currentNoise?: 'quiet' | 'moderate' | 'loud';
  currentCrowd?: 'empty' | 'moderate' | 'crowded';
  lastUpdated?: Date; // 마지막 업데이트 시간
  
  // 추가 정보
  phone?: string;
  openingHours?: string;
  isHiddenGem?: boolean; // 숨은 명소 여부
}

// 카페 상세 정보 (상세 페이지용)
export interface CafeDetail extends Cafe {
  description?: string;
  images?: string[];
  menu?: {
    name: string;
    price: number;
  }[];
  reviews?: {
    id: string;
    content: string;
    createdAt: Date;
  }[];
}

