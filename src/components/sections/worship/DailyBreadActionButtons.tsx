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

interface DailyBreadActionButtonsProps {
    breadId: string
    breadTitle: string
    onEdit: (breadId: string) => void
    onDelete: (breadId: string) => void
}

/**
 * 일용할 양식 수정/삭제 액션 버튼
 * - 관리자 전용
 * - 호버 시 표시
 * - 설교와 동일한 디자인 패턴
 */
export default function DailyBreadActionButtons({ breadId, breadTitle, onEdit, onDelete }: DailyBreadActionButtonsProps) {
    return (
        <div className="flex items-center gap-1">
            {/* 수정 버튼 */}
            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-500 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                onClick={(e) => {
                    e.preventDefault() // Link 이동 방지
                    e.stopPropagation()
                    onEdit(breadId)
                }}
            >
                <Edit className="h-4 w-4" />
            </Button>

            {/* 삭제 버튼 (확인 다이얼로그 포함) */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                        <AlertDialogTitle>일용할 양식을 삭제하시겠습니까?</AlertDialogTitle>
                        <AlertDialogDescription>
                            "{breadTitle}" 묵상이 영구적으로 삭제됩니다.<br />
                            이 작업은 되돌릴 수 없습니다.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={(e) => e.stopPropagation()}>취소</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete(breadId)
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
