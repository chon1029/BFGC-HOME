import { Play, Calendar, User, BookOpen } from 'lucide-react'
import { Sermon } from '@/types/sermon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SermonActionButtons from './SermonActionButtons'

interface SermonListViewProps {
    sermons: Sermon[]
    isAdmin?: boolean
    onEdit?: (sermon: Sermon) => void
    onDelete?: (sermonId: string) => void
}

export default function SermonListView({ sermons, isAdmin, onEdit, onDelete }: SermonListViewProps) {
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
        <div className="space-y-3">
            {sermons.map((sermon) => (
                <div
                    key={sermon._id}
                    className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-slate-200 bg-white hover:border-sky-200 hover:shadow-md transition-all duration-200 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-sky-900 relative"
                >
                    {/* Mobile Category Badge */}
                    <div className="sm:hidden">
                        <Badge className={getCategoryColor(sermon.category)}>
                            {getCategoryLabel(sermon.category)}
                        </Badge>
                    </div>

                    {/* Date & Preacher (Left Side on Desktop) */}
                    <div className="hidden sm:flex flex-col items-center justify-center w-24 text-center shrink-0">
                        <span className="text-lg font-bold text-slate-900 dark:text-white">
                            {new Date(sermon.date).getDate()}
                        </span>
                        <span className="text-xs text-slate-500 uppercase">
                            {new Date(sermon.date).toLocaleString('en-US', { month: 'short' })}
                        </span>
                        <span className="mt-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                            {new Date(sermon.date).getFullYear()}
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge className={`hidden sm:inline-flex ${getCategoryColor(sermon.category)}`}>
                                {getCategoryLabel(sermon.category)}
                            </Badge>
                            <span className="flex items-center text-xs text-slate-500 sm:hidden">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(sermon.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                                <User className="w-3.5 h-3.5 mr-1" />
                                {sermon.preacher}
                            </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-sky-600 transition-colors pr-20">
                            {sermon.title}
                        </h3>
                        <div className="flex items-center text-sm text-slate-500 mt-1">
                            <BookOpen className="w-4 h-4 mr-1.5 text-sky-500" />
                            {sermon.scripture}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-2 sm:mt-0 w-full sm:w-auto flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none group-hover:bg-sky-50 group-hover:text-sky-600 group-hover:border-sky-200 dark:group-hover:bg-sky-900/20 dark:group-hover:border-sky-800">
                            <Play className="w-4 h-4 mr-2" />
                            설교 보기
                        </Button>

                        {/* Admin Actions */}
                        {isAdmin && onEdit && onDelete && (
                            <div className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <SermonActionButtons sermon={sermon} onEdit={onEdit} onDelete={onDelete} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
