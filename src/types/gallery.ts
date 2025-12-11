export interface GalleryItem {
    _id: string
    title: string
    category: string
    date: string
    thumbnail: string // URL string for mock
    images: string[] // URL strings for mock
    description?: string
}
