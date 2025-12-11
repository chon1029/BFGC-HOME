export interface DailyBread {
    _id: string
    book: string
    chapterVerse: string
    title: string
    keyVerse?: string
    content?: string // Mock Data용 (Sanity 연동 시 body 사용)
    body?: any
    suggestion?: string
    prayer?: string
    author: string
    date: string
}
