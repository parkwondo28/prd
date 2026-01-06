import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 "X분 전", "X시간 전" 형식으로 포맷팅
 */
export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
}

/**
 * 소음 수준을 한글로 변환
 */
export function formatNoiseLevel(level: 'quiet' | 'moderate' | 'loud'): string {
  const map = {
    quiet: '조용함',
    moderate: '보통',
    loud: '시끄러움',
  };
  return map[level];
}

/**
 * 혼잡도를 한글로 변환
 */
export function formatCrowdLevel(
  level: 'empty' | 'moderate' | 'crowded'
): string {
  const map = {
    empty: '한산함',
    moderate: '보통',
    crowded: '혼잡함',
  };
  return map[level];
}

/**
 * 의자 편안함을 한글로 변환
 */
export function formatChairComfort(
  level: 'hard' | 'moderate' | 'comfortable'
): string {
  const map = {
    hard: '딱딱함',
    moderate: '보통',
    comfortable: '편안함',
  };
  return map[level];
}

