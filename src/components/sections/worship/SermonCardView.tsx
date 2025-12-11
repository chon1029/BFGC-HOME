import Image from 'next/image'
import Link from 'next/link'
import { Play, Calendar, User, BookOpen } from 'lucide-react'
import { Sermon } from '@/types/sermon'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import SermonActionButtons from './SermonActionButtons'

interface SermonCardViewProps {
    sermons: Sermon[]
    isAdmin?: boolean
    onEdit?: (sermon: Sermon) => void
    onDelete?: (sermonId: string) => void
}

export default function SermonCardView({ sermons, isAdmin, onEdit, onDelete }: SermonCardViewProps) {
    // 유튜브 썸네일 추출 함수
    const getYoutubeThumbnail = (url: string) => {
        const videoId = url.split('v=')[1]?.split('&')[0]
        if (!videoId) return '/images/placeholder-sermon.jpg' // Fallback image
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    }

    const getCategoryLabel = (category: string) => {
        switch (category) {
            case 'sunday': return '주일예배'
            case 'friday': return '금요예배'
            case 'special': return '특별성회'
            default: return category
        }
    }

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'sunday': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
            case 'friday': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
            case 'special': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            default: return 'bg-slate-100 text-slate-700'
        }
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sermons.map((sermon) => (
                <Card key={sermon._id} className="group overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 relative">
                    {/* Admin Actions (Absolute Position) */}
                    {isAdmin && onEdit && onDelete && (
                        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-md shadow-sm backdrop-blur-sm">
                            <SermonActionButtons sermon={sermon} onEdit={onEdit} onDelete={onDelete} />
                        </div>
                    )}

                    {/* Link로 전체 카드 감싸기 */}
                    <Link href={`/worship/sermons/${sermon._id}`} className="block">
                        {/* Thumbnail */}
                        <div className="relative aspect-video overflow-hidden bg-slate-100">
                            <Image
                                src={getYoutubeThumbnail(sermon.videoUrl)}
                                alt={sermon.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                                    <Play className="w-5 h-5 text-slate-900 ml-1" fill="currentColor" />
                                </div>
                            </div>
                            <div className="absolute top-3 left-3">
                                <Badge className={getCategoryColor(sermon.category)}>
                                    {getCategoryLabel(sermon.category)}
                                </Badge>
                            </div>
                        </div>

                        {/* Content */}
                        <CardContent className="p-5">
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                                <span className="flex items-center">
                                    <Calendar className="w-3.5 h-3.5 mr-1" />
                                    {new Date(sermon.date).toLocaleDateString()}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span className="flex items-center">
                                    <User className="w-3.5 h-3.5 mr-1" />
                                    {sermon.preacher}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                                {sermon.title}
                            </h3>
                            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                <BookOpen className="w-4 h-4 mr-1.5 text-sky-500" />
                                {sermon.scripture}
                            </div>
                        </CardContent>
                    </Link>
                </Card>
            ))}
        </div>
    )
}
