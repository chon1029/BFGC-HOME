export interface Sermon {
    id: string
    title: string
    preacher: string
    date: string
    thumbnail: string
    videoId: string
    scripture?: string
}

export const MOCK_SERMONS: Sermon[] = [
    {
        id: '1',
        title: '믿음으로 승리하는 삶',
        preacher: '김목사 담임목사',
        date: '2023.12.03',
        thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop',
        videoId: '72T3JqNmaJ8', // 실제 유튜브 ID 예시
        scripture: '히브리서 11:1-6'
    },
    {
        id: '2',
        title: '하나님의 사랑을 전하는 교회',
        preacher: '김목사 담임목사',
        date: '2023.11.26',
        thumbnail: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop',
        videoId: 'M7lc1UVf-VE',
        scripture: '요한일서 4:7-12'
    },
    {
        id: '3',
        title: '감사함으로 나아가라',
        preacher: '김목사 담임목사',
        date: '2023.11.19',
        thumbnail: 'https://images.unsplash.com/photo-1445445290350-16a368622b55?q=80&w=800&auto=format&fit=crop',
        videoId: 'ysz5S6PUM-U',
        scripture: '시편 100:1-5'
    },
    {
        id: '4',
        title: '기도의 능력',
        preacher: '김목사 담임목사',
        date: '2023.11.12',
        thumbnail: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800&auto=format&fit=crop',
        videoId: 'jNQXAC9IVRw',
        scripture: '야고보서 5:13-18'
    },
    {
        id: '5',
        title: '성령의 열매를 맺는 삶',
        preacher: '이전도사',
        date: '2023.11.05',
        thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop',
        videoId: 'lJIrF4YjHfQ',
        scripture: '갈라디아서 5:22-23'
    },
    {
        id: '6',
        title: '광야에서 만나는 하나님',
        preacher: '박선교사',
        date: '2023.10.29',
        thumbnail: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=800&auto=format&fit=crop',
        videoId: '9bZkp7q19f0',
        scripture: '출애굽기 16:1-12'
    },
    {
        id: '7',
        title: '참된 예배자',
        preacher: '김목사 담임목사',
        date: '2023.10.22',
        thumbnail: 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?q=80&w=800&auto=format&fit=crop',
        videoId: 'aqz-KE-bpKQ',
        scripture: '요한복음 4:23-24'
    },
    {
        id: '8',
        title: '십자가의 길',
        preacher: '김목사 담임목사',
        date: '2023.10.15',
        thumbnail: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=800&auto=format&fit=crop',
        videoId: 'fJ9rUzIMcZQ',
        scripture: '마가복음 8:34-38'
    }
]
