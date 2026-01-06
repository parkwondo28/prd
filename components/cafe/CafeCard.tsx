'use client';

import { useRouter } from 'next/navigation';
import type { Cafe } from '@/lib/types/cafe';
import { formatDistance } from '@/lib/utils/distance';
import { formatNoiseLevel } from '@/lib/utils/format';

interface CafeCardProps {
  cafe: Cafe;
}

export default function CafeCard({ cafe }: CafeCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/cafe/${cafe.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-t-lg shadow-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{cafe.name}</h3>
          <p className="text-sm text-gray-600">{cafe.address}</p>
        </div>
        {cafe.isHiddenGem && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
            숨은 명소
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        {cafe.distance !== undefined && (
          <span className="flex items-center gap-1">
            <span>📍</span>
            <span>{formatDistance(cafe.distance)}</span>
          </span>
        )}
        {cafe.currentNoise && (
          <span className="flex items-center gap-1">
            <span>🔇</span>
            <span>{formatNoiseLevel(cafe.currentNoise)}</span>
          </span>
        )}
        <span className="flex items-center gap-1">
          <span>⚡</span>
          <span>콘센트 {cafe.outlets}개</span>
        </span>
      </div>

      {cafe.lastUpdated && (
        <p className="text-xs text-gray-400 mt-2">
          마지막 업데이트: {new Date(cafe.lastUpdated).toLocaleString('ko-KR')}
        </p>
      )}
    </div>
  );
}

