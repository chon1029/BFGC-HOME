'use client'

import { useEffect, useState } from 'react'
import { client } from '@/lib/sanity'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye, Calendar, CheckCircle2, XCircle } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface WeeklyPrayer {
    _id: string
    title: string
    weekStartDate: string
    weekEndDate: string
    slug: {
        current: string
    }
    isPublished: boolean
    publishedAt?: string
    _createdAt: string
}

export default function AdminWeeklyPrayerPage() {
    const [prayers, setPrayers] = useState<WeeklyPrayer[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPrayers()
    }, [])

    const fetchPrayers = async () => {
        try {
            const data = await client.fetch(`
                *[_type == "weeklyPrayer"] | order(weekStartDate desc) {
                    _id,
                    title,
                    weekStartDate,
                    weekEndDate,
                    slug,
                    isPublished,
                    publishedAt,
                    _createdAt
                }
            `)
            setPrayers(data)
        } catch (error) {
            console.error('Failed to fetch prayers:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('정말 삭제하시겠습니까?')) return

        try {
            await client.delete(id)
            setPrayers(prayers.filter(p => p._id !== id))
        } catch (error) {
            console.error('Failed to delete:', error)
            alert('삭제에 실패했습니다.')
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
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                        주간기도문 관리
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                        성도들을 위한 주간 기도제목을 관리합니다
                    </p>
                </div>
                <Link href="/admin/weekly-prayer/create">
                    <Button className="bg-sky-600 hover:bg-sky-700">
                        <Plus className="mr-2 h-4 w-4" />
                        새 주간기도문 작성
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">전체 기도문</CardTitle>
                        <Calendar className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{prayers.length}개</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">공개됨</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {prayers.filter(p => p.isPublished).length}개
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">비공개</CardTitle>
                        <XCircle className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {prayers.filter(p => !p.isPublished).length}개
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Prayer List */}
            {prayers.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Calendar className="h-16 w-16 text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            아직 주간기도문이 없습니다
                        </h3>
                        <p className="text-slate-600 mb-4">
                            첫 번째 주간기도문을 작성해보세요
                        </p>
                        <Link href="/admin/weekly-prayer/create">
                            <Button className="bg-sky-600 hover:bg-sky-700">
                                <Plus className="mr-2 h-4 w-4" />
                                새 주간기도문 작성
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {prayers.map((prayer) => (
                        <Card key={prayer._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CardTitle className="text-xl">
                                                {prayer.title}
                                            </CardTitle>
                                            {prayer.isPublished ? (
                                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                    <CheckCircle2 className="mr-1 h-3 w-3" />
                                                    공개
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="border-orange-300 text-orange-700">
                                                    <XCircle className="mr-1 h-3 w-3" />
                                                    비공개
                                                </Badge>
                                            )}
                                        </div>
                                        <CardDescription className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {format(new Date(prayer.weekStartDate), 'yyyy.MM.dd', { locale: ko })} - {format(new Date(prayer.weekEndDate), 'MM.dd', { locale: ko })}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                작성일: {format(new Date(prayer._createdAt), 'yyyy.MM.dd', { locale: ko })}
                                            </span>
                                        </CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/life/weekly-prayer/${prayer.slug.current}`} target="_blank">
                                            <Button variant="outline" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/weekly-prayer/edit/${prayer._id}`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(prayer._id)}
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
