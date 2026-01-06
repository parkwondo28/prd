'use client';

import { useRouter } from 'next/navigation';
import type { Cafe } from '@/lib/types/cafe';
import { formatDistance } from '@/lib/utils/distance';
import { formatNoiseLevel, formatCrowdLevel } from '@/lib/utils/format';

interface CafeListProps {
  cafes: Cafe[];
}

export default function CafeList({ cafes }: CafeListProps) {
  const router = useRouter();

  const handleCafeClick = (cafe: Cafe) => {
    router.push(`/cafe/${cafe.id}`);
  };

  return (
    <div className="w-full h-full bg-gray-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4">
        {/* 헤더 */}
        <div className="mb-6 pt-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">주변 카페</h1>
          <p className="text-sm text-gray-600">
            총 {cafes.length}개의 카페를 찾았습니다
          </p>
        </div>

        {/* 카페 리스트 */}
        <div className="space-y-4">
          {cafes.map((cafe) => (
            <div
              key={cafe.id}
              onClick={() => handleCafeClick(cafe)}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {cafe.name}
                    </h3>
                    {cafe.isHiddenGem && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
                        숨은 명소
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{cafe.address}</p>
                </div>
              </div>

              {/* 정보 아이콘들 */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                {cafe.distance !== undefined && (
                  <div className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{formatDistance(cafe.distance)}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span>⚡</span>
                  <span>콘센트 {cafe.outlets}개</span>
                </div>
                {cafe.currentNoise && (
                  <div className="flex items-center gap-1">
                    <span>🔇</span>
                    <span>{formatNoiseLevel(cafe.currentNoise)}</span>
                  </div>
                )}
                {cafe.currentCrowd && (
                  <div className="flex items-center gap-1">
                    <span>👥</span>
                    <span>{formatCrowdLevel(cafe.currentCrowd)}</span>
                  </div>
                )}
              </div>

              {/* 작업 환경 정보 */}
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  소음: {formatNoiseLevel(cafe.noiseLevel)}
                </span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                  의자: {cafe.chairComfort === 'comfortable' ? '편안함' : cafe.chairComfort === 'moderate' ? '보통' : '딱딱함'}
                </span>
                <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded">
                  와이파이: {cafe.wifiSpeed === 'fast' ? '빠름' : cafe.wifiSpeed === 'moderate' ? '보통' : '느림'}
                </span>
              </div>

              {cafe.lastUpdated && (
                <p className="text-xs text-gray-400 mt-2">
                  마지막 업데이트: {new Date(cafe.lastUpdated).toLocaleString('ko-KR')}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* API 키 안내 */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 font-medium mb-2">
            💡 지도를 보려면 카카오맵 API 키가 필요합니다
          </p>
          <p className="text-xs text-blue-700 mb-2">
            카카오 개발자 콘솔에서 JavaScript 키를 발급받아 .env.local 파일에 설정하세요.
          </p>
          <div className="text-xs text-blue-600 bg-white p-2 rounded font-mono">
            NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_api_key
          </div>
        </div>
      </div>
    </div>
  );
}

