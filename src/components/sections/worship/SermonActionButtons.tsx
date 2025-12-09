import { Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Sermon } from '@/types/sermon'

interface SermonActionButtonsProps {
    sermon: Sermon
    onEdit: (sermon: Sermon) => void
    onDelete: (sermonId: string) => void
}

export default function SermonActionButtons({ sermon, onEdit, onDelete }: SermonActionButtonsProps) {
    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-sky-600 hover:bg-sky-50"
                onClick={(e) => {
                    e.preventDefault() // Link 이동 방지
                    e.stopPropagation()
                    onEdit(sermon)
                }}
            >
                <Edit className="h-4 w-4" />
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                        onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>설교를 삭제하시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription>
                            "{sermon.title}" 설교가 영구적으로 삭제됩니다.<br />
                            이 작업은 되돌릴 수 없습니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>취소</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete(sermon._id)
                            }}
                        >
                            삭제 확인
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
