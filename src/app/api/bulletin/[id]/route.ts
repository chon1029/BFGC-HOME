import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

export const dynamic = 'force-dynamic' // 캐싱 방지

const getClient = () => createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xmm3fjwr',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
})

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const formData = await request.formData()

        const title = formData.get('title') as string
        const date = formData.get('date') as string
        const volume = formData.get('volume') as string
        const sermonTitle = formData.get('sermonTitle') as string
        const preacher = formData.get('preacher') as string
        const scripture = formData.get('scripture') as string

        const thumbnailFile = formData.get('thumbnail') as File | null
        const pdfFile = formData.get('pdfFile') as File | null

        const updates: any = {
            title,
            date,
            volume,
            sermonTitle,
            preacher,
            scripture,
        }

        // 1. 썸네일 변경 시 업로드 및 레퍼런스 업데이트
        if (thumbnailFile && thumbnailFile.size > 0) {
            const client = getClient()
            const thumbnailAsset = await client.assets.upload('image', thumbnailFile, {
                filename: thumbnailFile.name,
            })
            updates.thumbnail = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: thumbnailAsset._id,
                },
            }
        }

        // 2. PDF 변경 시 업로드 및 레퍼런스 업데이트
        if (pdfFile && pdfFile.size > 0) {
            const client = getClient()
            const pdfAsset = await client.assets.upload('file', pdfFile, {
                filename: pdfFile.name,
            })
            updates.pdfFile = {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: pdfAsset._id,
                },
            }
        }

        const client = getClient()
        const result = await client.patch(id).set(updates).commit()

        return NextResponse.json({ message: 'Bulletin updated successfully', result }, { status: 200 })
    } catch (error) {
        console.error('Bulletin update error:', error)
        return NextResponse.json(
            { message: 'Failed to update bulletin', error: String(error) },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 })
        }

        const client = getClient()
        await client.delete(id)

        return NextResponse.json({ message: 'Bulletin deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Bulletin delete error:', error)
        return NextResponse.json(
            { message: 'Failed to delete bulletin', error: String(error) },
            { status: 500 }
        )
    }
}
