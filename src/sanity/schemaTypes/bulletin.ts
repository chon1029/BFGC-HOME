import { defineField, defineType } from 'sanity'

export const bulletin = defineType({
    name: 'bulletin',
    title: '주보',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: '제목',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: '날짜',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'volume',
            title: '권/호',
            type: 'string',
            description: '예: 제 32권 13호',
        }),
        defineField({
            name: 'pdfFile',
            title: '주보 PDF 파일',
            type: 'file',
            options: {
                accept: '.pdf',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'thumbnail',
            title: '썸네일 이미지',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: '주보 1면 이미지 (목록 표시용)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sermonTitle',
            title: '설교 제목',
            type: 'string',
        }),
        defineField({
            name: 'preacher',
            title: '설교자',
            type: 'string',
        }),
        defineField({
            name: 'scripture',
            title: '성경 본문',
            type: 'string',
        }),
        defineField({
            name: 'publishedAt',
            title: '작성일',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'date',
            media: 'thumbnail',
        },
    },
    orderings: [
        {
            title: '날짜 내림차순',
            name: 'dateDesc',
            by: [
                { field: 'date', direction: 'desc' }
            ]
        }
    ]
})
