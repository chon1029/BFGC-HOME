import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

const getClient = () => createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

export async function GET() {
    try {
        const query = `*[_type == "bulletin"] | order(date desc) {
            _id,
            title,
            date,
            volume,
            sermonTitle,
            preacher,
            scripture,
            "thumbnail": thumbnail.asset->url,
            "pdfFile": pdfFile.asset->url
        }`

        const client = getClient()
        const bulletins = await client.fetch(query)

        return NextResponse.json(bulletins)
    } catch (error) {
        console.error('Bulletin fetch error:', error)
        return NextResponse.json(
            { message: 'Failed to fetch bulletins', error: String(error) },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData()

        const title = formData.get('title') as string
        const date = formData.get('date') as string
        const volume = formData.get('volume') as string
        const sermonTitle = formData.get('sermonTitle') as string
        const preacher = formData.get('preacher') as string
        const scripture = formData.get('scripture') as string

        const thumbnailFile = formData.get('thumbnail') as File
        const pdfFile = formData.get('pdfFile') as File

        if (!title || !date || !thumbnailFile || !pdfFile) {
            return NextResponse.json({ message: '필수 항목이 누락되었습니다.' }, { status: 400 })
        }

        // 1. 썸네일 이미지 업로드
        const client = getClient()
        const thumbnailAsset = await client.assets.upload('image', thumbnailFile, {
            filename: thumbnailFile.name,
        })

        // 2. PDF 파일 업로드
        const pdfAsset = await client.assets.upload('file', pdfFile, {
            filename: pdfFile.name,
        })

        // 3. 문서 생성
        const doc = {
            _type: 'bulletin',
            title,
            date,
            volume,
            sermonTitle,
            preacher,
            scripture,
            thumbnail: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: thumbnailAsset._id,
                },
            },
            pdfFile: {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: pdfAsset._id,
                },
            },
            publishedAt: new Date().toISOString(),
        }

        const result = await client.create(doc)

        return NextResponse.json({ message: 'Success', result }, { status: 200 })
    } catch (error) {
        console.error('Bulletin upload error:', error)
        return NextResponse.json(
            { message: 'Upload failed', error: String(error) },
            { status: 500 }
        )
    }
}
