import { defineField, defineType } from 'sanity'

export const weeklyPrayer = defineType({
    name: 'weeklyPrayer',
    title: 'Weekly Prayer (주간기도문)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title (제목)',
            type: 'string',
            description: '예: 2024년 6월 둘째 주 기도문',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'weekStartDate',
            title: 'Week Start Date (주간 시작일)',
            type: 'date',
            description: '주간 기도문의 시작 날짜 (일요일)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'weekEndDate',
            title: 'Week End Date (주간 종료일)',
            type: 'date',
            description: '주간 기도문의 종료 날짜 (토요일)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug (URL 주소)',
            type: 'slug',
            description: '자동 생성되는 URL 주소 (예: 2024-w24)',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'communityConfession',
            title: 'Community Confession (공동체 고백)',
            type: 'text',
            rows: 10,
            description: '주간 기도문 서두의 공동체 고백 내용',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'dailyPrayers',
            title: 'Daily Prayers (일별 기도제목)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'date',
                            title: 'Date (날짜)',
                            type: 'date',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'dayOfWeek',
                            title: 'Day of Week (요일)',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '일요일', value: '일' },
                                    { title: '월요일', value: '월' },
                                    { title: '화요일', value: '화' },
                                    { title: '수요일', value: '수' },
                                    { title: '목요일', value: '목' },
                                    { title: '금요일', value: '금' },
                                    { title: '토요일', value: '토' },
                                ],
                                layout: 'dropdown',
                            },
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'theme',
                            title: 'Theme (주제)',
                            type: 'string',
                            description: '예: 환우, 교회, 군선교 등',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'prayerTopic1',
                            title: 'Prayer Topic 1 (기도제목 1) *',
                            type: 'text',
                            rows: 2,
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'prayerTopic2',
                            title: 'Prayer Topic 2 (기도제목 2)',
                            type: 'text',
                            rows: 2,
                            description: '선택사항',
                        }),
                        defineField({
                            name: 'prayerTopic3',
                            title: 'Prayer Topic 3 (기도제목 3)',
                            type: 'text',
                            rows: 2,
                            description: '선택사항',
                        }),
                    ],
                    preview: {
                        select: {
                            date: 'date',
                            dayOfWeek: 'dayOfWeek',
                            theme: 'theme',
                        },
                        prepare({ date, dayOfWeek, theme }) {
                            return {
                                title: `${date ? new Date(date).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' }) : ''} (${dayOfWeek})`,
                                subtitle: theme,
                            }
                        },
                    },
                },
            ],
            validation: (Rule) => Rule.required().length(7).error('7일간의 기도제목을 모두 입력해주세요.'),
        }),
        defineField({
            name: 'isPublished',
            title: 'Published (공개 여부)',
            type: 'boolean',
            description: '체크하면 성도들에게 공개됩니다.',
            initialValue: false,
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At (공개 일시)',
            type: 'datetime',
            description: '공개된 날짜와 시간',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            weekStartDate: 'weekStartDate',
            isPublished: 'isPublished',
        },
        prepare({ title, weekStartDate, isPublished }) {
            return {
                title,
                subtitle: `${weekStartDate ? new Date(weekStartDate).toLocaleDateString('ko-KR') : ''} | ${isPublished ? '✅ 공개' : '📝 비공개'}`,
            }
        },
    },
    orderings: [
        {
            title: 'Week Start Date, New to Old',
            name: 'weekStartDateDesc',
            by: [{ field: 'weekStartDate', direction: 'desc' }],
        },
        {
            title: 'Week Start Date, Old to New',
            name: 'weekStartDateAsc',
            by: [{ field: 'weekStartDate', direction: 'asc' }],
        },
    ],
})
