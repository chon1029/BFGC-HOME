import { GalleryItem } from '@/types/gallery'

export const MOCK_GALLERY_ITEMS: GalleryItem[] = [
    {
        _id: '1',
        title: '2024 부활절 연합예배',
        category: '예배',
        date: '2024-03-31',
        thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop'
        ],
        description: '부활의 기쁨을 함께 나눈 2024년 부활절 연합예배 현장입니다.'
    },
    {
        _id: '2',
        title: '청년부 봄 수련회',
        category: '다음세대',
        date: '2024-03-15',
        thumbnail: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop'
        ],
        description: '자연 속에서 하나님을 깊이 만난 청년부 봄 수련회'
    },
    {
        _id: '3',
        title: '전교인 야외예배 사전답사',
        category: '행사',
        date: '2024-03-10',
        thumbnail: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=1200&auto=format&fit=crop'
        ],
        description: '5월 전교인 야외예배를 위한 마르기트 섬 사전답사'
    },
    {
        _id: '4',
        title: '새가족 환영회',
        category: '친교',
        date: '2024-03-03',
        thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop'
        ],
        description: '새로 오신 분들을 환영하며 함께 식탁 교제를 나누었습니다.'
    },
    {
        _id: '5',
        title: '헝가리 난민 사역',
        category: '선교',
        date: '2024-02-20',
        thumbnail: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1200&auto=format&fit=crop'
        ],
        description: '우크라이나 난민들을 위한 구호 물품 전달 사역'
    }
]
