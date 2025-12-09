import { defineField, defineType } from 'sanity'

export const discipleshipApplication = defineType({
    name: 'discipleshipApplication',
    title: 'Discipleship Applications (제자훈련 신청)',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name (이름)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone (연락처)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email (이메일)',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'course',
            title: 'Course (신청 과정)',
            type: 'string',
            options: {
                list: [
                    { title: '성장반 (12주)', value: 'foundation' },
                    { title: '제자반 (24주)', value: 'discipleship' },
                    { title: '사역자반 (36주)', value: 'leadership' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'motivation',
            title: 'Motivation (신청 동기)',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'submittedAt',
            title: 'Submitted At (신청일)',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'status',
            title: 'Status (처리 상태)',
            type: 'string',
            options: {
                list: [
                    { title: '대기 중', value: 'pending' },
                    { title: '연락 완료', value: 'contacted' },
                    { title: '승인', value: 'approved' },
                    { title: '거절', value: 'rejected' },
                ],
            },
            initialValue: 'pending',
        }),
    ],
    preview: {
        select: {
            name: 'name',
            course: 'course',
            date: 'submittedAt',
        },
        prepare({ name, course, date }) {
            const courseNames: Record<string, string> = {
                foundation: '성장반',
                discipleship: '제자반',
                leadership: '사역자반',
            }
            return {
                title: name,
                subtitle: `${courseNames[course] || course} | ${date ? new Date(date).toLocaleDateString() : ''}`,
            }
        },
    },
})
