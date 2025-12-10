'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon, Loader2, Plus, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

// ----------------------------------------------------------------------
// Schema
// ----------------------------------------------------------------------

const sermonSchema = z.object({
    title: z.string().min(2, '제목을 입력해주세요.'),
    preacher: z.string().min(2, '설교자를 입력해주세요.'),
    date: z.date({ required_error: '날짜를 선택해주세요.' }),
    scripture: z.string().min(2, '성경 본문을 입력해주세요.'),
    videoUrl: z.string().url('올바른 유튜브 링크를 입력해주세요.').includes('youtube', { message: '유튜브 링크만 가능합니다.' }),
    series: z.string().optional(),
    description: z.string().optional(),
    tags: z.string().optional(), // 콤마로 구분된 문자열로 받음
})

type SermonFormValues = z.infer<typeof sermonSchema>

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export function SermonUploadModal() {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<SermonFormValues>({
        resolver: zodResolver(sermonSchema),
        defaultValues: {
            title: '',
            preacher: '전근일 목사',
            date: new Date(),
            scripture: '',
            videoUrl: '',
            series: '',
            description: '',
            tags: '',
        },
    })

    const onSubmit = async (values: SermonFormValues) => {
        setIsLoading(true)
        try {
            // TODO: 실제 API 연동 (Sanity)
            console.log('Form Values:', values)

            // Mock API Call
            await new Promise(resolve => setTimeout(resolve, 1500))

            setOpen(false)
            form.reset()
            alert('설교가 성공적으로 등록되었습니다!')
        } catch (error) {
            console.error(error)
            alert('등록 중 오류가 발생했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-sky-600 hover:bg-sky-700 text-white gap-2 shadow-lg shadow-sky-500/20">
                    <Plus className="w-4 h-4" /> 설교 등록
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Youtube className="w-6 h-6 text-red-600" />
                        새 설교 등록
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">

                        {/* 1. 기본 정보 (제목, 설교자) */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>설교 제목</FormLabel>
                                        <FormControl>
                                            <Input placeholder="예: 부활의 소망을 품으라" {...field} />
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
                                        <FormControl>
                                            <Input placeholder="전근일 목사" {...field} />
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

                        {/* 2. 본문 및 링크 */}
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
                            name="videoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>유튜브 링크</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                                            <Input className="pl-10" placeholder="https://youtube.com/watch?v=..." {...field} />
                                        </div>
                                    </FormControl>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        * 유튜브 링크를 입력하면 썸네일을 자동으로 가져옵니다.
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 3. 추가 정보 (시리즈, 태그, 설명) */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="series"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>설교 시리즈 (선택)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="예: 산상수훈" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>태그 (선택)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="예: 믿음, 소망, 사랑 (콤마로 구분)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>설교 요약 (선택)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="설교의 핵심 내용을 간단히 요약해주세요."
                                            className="resize-none min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                취소
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-sky-600 hover:bg-sky-700 text-white">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        등록 중...
                                    </>
                                ) : (
                                    '설교 등록하기'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
