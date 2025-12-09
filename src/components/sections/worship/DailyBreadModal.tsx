'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'
import { BIBLE_BOOKS } from '@/lib/bible-data'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
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
import { DailyBread } from '@/types/dailyBread'

const dailyBreadSchema = z.object({
    book: z.string().min(1, '성경을 선택해주세요.'),
    chapterVerse: z.string().min(1, '장/절을 입력해주세요.'),
    title: z.string().min(1, '제목을 입력해주세요.'),
    keyVerse: z.string().optional(),
    body: z.string().optional(),
    suggestion: z.string().optional(),
    prayer: z.string().optional(),
    author: z.string().optional(),
})

type DailyBreadFormValues = z.infer<typeof dailyBreadSchema>

interface DailyBreadModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export default function DailyBreadModal({ isOpen, onClose, onSuccess }: DailyBreadModalProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<DailyBreadFormValues>({
        resolver: zodResolver(dailyBreadSchema),
        defaultValues: {
            book: '',
            chapterVerse: '',
            title: '',
            keyVerse: '',
            body: '',
            suggestion: '',
            prayer: '',
            author: '관리자',
        },
    })

    const onSubmit = async (values: DailyBreadFormValues) => {
        setIsLoading(true)
        try {
            // TODO: Sanity API 연동
            console.log('Form Values:', values)
            await new Promise(resolve => setTimeout(resolve, 1000)) // Mock delay

            onSuccess()
            onClose()
            form.reset()
            alert('묵상글이 등록되었습니다!')
        } catch (error) {
            console.error(error)
            alert('오류가 발생했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-slate-50 dark:bg-slate-900">
                <DialogHeader className="mb-4">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-2xl font-bold">새 묵상 작성</DialogTitle>
                        <Button variant="destructive" size="sm" onClick={onClose} className="bg-rose-400 hover:bg-rose-500">
                            목록으로 돌아가기
                        </Button>
                    </div>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">

                        {/* 1. 성경 / 장절 / 제목 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <FormField
                                control={form.control}
                                name="book"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-1">
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">성경</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="성경 선택" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="max-h-[300px]">
                                                {BIBLE_BOOKS.map((book) => (
                                                    <SelectItem key={book.id} value={book.name}>
                                                        {book.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="chapterVerse"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-1">
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">장/절</FormLabel>
                                        <FormControl>
                                            <Input placeholder="예: 1:1-10" {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="md:col-span-2">
                                        <FormLabel className="font-bold text-slate-700 dark:text-slate-300">제목</FormLabel>
                                        <FormControl>
                                            <Input placeholder="제목을 입력하세요" {...field} className="bg-white" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* 2. 요절 */}
                        <FormField
                            control={form.control}
                            name="keyVerse"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">요절</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[80px] bg-white resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 3. 본문해설 */}
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">본문해설</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[150px] bg-white resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 4. 묵상을 위한 제언 */}
                        <FormField
                            control={form.control}
                            name="suggestion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">묵상을 위한 제언</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[100px] bg-white resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 5. 함께 기도해요 */}
                        <FormField
                            control={form.control}
                            name="prayer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">함께 기도해요</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            className="min-h-[80px] bg-white resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 6. 작성자 */}
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-slate-700 dark:text-slate-300">작성자</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-white max-w-[200px]" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white px-8">
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                글 작성
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
