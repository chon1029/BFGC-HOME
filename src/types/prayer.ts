export interface DailyPrayer {
    date: string
    dayOfWeek: string
    theme: string
    prayerTopic1: string
    prayerTopic2: string
    prayerTopic3: string
}

export interface WeeklyPrayer {
    _id: string
    title: string
    weekStartDate: string
    weekEndDate: string
    slug: {
        current: string
    }
    communityConfession: string
    dailyPrayers: DailyPrayer[]
}
