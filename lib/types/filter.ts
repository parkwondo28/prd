// 필터 조건 타입
export interface FilterOptions {
  outlets?: number; // 최소 콘센트 개수
  noiseLevel?: ('quiet' | 'moderate' | 'loud')[]; // 허용할 소음 수준
  chairComfort?: ('hard' | 'moderate' | 'comfortable')[]; // 허용할 의자 편안함
  wifiSpeed?: ('slow' | 'moderate' | 'fast')[]; // 허용할 와이파이 속도
  maxDistance?: number; // 최대 거리 (미터)
  showHiddenGemsOnly?: boolean; // 숨은 명소만 보기
}

// 필터 상태 타입
export interface FilterState {
  isOpen: boolean;
  options: FilterOptions;
}

