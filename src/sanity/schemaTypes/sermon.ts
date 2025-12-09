import { defineField, defineType } from 'sanity'

export const sermon = defineType({
    name: 'sermon',
    title: 'Sermon (설교)',
    type: 'document',
    fields: [
        defineField({
            name: 'scripture',
            title: 'Scripture (본문)',
            type: 'string',
            description: '예: 요한복음 3:16',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Title (제목)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'preacher',
            title: 'Preacher (설교자)',
            type: 'string',
            initialValue: '전근일 담임목사',
            options: {
                list: [
                    { title: '전근일 담임목사', value: '전근일 담임목사' },
                    { title: '초청 강사', value: '초청 강사' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date (날짜)',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'videoUrl',
            title: 'YouTube Link (유튜브 링크)',
            type: 'url',
            description: '유튜브 영상 주소를 입력하세요. (썸네일 자동 생성)',
            validation: (Rule) => Rule.required().uri({ scheme: ['http', 'https'] }),
        }),
        defineField({
            name: 'body',
            title: 'Sermon Note (설교 노트)',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'category',
            title: 'Category (카테고리)',
            type: 'string',
            options: {
                list: [
                    { title: '주일예배', value: 'sunday' },
                    { title: '금요예배', value: 'friday' },
                    { title: '특별성회', value: 'special' },
                ],
                layout: 'radio',
            },
            initialValue: 'sunday',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'preacher',
            date: 'date',
        },
        prepare({ title, subtitle, date }) {
            return {
                title,
                subtitle: `${subtitle} | ${date ? new Date(date).toLocaleDateString() : ''}`,
            }
        },
    },
})
