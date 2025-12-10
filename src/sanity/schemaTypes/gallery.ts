import { defineField, defineType } from 'sanity'

export const gallery = defineType({
    name: 'gallery',
    title: '사진게시판',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: '제목',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: '카테고리',
            type: 'string',
            options: {
                list: [
                    { title: '예배', value: '예배' },
                    { title: '친교', value: '친교' },
                    { title: '행사', value: '행사' },
                    { title: '다음세대', value: '다음세대' },
                    { title: '선교', value: '선교' },
                    { title: '기타', value: '기타' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: '날짜',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'thumbnail',
            title: '대표 이미지 (썸네일)',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'images',
            title: '추가 이미지들',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({
            name: 'description',
            title: '설명',
            type: 'text',
            rows: 3,
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
            subtitle: 'category',
            media: 'thumbnail',
        },
    },
})
