import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '@/lib/types/api';
import type { StatusUpdateRequest } from '@/lib/types/api';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cafeId = params.id;
    const body: StatusUpdateRequest = await request.json();

    // 실제로는 데이터베이스에 업데이트
    // 여기서는 성공 응답만 반환
    console.log(`카페 ${cafeId} 상태 업데이트:`, {
      noiseLevel: body.noiseLevel,
      crowdLevel: body.crowdLevel,
    });

    const response: ApiResponse<void> = {
      success: true,
      message: '상태가 업데이트되었습니다.',
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<void> = {
      success: false,
      error: error instanceof Error ? error.message : '상태 업데이트에 실패했습니다.',
    };

    return NextResponse.json(response, { status: 500 });
  }
}

