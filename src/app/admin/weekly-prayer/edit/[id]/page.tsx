'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { client } from '@/lib/sanity'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format, addDays } from 'date-fns'
import { ko } from 'date-fns/locale'

const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

interface DailyPrayer {
    date: string
    dayOfWeek: string
    theme: string
    prayerTopic1: string
    prayerTopic2: string
    prayerTopic3: string
}

export default function EditWeeklyPrayerPage() {
    const router = useRouter()
    const params = useParams()
    const id = params.id as string

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    // Form state
    const [title, setTitle] = useState('')
    const [weekStartDate, setWeekStartDate] = useState('')
    const [weekEndDate, setWeekEndDate] = useState('')
    const [communityConfession, setCommunityConfession] = useState('')
    const [dailyPrayers, setDailyPrayers] = useState<DailyPrayer[]>([])
    const [isPublished, setIsPublished] = useState(false)

    useEffect(() => {
        fetchPrayer()
    }, [id])

    const fetchPrayer = async () => {
        try {
            const data = await client.fetch(
                `*[_type == "weeklyPrayer" && _id == $id][0] {
                    title,
                    weekStartDate,
                    weekEndDate,
                    communityConfession,
                    dailyPrayers,
                    isPublished
                }`,
                { id }
            )

            if (data) {
                setTitle(data.title)
                setWeekStartDate(data.weekStartDate)
                setWeekEndDate(data.weekEndDate)
                setCommunityConfession(data.communityConfession)
                setDailyPrayers(data.dailyPrayers)
                setIsPublished(data.isPublished)
            }
        } catch (error) {
            console.error('Failed to fetch prayer:', error)
            alert('데이터를 불러오는데 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    const updateDailyPrayer = (index: number, field: keyof DailyPrayer, value: string) => {
        const updated = [...dailyPrayers]
        updated[index] = { ...updated[index], [field]: value }
        setDailyPrayers(updated)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            await client
                .patch(id)
                .set({
                    title,
                    weekStartDate,
                    weekEndDate,
                    communityConfession,
                    dailyPrayers,
                    isPublished,
                    publishedAt: isPublished ? new Date().toISOString() : undefined,
                })
                .commit()

            alert('주간기도문이 성공적으로 수정되었습니다!')
            router.push('/admin/weekly-prayer')
        } catch (error) {
            console.error('Failed to save:', error)
            alert('저장에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">로딩 중...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-6xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/weekly-prayer">
                    <Button variant="outline" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        목록으로
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        주간기도문 수정
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        주간기도문 내용을 수정합니다
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>기본 정보</CardTitle>
                        <CardDescription>주간기도문의 기본 정보를 수정하세요</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">제목 *</Label>
                            <Input
                                id="title"
                                placeholder="예: 2024년 6월 둘째 주 기도문"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="weekStartDate">주간 시작일 (일요일) *</Label>
                                <Input
                                    id="weekStartDate"
                                    type="date"
                                    value={weekStartDate}
                                    onChange={(e) => setWeekStartDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="weekEndDate">주간 종료일 (토요일) *</Label>
                                <Input
                                    id="weekEndDate"
                                    type="date"
                                    value={weekEndDate}
                                    onChange={(e) => setWeekEndDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Community Confession */}
                <Card>
                    <CardHeader>
                        <CardTitle>공동체 고백</CardTitle>
                        <CardDescription>주간기도문 서두의 공동체 고백 내용을 수정하세요</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            placeholder="예: 온 세상의 통치자이신 하나님 아버지, 사랑과 권능의 크신 팔로 주의 백성을 지키고 보호하심에 감사드립니다..."
                            value={communityConfession}
                            onChange={(e) => setCommunityConfession(e.target.value)}
                            rows={8}
                            required
                            className="resize-none"
                        />
                    </CardContent>
                </Card>

                {/* Daily Prayers */}
                {dailyPrayers.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>일별 기도제목</CardTitle>
                            <CardDescription>7일간의 기도제목을 수정하세요</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {dailyPrayers.map((prayer, index) => (
                                <div key={index} className="border-l-4 border-sky-500 pl-4 space-y-3">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="h-4 w-4 text-sky-600" />
                                        <h3 className="font-semibold text-lg">
                                            {format(new Date(prayer.date), 'M월 d일', { locale: ko })} ({prayer.dayOfWeek})
                                        </h3>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`theme-${index}`}>주제 *</Label>
                                        <Input
                                            id={`theme-${index}`}
                                            placeholder="예: 환우, 교회, 군선교 등"
                                            value={prayer.theme}
                                            onChange={(e) => updateDailyPrayer(index, 'theme', e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`topic1-${index}`}>기도제목 1 *</Label>
                                        <Textarea
                                            id={`topic1-${index}`}
                                            placeholder="첫 번째 기도제목을 입력하세요"
                                            value={prayer.prayerTopic1}
                                            onChange={(e) => updateDailyPrayer(index, 'prayerTopic1', e.target.value)}
                                            rows={2}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`topic2-${index}`}>기도제목 2 (선택사항)</Label>
                                        <Textarea
                                            id={`topic2-${index}`}
                                            placeholder="두 번째 기도제목을 입력하세요 (선택사항)"
                                            value={prayer.prayerTopic2}
                                            onChange={(e) => updateDailyPrayer(index, 'prayerTopic2', e.target.value)}
                                            rows={2}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`topic3-${index}`}>기도제목 3 (선택사항)</Label>
                                        <Textarea
                                            id={`topic3-${index}`}
                                            placeholder="세 번째 기도제목을 입력하세요 (선택사항)"
                                            value={prayer.prayerTopic3}
                                            onChange={(e) => updateDailyPrayer(index, 'prayerTopic3', e.target.value)}
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )}

                {/* Publish Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle>공개 설정</CardTitle>
                        <CardDescription>성도들에게 공개할지 선택하세요</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isPublished"
                                checked={isPublished}
                                onCheckedChange={setIsPublished}
                            />
                            <Label htmlFor="isPublished" className="cursor-pointer">
                                {isPublished ? '✅ 공개 (성도들이 볼 수 있습니다)' : '📝 비공개 (관리자만 볼 수 있습니다)'}
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end gap-2">
                    <Link href="/admin/weekly-prayer">
                        <Button type="button" variant="outline">
                            취소
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={saving}
                        className="bg-sky-600 hover:bg-sky-700"
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {saving ? '저장 중...' : '수정 완료'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
