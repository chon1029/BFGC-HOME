'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Sermon } from '@/types/sermon'

const sermonFormSchema = z.object({
    title: z.string().min(2, '제목을 입력해주세요.'),
    preacher: z.string().min(2, '설교자를 입력해주세요.'),
    scripture: z.string().min(2, '본문을 입력해주세요.'),
    date: z.date(),
    videoUrl: z.string().url('올바른 URL을 입력해주세요.'),
    category: z.enum(['sunday', 'friday', 'special']),
    body: z.string().optional(), // 간단한 텍스트로 처리 (나중에 Rich Text로 확장 가능)
})

type SermonFormValues = z.infer<typeof sermonFormSchema>

interface SermonModalProps {
    isOpen: boolean
    onClose: () => void
    sermonToEdit?: Sermon | null // 수정할 경우 데이터 전달
}

export default function SermonModal({ isOpen, onClose, sermonToEdit }: SermonModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<SermonFormValues>({
        resolver: zodResolver(sermonFormSchema),
        defaultValues: {
            title: sermonToEdit?.title || '',
            preacher: sermonToEdit?.preacher || '전근일 담임목사',
            scripture: sermonToEdit?.scripture || '',
            date: sermonToEdit ? new Date(sermonToEdit.date) : new Date(),
            videoUrl: sermonToEdit?.videoUrl || '',
            category: sermonToEdit?.category || 'sunday',
            body: '', // TODO: Handle body content
        },
    })

    // 모달이 열릴 때마다 폼 초기화 (수정 모드 vs 생성 모드)
    // useEffect(() => { ... }, [sermonToEdit]) // 필요 시 구현

    const onSubmit = async (values: SermonFormValues) => {
        setIsLoading(true)
        try {
            // TODO: Sanity API 연동
            console.log('Form Values:', values)
            await new Promise(resolve => setTimeout(resolve, 1000)) // Mock delay

            onClose()
            form.reset()
            alert(sermonToEdit ? '설교가 수정되었습니다!' : '새 설교가 등록되었습니다!')
        } catch (error) {
            console.error(error)
            alert('오류가 발생했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{sermonToEdit ? '설교 수정' : '새 설교 등록'}</DialogTitle>
                    <DialogDescription>
                        {sermonToEdit ? '기존 설교 내용을 수정합니다.' : '새로운 설교 영상을 등록합니다.'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        {/* 1. 제목 & 설교자 */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>설교 제목</FormLabel>
                                        <FormControl>
                                            <Input placeholder="제목을 입력하세요" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="preacher"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>설교자</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="설교자 선택" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="전근일 담임목사">전근일 담임목사</SelectItem>
                                                <SelectItem value="초청 강사">초청 강사</SelectItem>
                                                <SelectItem value="부목사">부목사</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>카테고리</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="카테고리 선택" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="sunday">주일예배</SelectItem>
                                                <SelectItem value="friday">금요예배</SelectItem>
                                                <SelectItem value="special">특별성회</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* 2. 본문 & 날짜 */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="scripture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>성경 본문</FormLabel>
                                        <FormControl>
                                            <Input placeholder="예: 요한복음 3:16" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>설교 날짜</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP", { locale: ko })
                                                        ) : (
                                                            <span>날짜 선택</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* 3. 유튜브 링크 */}
                        <FormField
                            control={form.control}
                            name="videoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>유튜브 링크</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://youtube.com/..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 4. 설교 노트 (간단 버전) */}
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>설교 메모 (선택)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="설교 요약이나 메모를 입력하세요."
                                            className="resize-none h-24"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                취소
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-sky-600 hover:bg-sky-700">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {sermonToEdit ? '수정 저장' : '설교 등록'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
