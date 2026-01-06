'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useGeolocation } from '@/lib/hooks/useGeolocation';
import { useCafeStore } from '@/store/cafeStore';
import { useMapStore } from '@/store/mapStore';
import { getNearbyCafes } from '@/lib/api/cafes';
import { calculateDistance } from '@/lib/utils/distance';
import CafeCard from '@/components/cafe/CafeCard';
import type { Cafe } from '@/lib/types/cafe';

// react-leaflet은 서버 사이드 렌더링을 지원하지 않으므로 dynamic import 사용
const MapContainer = dynamic(() => import('@/components/map/MapContainer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">지도를 불러오는 중...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const { latitude, longitude, error: geoError, loading: geoLoading, retry: retryGeolocation } = useGeolocation();
  const { cafes, setCafes, loading, setLoading, error, setError } = useCafeStore();
  const { center, setCenter, selectedCafeId, setSelectedCafe } = useMapStore();
  const [showGeoError, setShowGeoError] = useState(true);

  // 기본 위치 설정 (서울시청) - 위치 정보가 없을 때 사용
  useEffect(() => {
    if (!center) {
      setCenter({ lat: 37.5665, lng: 126.9780 }); // 서울시청 기본 위치
    }
  }, [center, setCenter]);

  // 위치 정보가 있으면 지도 중심 설정
  useEffect(() => {
    if (latitude && longitude) {
      setCenter({ lat: latitude, lng: longitude });
    }
  }, [latitude, longitude, setCenter]);

  // 카페 데이터 로드 (위치 정보가 있으면 해당 위치 기준, 없으면 기본 위치 기준)
  useEffect(() => {
    const loadCafes = async () => {
      const targetLat = latitude || center?.lat || 37.5665;
      const targetLng = longitude || center?.lng || 126.9780;

      setLoading(true);
      setError(null);

      try {
        const nearbyCafes = await getNearbyCafes(targetLat, targetLng);
        
        // 거리 계산 및 정렬 (위치 정보가 있을 때만)
        const cafesWithDistance = nearbyCafes.map((cafe) => ({
          ...cafe,
          distance: latitude && longitude 
            ? calculateDistance(latitude, longitude, cafe.latitude, cafe.longitude)
            : undefined,
        })).sort((a, b) => {
          if (a.distance !== undefined && b.distance !== undefined) {
            return a.distance - b.distance;
          }
          return 0;
        });

        setCafes(cafesWithDistance);
      } catch (err) {
        setError(err instanceof Error ? err.message : '카페 정보를 불러올 수 없습니다.');
      } finally {
        setLoading(false);
      }
    };

    // 지도 중심이 설정된 후 카페 로드
    if (center) {
      loadCafes();
    }
  }, [latitude, longitude, center, setCafes, setLoading, setError]);

  // 선택된 카페
  const selectedCafe = useMemo(() => {
    return cafes.find((cafe) => cafe.id === selectedCafeId) || null;
  }, [cafes, selectedCafeId]);

  const handleMarkerClick = (cafe: Cafe) => {
    setSelectedCafe(cafe.id);
  };

  // react-leaflet은 API 키가 필요 없음

  return (
    <>
      {/* react-leaflet은 API 키가 필요 없습니다 */}

      <main className="relative w-full h-screen overflow-hidden">
        {/* 지도 컨테이너 */}
        <div className="absolute inset-0">
          {/* 위치 정보 로딩 중일 때만 전체 화면 로딩 표시 */}
          {geoLoading && !center ? (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">위치 정보를 가져오는 중...</p>
              </div>
            </div>
          ) : (
            <>
              {/* 위치 에러 알림 (상단 고정) */}
              {geoError && showGeoError && (
                <div className="absolute top-4 left-4 right-4 z-30 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-yellow-800 mb-1">
                        위치 정보를 사용할 수 없습니다
                      </p>
                      <p className="text-xs text-yellow-700 mb-2">
                        기본 위치(서울시청) 기준으로 카페를 표시합니다. 정확한 위치를 사용하려면 위치 권한을 허용해주세요.
                      </p>
                      <button
                        onClick={retryGeolocation}
                        className="text-xs bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1.5 rounded transition-colors"
                      >
                        위치 다시 요청
                      </button>
                    </div>
                    <button
                      onClick={() => setShowGeoError(false)}
                      className="ml-4 text-yellow-600 hover:text-yellow-800 text-lg leading-none"
                      aria-label="닫기"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* 카페 로딩 오버레이 */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">카페 정보를 불러오는 중...</p>
                  </div>
                </div>
              )}

              {/* 카페 에러 오버레이 */}
              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                  <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-md">
                    <p className="text-red-600">{error}</p>
                  </div>
                </div>
              )}

              {/* 지도 표시 (react-leaflet은 API 키 불필요) */}
              {center && (
                <MapContainer cafes={cafes} onMarkerClick={handleMarkerClick} />
              )}
            </>
          )}
        </div>

        {/* 하단 카페 카드 */}
        {selectedCafe && (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <CafeCard cafe={selectedCafe} />
          </div>
        )}
      </main>
    </>
  );
}

