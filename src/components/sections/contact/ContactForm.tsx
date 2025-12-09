'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, MapPin, Clock, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import PageLayout from '@/components/layout/PageLayout'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Card, CardContent } from '@/components/ui/card'

const contactSchema = z.object({
    name: z.string().min(2, '이름을 입력해주세요.'),
    email: z.string().email('올바른 이메일을 입력해주세요.'),
    phone: z.string().optional(),
    subject: z.string().min(2, '제목을 입력해주세요.'),
    message: z.string().min(10, '문의 내용을 10자 이상 입력해주세요.'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
        },
    })

    const onSubmit = async (values: ContactFormValues) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            const data = await response.json()

            if (!response.ok || !data.success) {
                throw new Error(data.message || '문의 전송 중 오류가 발생했습니다.')
            }

            setIsSuccess(true)
            form.reset()

            setTimeout(() => {
                setIsSuccess(false)
            }, 5000)
        } catch (error) {
            console.error(error)
            alert(error instanceof Error ? error.message : '오류가 발생했습니다. 다시 시도해주세요.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <PageLayout breadcrumbs={[]}>
            <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 py-12 pb-16">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                            BFGC에 문의해주세요
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            문의사항이 있으시면 언제든지 연락주세요.<br />
                            빠른 시일 내에 답변드리겠습니다.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Left: Church Info */}
                        <div className="space-y-6">
                            <Card className="bg-gradient-to-br from-sky-500 to-blue-600 border-0 shadow-2xl overflow-hidden">
                                <CardContent className="p-8 text-white">
                                    <h2 className="text-3xl font-bold mb-8">교회 정보</h2>

                                    {/* Email */}
                                    <div className="flex items-start gap-4 mb-6 group">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-300">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">전자 문의</h3>
                                            <a
                                                href="mailto:chon1029@gmail.com"
                                                className="text-white/90 hover:text-white transition-colors"
                                            >
                                                chon1029@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="flex items-start gap-4 mb-6 group">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-300">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">주소</h3>
                                            <p className="text-white/90">부다페스트한인교회</p>
                                            <p className="text-white/90">1073 Budapest, Osvát utca 16</p>
                                        </div>
                                    </div>

                                    {/* Service Time */}
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-300">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-1">예배 시간</h3>
                                            <p className="text-white/90">현재가 확인되면 안내드리겠습니다</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Google Map */}
                            <Card className="overflow-hidden shadow-xl">
                                <CardContent className="p-0">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.513751466512!2d19.0701364!3d47.4993852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc66ddb89605%3A0xd588a3077bb8a1df!2z67aA64uk7Y6Y7Iqk7Yq4IO2VnOyduOyEoOq1kOq1kO2ajA!5e0!3m2!1sko!2shu!4v1765190631425!5m2!1sko!2shu"
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="grayscale hover:grayscale-0 transition-all duration-500"
                                    ></iframe>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right: Contact Form */}
                        <Card className="shadow-2xl border-slate-200 dark:border-slate-800">
                            <CardContent className="p-8">
                                {isSuccess ? (
                                    <div className="py-12 text-center">
                                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                                            문의가 전송되었습니다!
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            빠른 시일 내에 답변드리겠습니다.
                                        </p>
                                    </div>
                                ) : (
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                            {/* Name & Email */}
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>이름 *</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="홍길동" {...field} className="h-12" />
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
                                                                <Input type="email" placeholder="example@email.com" {...field} className="h-12" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Phone */}
                                            <FormField
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>연락처</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="010-1234-5678 (선택사항)" {...field} className="h-12" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Subject */}
                                            <FormField
                                                control={form.control}
                                                name="subject"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>제목 *</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="문의 제목을 입력하세요" {...field} className="h-12" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Message */}
                                            <FormField
                                                control={form.control}
                                                name="message"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>문의내용 *</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="문의하실 내용을 자세히 적어주세요."
                                                                className="resize-none h-32"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full h-12 bg-sky-600 hover:bg-sky-700 text-white text-lg font-semibold"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                        전송 중...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-5 w-5" />
                                                        문의 보내기
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    </Form>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
