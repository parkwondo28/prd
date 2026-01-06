/**
 * 두 좌표 간의 거리를 계산하는 함수 (Haversine 공식)
 * @param lat1 첫 번째 위치의 위도
 * @param lon1 첫 번째 위치의 경도
 * @param lat2 두 번째 위치의 위도
 * @param lon2 두 번째 위치의 경도
 * @returns 거리 (미터)
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // 지구 반지름 (미터)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // 거리 (미터)
}

/**
 * 거리를 포맷팅하는 함수
 * @param distance 거리 (미터)
 * @returns 포맷팅된 거리 문자열
 */
export function formatDistance(distance: number): string {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  }
  return `${(distance / 1000).toFixed(1)}km`;
}

