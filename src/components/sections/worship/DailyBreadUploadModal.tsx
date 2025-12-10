'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { CalendarIcon, Loader2, Plus, BookOpen } from "lucide-react"
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

const dailyBreadSchema = z.object({
    date: z.date({ required_error: '날짜를 선택해주세요.' }),
    title: z.string().min(2, '제목을 입력해주세요.'),
    scripture: z.string().min(2, '성경 본문을 입력해주세요.'),
    content: z.string().min(10, '본문 내용을 입력해주세요.'),
    commentary: z.string().optional(),
    prayer: z.string().optional(),
})

type DailyBreadFormValues = z.infer<typeof dailyBreadSchema>

// ----------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------

export function DailyBreadUploadModal() {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<DailyBreadFormValues>({
        resolver: zodResolver(dailyBreadSchema),
        defaultValues: {
            date: new Date(),
            title: '',
            scripture: '',
            content: '',
            commentary: '',
            prayer: '',
        },
    })

    const onSubmit = async (values: DailyBreadFormValues) => {
        setIsLoading(true)
        try {
            // TODO: 실제 API 연동 (Sanity)
            console.log('Form Values:', values)

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
            <DialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2 shadow-lg shadow-amber-500/20">
                    <Plus className="w-4 h-4" /> 묵상 나눔
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-amber-600" />
                        새 묵상 등록
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">

                        {/* 1. 날짜 및 제목 */}
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>묵상 날짜</FormLabel>
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
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="scripture"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>성경 본문</FormLabel>
                                        <FormControl>
                                            <Input placeholder="예: 시편 23:1-6" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>묵상 제목</FormLabel>
                                    <FormControl>
                                        <Input placeholder="오늘의 묵상 제목을 입력하세요" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 2. 내용 입력 */}
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>본문 말씀 (또는 요약)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="본문 말씀이나 요약을 입력하세요."
                                            className="resize-none min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="commentary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>해설 및 묵상 (선택)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="말씀에 대한 해설이나 묵상 내용을 자유롭게 적어주세요."
                                            className="resize-none min-h-[150px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="prayer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>오늘의 기도 (선택)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="오늘 하루를 위한 짧은 기도를 적어주세요."
                                            className="resize-none min-h-[80px]"
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
                            <Button type="submit" disabled={isLoading} className="bg-amber-600 hover:bg-amber-700 text-white">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        등록 중...
                                    </>
                                ) : (
                                    '묵상 등록하기'
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
