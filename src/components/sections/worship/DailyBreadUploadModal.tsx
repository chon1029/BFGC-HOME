'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Plus, BookOpen } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { BIBLE_BOOKS } from '@/lib/constants/bible'

// ----------------------------------------------------------------------
// Schema
// ----------------------------------------------------------------------

const dailyBreadSchema = z.object({
    book: z.string().min(1, '성경을 선택해주세요.'),
    chapterVerse: z.string().min(1, '장/절을 입력해주세요.'),
    title: z.string().min(2, '제목을 입력해주세요.'),
    keyVerse: z.string().optional(),
    content: z.string().min(10, '본문 해설을 입력해주세요.'),
    suggestion: z.string().optional(),
    prayer: z.string().optional(),
    author: z.string().min(1, '작성자를 입력해주세요.'),
    password: z.string().min(4, '비밀번호를 입력해주세요 (수정/삭제용).'),
})

type DailyBreadFormValues = z.infer<typeof dailyBreadSchema>

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

interface DailyBreadUploadModalProps {
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function DailyBreadUploadModal({ open: externalOpen, onOpenChange: externalOnOpenChange }: DailyBreadUploadModalProps = {}) {
    const [internalOpen, setInternalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const isControlled = externalOpen !== undefined && externalOnOpenChange !== undefined
    const open = isControlled ? externalOpen : internalOpen
    const setOpen = isControlled ? externalOnOpenChange : setInternalOpen

    const form = useForm<DailyBreadFormValues>({
        resolver: zodResolver(dailyBreadSchema),
        defaultValues: {
            book: '창세기',
            chapterVerse: '',
            title: '',
            keyVerse: '',
            content: '',
            suggestion: '',
            prayer: '',
            author: '',
            password: '',
        },
    })

    const onSubmit = async (values: DailyBreadFormValues) => {
        setIsLoading(true)
        try {
            console.log('Form Values:', values)

            // TODO: Sanity 연동 시 body 필드는 block 형태로 변환 필요
            // const doc = {
            //   _type: 'dailyBread',
            //   book: values.book,
            //   chapterVerse: values.chapterVerse,
            //   title: values.title,
            //   keyVerse: values.keyVerse,
            //   body: [{ _type: 'block', children: [{ _type: 'span', text: values.content }] }],
            //   suggestion: values.suggestion,
            //   prayer: values.prayer,
            //   author: values.author,
            //   date: new Date().toISOString(),
            // }

            // Mock API Call
            await new Promise(resolve => setTimeout(resolve, 1500))

            setOpen(false)
            form.reset()
            alert('묵상이 성공적으로 등록되었습니다!')
        } catch (error) {
            console.error(error)
            alert('등록 중 오류가 발생했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!isControlled && (
                <DialogTrigger asChild>
                    <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2 shadow-lg shadow-amber-500/20">
                        <Plus className="w-4 h-4" /> 묵상 작성
                    </Button>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-slate-50 dark:bg-slate-900">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-3xl font-bold flex items-center gap-2">
                        새 묵상 작성
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        {/* 1. 상단 정보 (성경, 장/절, 제목) */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <FormField
                                control={form.control}
                                name="book"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">성경</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
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
                                    <FormItem>
                                        <FormLabel className="font-bold">장/절</FormLabel>
                                        <FormControl>
                                            <Input placeholder="예: 1:1-10" {...field} />
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
                                        <FormLabel className="font-bold">제목</FormLabel>
                                        <FormControl>
                                            <Input placeholder="묵상 제목을 입력하세요" {...field} />
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
                                <FormItem className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <FormLabel className="font-bold">요절</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="핵심 요절 말씀을 입력하세요."
                                            className="resize-none min-h-[80px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 3. 본문 해설 */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <FormLabel className="font-bold">본문해설</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="본문에 대한 해설을 입력하세요."
                                            className="resize-none min-h-[150px]"
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
                                <FormItem className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <FormLabel className="font-bold">묵상을 위한 제언</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="적용점이나 묵상 질문을 입력하세요."
                                            className="resize-none min-h-[100px]"
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
                                <FormItem className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <FormLabel className="font-bold">함께 기도해요</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="기도문을 입력하세요."
                                            className="resize-none min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 6. 작성자 및 비밀번호 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">작성자</FormLabel>
                                        <FormControl>
                                            <Input placeholder="이름" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">비밀번호 (수정/삭제용)</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="비밀번호" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                취소
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white px-8">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        저장 중...
                                    </>
                                ) : (
                                    '글 작성'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
