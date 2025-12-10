import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// 서버 사이드 Sanity 클라이언트 (쓰기 권한 토큰 포함)
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // .env에 설정된 쓰기 권한 토큰
    useCdn: false,
})

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // 클라이언트에서 보낸 데이터 받기
        const {
            title,
            slug,
            weekStartDate,
            weekEndDate,
            communityConfession,
            dailyPrayers,
            isPublished
        } = body

        // Sanity에 저장할 문서 객체 생성
        const doc = {
            _type: 'weeklyPrayer',
            title,
            slug: {
                _type: 'slug',
                current: slug,
            },
            weekStartDate,
            weekEndDate,
            communityConfession,
            dailyPrayers,
            isPublished,
            publishedAt: isPublished ? new Date().toISOString() : undefined,
        }

        // 데이터 생성 요청
        const result = await client.create(doc)

        return NextResponse.json({ message: 'Success', result }, { status: 200 })
    } catch (error) {
        console.error('Error creating weekly prayer:', error)
        return NextResponse.json(
            { message: 'Error creating weekly prayer', error: String(error) },
            { status: 500 }
        )
    }
}
