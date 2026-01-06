import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '포커스팟 - 작업하기 좋은 카페 찾기',
  description: '집중하기 좋은 카페를 찾아보세요. 실시간 소음도와 혼잡도 정보를 확인할 수 있습니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}

