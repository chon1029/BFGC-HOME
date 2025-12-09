export interface Sermon {
    _id: string
    title: string
    preacher: string
    date: string
    scripture: string
    videoUrl: string
    category: 'sunday' | 'friday' | 'special'
    body?: any // Sanity Portable Text
}
