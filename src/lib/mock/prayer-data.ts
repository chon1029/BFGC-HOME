import { WeeklyPrayer } from '@/types/prayer'

export const MOCK_WEEKLY_PRAYERS: WeeklyPrayer[] = [
    {
        _id: '1',
        title: '4월 첫째 주 주간기도문',
        weekStartDate: '2024-04-01',
        weekEndDate: '2024-04-06',
        slug: { current: '2024-04-01' },
        communityConfession: '사랑의 하나님, 부활의 기쁨을 안고 새로운 한 주를 시작합니다. 우리의 삶이 주님의 생명으로 충만하게 하시고, 만나는 모든 사람들에게 부활의 소망을 전하는 증인이 되게 하옵소서.',
        dailyPrayers: [
            {
                date: '2024-04-01',
                dayOfWeek: '월',
                theme: '새로운 시작',
                prayerTopic1: '부활의 능력으로 한 주를 힘차게 시작하게 하소서',
                prayerTopic2: '직장과 가정에서 빛과 소금의 역할을 감당하게 하소서',
                prayerTopic3: '만나는 모든 이들에게 그리스도의 향기를 전하게 하소서'
            },
            {
                date: '2024-04-02',
                dayOfWeek: '화',
                theme: '나라와 민족',
                prayerTopic1: '이 땅에 하나님의 정의와 평화가 임하게 하소서',
                prayerTopic2: '위정자들에게 지혜를 주사 올바른 정치를 하게 하소서',
                prayerTopic3: '경제적인 어려움 속에 있는 이웃들을 돌보아 주옵소서'
            },
            {
                date: '2024-04-03',
                dayOfWeek: '수',
                theme: '교회와 선교',
                prayerTopic1: '우리 교회가 지역 사회를 섬기는 구원의 방주가 되게 하소서',
                prayerTopic2: '파송된 선교사님들의 사역 위에 성령의 기름 부으심이 있게 하소서',
                prayerTopic3: '다음 세대를 믿음의 용사로 세워주옵소서'
            },
            {
                date: '2024-04-04',
                dayOfWeek: '목',
                theme: '가정과 자녀',
                prayerTopic1: '우리 가정이 작은 천국이 되게 하소서',
                prayerTopic2: '부부 간에 사랑과 존중이 넘치게 하소서',
                prayerTopic3: '자녀들이 하나님의 지혜로 자라나게 하소서'
            },
            {
                date: '2024-04-05',
                dayOfWeek: '금',
                theme: '환우와 약자',
                prayerTopic1: '육체의 질병으로 고통받는 환우들을 치유하여 주옵소서',
                prayerTopic2: '마음의 상처로 아파하는 이들을 위로하여 주옵소서',
                prayerTopic3: '소외된 이웃들에게 주님의 사랑이 흘러가게 하소서'
            },
            {
                date: '2024-04-06',
                dayOfWeek: '토',
                theme: '예배 준비',
                prayerTopic1: '내일 드릴 주일 예배를 기도로 준비하게 하소서',
                prayerTopic2: '말씀 전하실 목사님에게 성령의 능력을 더하여 주옵소서',
                prayerTopic3: '예배를 돕는 손길들 위에 축복하여 주옵소서'
            }
        ]
    },
    {
        _id: '2',
        title: '3월 다섯째 주 주간기도문',
        weekStartDate: '2024-03-25',
        weekEndDate: '2024-03-30',
        slug: { current: '2024-03-25' },
        communityConfession: '고난 주간을 보내며 십자가의 사랑을 깊이 묵상합니다. 나를 위해 물과 피를 다 쏟으신 주님의 사랑에 감사하며, 나도 주님을 위해 십자가를 지고 따르는 제자가 되게 하옵소서.',
        dailyPrayers: [
            {
                date: '2024-03-25',
                dayOfWeek: '월',
                theme: '고난 주간',
                prayerTopic1: '십자가의 고난을 깊이 묵상하는 한 주가 되게 하소서',
                prayerTopic2: '나의 죄를 회개하며 정결한 마음을 주옵소서',
                prayerTopic3: '주님의 고난에 동참하는 믿음을 주옵소서'
            },
            // ... (생략)
            {
                date: '2024-03-30',
                dayOfWeek: '토',
                theme: '부활 준비',
                prayerTopic1: '무덤 속에 계신 주님을 생각하며 침묵하게 하소서',
                prayerTopic2: '부활의 아침을 소망하며 기다리게 하소서',
                prayerTopic3: '부활절 예배를 기쁨으로 준비하게 하소서'
            }
        ]
    }
]
