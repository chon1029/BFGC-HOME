import { Bulletin } from '@/types/bulletin'

export const MOCK_BULLETINS: Bulletin[] = [
    {
        _id: '1',
        title: '2024년 4월 7일 주보',
        date: '2024-04-07',
        volume: 'Vol. 1234',
        thumbnail: '/images/placeholder-bulletin.jpg', // 실제 이미지가 없으므로 플레이스홀더 사용
        sermonTitle: '부활의 증인으로 산다는 것',
        preacher: '전근일 목사',
        scripture: '사도행전 1:8',
    },
    {
        _id: '2',
        title: '2024년 3월 31일 주보',
        date: '2024-03-31',
        volume: 'Vol. 1233',
        thumbnail: '/images/placeholder-bulletin.jpg',
        sermonTitle: '부활의 아침에',
        preacher: '전근일 목사',
        scripture: '마태복음 28:1-10',
    },
    {
        _id: '3',
        title: '2024년 3월 24일 주보',
        date: '2024-03-24',
        volume: 'Vol. 1232',
        thumbnail: '/images/placeholder-bulletin.jpg',
        sermonTitle: '종려주일의 의미',
        preacher: '전근일 목사',
        scripture: '마태복음 21:1-11',
    },
    {
        _id: '4',
        title: '2024년 3월 17일 주보',
        date: '2024-03-17',
        volume: 'Vol. 1231',
        thumbnail: '/images/placeholder-bulletin.jpg',
        sermonTitle: '십자가의 길',
        preacher: '전근일 목사',
        scripture: '마가복음 8:34',
    },
]
