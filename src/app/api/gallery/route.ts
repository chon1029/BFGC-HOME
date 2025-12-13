import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export const dynamic = 'force-dynamic' // 캐싱 방지: 항상 최신 데이터 조회

const getClient = () => createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xmm3fjwr',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // 쓰기 권한 토큰
    useCdn: false,
})

export async function GET() {
    try {
        const client = getClient()
        const query = `*[_type == "gallery"] | order(date desc) {
            _id,
            title,
            category,
            date,
            description,
            "thumbnail": thumbnail.asset->url,
            "images": images[].asset->url
        }`
        const galleries = await client.fetch(query)
        return NextResponse.json(galleries)
    } catch (error) {
        console.error('Gallery fetch error:', error)
        return NextResponse.json({ message: 'Failed to fetch' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        const title = formData.get('title') as string
        const category = formData.get('category') as string
        const date = formData.get('date') as string
        const description = formData.get('description') as string
        const thumbnailFile = formData.get('thumbnail') as File
        const imageFiles = formData.getAll('images') as File[]

        if (!title || !category || !date || !thumbnailFile) {
            return NextResponse.json({ message: '필수 항목이 누락되었습니다.' }, { status: 400 })
        }

        // 1. 썸네일 업로드
        const client = getClient()
        const thumbnailAsset = await client.assets.upload('image', thumbnailFile, {
            filename: thumbnailFile.name,
        })

        // 2. 추가 이미지들 업로드 (병렬 처리)
        const imageAssets = await Promise.all(
            imageFiles.map(async (file) => {
                const asset = await client.assets.upload('image', file, {
                    filename: file.name,
                })
                return {
                    _key: asset._id, // 고유 키 필요
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: asset._id,
                    },
                }
            })
        )

        // 3. 문서 생성
        const doc = {
            _type: 'gallery',
            title,
            category,
            date,
            description,
            thumbnail: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: thumbnailAsset._id,
                },
            },
            images: imageAssets,
            publishedAt: new Date().toISOString(),
        }

        const result = await client.create(doc)

        return NextResponse.json({ message: 'Success', result }, { status: 200 })
    } catch (error) {
        console.error('Gallery upload error:', error)
        return NextResponse.json(
            { message: 'Upload failed', error: String(error) },
            { status: 500 }
        )
    }
}
