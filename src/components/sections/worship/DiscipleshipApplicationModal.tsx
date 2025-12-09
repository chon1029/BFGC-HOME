'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, Send } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
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

const applicationSchema = z.object({
    name: z.string().min(2, '이름을 입력해주세요.'),
    phone: z.string().min(10, '연락처를 입력해주세요.'),
    email: z.string().email('올바른 이메일을 입력해주세요.'),
    course: z.enum(['foundation', 'discipleship', 'leadership']),
    motivation: z.string().min(10, '신청 동기를 10자 이상 입력해주세요.'),
})

type ApplicationFormValues = z.infer<typeof applicationSchema>

interface DiscipleshipApplicationModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function DiscipleshipApplicationModal({ isOpen, onClose }: DiscipleshipApplicationModalProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState('')

    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            motivation: '',
        },
    })

    const onSubmit = async (values: ApplicationFormValues) => {
        setIsLoading(true)
        try {
            // API 호출
            const response = await fetch('/api/discipleship/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.message || '신청 처리 중 오류가 발생했습니다.')
            }

            // 선택한 과정 이름 저장
            const courseNames = {
                foundation: '성장반',
                discipleship: '제자반',
                leadership: '사역자반',
            }
            setSelectedCourse(courseNames[values.course])
            setIsSuccess(true)

            // 3초 후 모달 닫기
            setTimeout(() => {
                setIsSuccess(false)
                onClose()
                form.reset()
            }, 3000)
        } catch (error) {
            console.error(error)
            alert(error instanceof Error ? error.message : '오류가 발생했습니다. 다시 시도해주세요.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                {isSuccess ? (
                    <div className="py-12 text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                            신앙성장을 위한 위대한 출발,
                        </h3>
                        <h3 className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-4">
                            {selectedCourse} 신청을 완료하였습니다!
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            담당자가 확인 후 연락드리겠습니다.
                        </p>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl">제자훈련 신청</DialogTitle>
                            <DialogDescription>
                                아래 정보를 입력하시면 담당자가 확인 후 연락드립니다.
                            </DialogDescription>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

                                {/* 이름 */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>이름 *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="홍길동" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* 연락처 & 이메일 */}
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>연락처 *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="010-1234-5678" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>이메일 *</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="example@email.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* 신청 과정 */}
                                <FormField
                                    control={form.control}
                                    name="course"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>신청 과정 *</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="과정을 선택하세요" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="foundation">성장반 (12주)</SelectItem>
                                                    <SelectItem value="discipleship">제자반 (24주)</SelectItem>
                                                    <SelectItem value="leadership">사역자반 (36주)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* 신청 동기 */}
                                <FormField
                                    control={form.control}
                                    name="motivation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>신청 동기 *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="제자훈련에 참여하고자 하는 이유를 간단히 적어주세요."
                                                    className="resize-none h-24"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="flex gap-3 pt-4">
                                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                                        취소
                                    </Button>
                                    <Button type="submit" disabled={isLoading} className="flex-1 bg-sky-600 hover:bg-sky-700">
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        신청하기
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
