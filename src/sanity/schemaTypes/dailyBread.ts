import { defineField, defineType } from 'sanity'
import { BIBLE_BOOKS } from '../../lib/bible-data'

export const dailyBread = defineType({
    name: 'dailyBread',
    title: 'Daily Bread (일용할 양식)',
    type: 'document',
    fields: [
        defineField({
            name: 'book',
            title: 'Bible Book (성경)',
            type: 'string',
            options: {
                list: BIBLE_BOOKS.map(b => ({ title: b.name, value: b.name })),
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'chapterVerse',
            title: 'Chapter/Verse (장/절)',
            type: 'string',
            description: '예: 1:1-10',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'title',
            title: 'Title (제목)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'keyVerse',
            title: 'Key Verse (요절)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'body',
            title: 'Body (본문해설)',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'suggestion',
            title: 'Suggestion (묵상을 위한 제언)',
            type: 'text',
            rows: 4,
        }),
        defineField({
            name: 'prayer',
            title: 'Prayer (함께 기도해요)',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'author',
            title: 'Author (작성자)',
            type: 'string',
            initialValue: '관리자',
        }),
        defineField({
            name: 'date',
            title: 'Date (등록일)',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            book: 'book',
            chapterVerse: 'chapterVerse',
            date: 'date',
        },
        prepare({ title, book, chapterVerse, date }) {
            return {
                title,
                subtitle: `${book} ${chapterVerse} | ${date ? new Date(date).toLocaleDateString() : ''}`,
            }
        },
    },
})
