'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, MapPin, Clock, Send, Loader2, CheckCircle2, Copy, Check } from 'lucide-react'
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
import { cn } from '@/lib/utils'

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
    const [copied, setCopied] = useState(false)

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

    const copyEmail = () => {
        navigator.clipboard.writeText('chon1029@gmail.com')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <PageLayout breadcrumbs={[]}>
            <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 py-20 overflow-hidden">

                {/* Background Animations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 90, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-sky-200/20 to-blue-200/20 blur-3xl"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            x: [0, -50, 0],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-200/20 to-pink-200/20 blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 space-y-4"
                    >
                        <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Touch</span>
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            부다페스트 한인선교교회는 언제나 여러분을 환영합니다.<br />
                            궁금한 점이 있으시다면 언제든 편하게 문의해주세요.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

                        {/* Left Column: Info & Map */}
                        <div className="space-y-6">

                            {/* Info Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 shadow-2xl overflow-hidden group">
                                    <CardContent className="p-8 md:p-10 text-white relative">
                                        {/* Decorative Circle */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />

                                        <h2 className="text-3xl font-bold mb-8 relative z-10">Contact Info</h2>

                                        <div className="space-y-8 relative z-10">
                                            {/* Email */}
                                            <motion.div
                                                whileHover={{ x: 10 }}
                                                className="flex items-start gap-5 cursor-pointer"
                                                onClick={copyEmail}
                                            >
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10 group-hover:bg-sky-500/20 group-hover:border-sky-500/50 transition-all duration-300">
                                                    <Mail className="w-6 h-6 text-sky-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1 text-slate-200">Email</h3>
                                                    <div className="flex items-center gap-2 group/email">
                                                        <span className="text-white/90 group-hover/email:text-sky-400 transition-colors">chon1029@gmail.com</span>
                                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 opacity-0 group-hover/email:opacity-100 transition-opacity" />}
                                                    </div>
                                                    <p className="text-xs text-slate-400 mt-1">클릭하여 복사하기</p>
                                                </div>
                                            </motion.div>

                                            {/* Address */}
                                            <motion.div
                                                whileHover={{ x: 10 }}
                                                className="flex items-start gap-5"
                                            >
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10 group-hover:bg-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300">
                                                    <MapPin className="w-6 h-6 text-purple-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1 text-slate-200">Address</h3>
                                                    <p className="text-white/90">1073 Budapest, Osvát utca 16</p>
                                                    <p className="text-sm text-slate-400 mt-1">부다페스트 한인선교교회</p>
                                                </div>
                                            </motion.div>

                                            {/* Time */}
                                            <motion.div
                                                whileHover={{ x: 10 }}
                                                className="flex items-start gap-5"
                                            >
                                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm border border-white/10 group-hover:bg-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300">
                                                    <Clock className="w-6 h-6 text-orange-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg mb-1 text-slate-200">Service Time</h3>
                                                    <p className="text-white/90">주일 오전 11:00 (본당)</p>
                                                    <p className="text-sm text-slate-400 mt-1">수요예배 / 금요기도회 / 새벽기도회</p>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Map Card */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <Card className="overflow-hidden shadow-xl border-0 ring-1 ring-slate-200 dark:ring-slate-800 group">
                                    <div className="relative h-[300px] w-full overflow-hidden">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.513751466512!2d19.0701364!3d47.4993852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc66ddb89605%3A0xd588a3077bb8a1df!2z67aA64uk7Y6Y7Iqk7Yq4IO2VnOyduOyEoOq1kOq1kO2ajA!5e0!3m2!1sko!2shu!4v1765190631425!5m2!1sko!2shu"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                        ></iframe>
                                        <div className="absolute inset-0 pointer-events-none border-4 border-white/0 group-hover:border-white/20 transition-colors duration-300" />
                                    </div>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Right Column: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Card className="h-full shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl ring-1 ring-slate-200 dark:ring-slate-800">
                                <CardContent className="p-8 md:p-10">
                                    {isSuccess ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="h-full flex flex-col items-center justify-center text-center py-20"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                                                className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6"
                                            >
                                                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                                            </motion.div>
                                            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                                                Thank You!
                                            </h3>
                                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                                문의가 성공적으로 전송되었습니다.<br />
                                                빠른 시일 내에 답변 드리겠습니다.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 h-full flex flex-col">
                                                <div className="mb-2">
                                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Send a Message</h2>
                                                    <p className="text-slate-500 dark:text-slate-400">작성해주신 내용은 관리자에게 이메일로 전송됩니다.</p>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="name"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">이름</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="홍길동" {...field} className="h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 transition-all" />
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
                                                                <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">이메일</FormLabel>
                                                                <FormControl>
                                                                    <Input type="email" placeholder="example@email.com" {...field} className="h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 transition-all" />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">연락처 (선택)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="010-1234-5678" {...field} className="h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 transition-all" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="subject"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">제목</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="문의 제목을 입력하세요" {...field} className="h-12 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 transition-all" />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="message"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">문의내용</FormLabel>
                                                            <FormControl>
                                                                <Textarea
                                                                    placeholder="문의하실 내용을 자세히 적어주세요."
                                                                    className="resize-none min-h-[150px] bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-sky-500 transition-all"
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
                                                    className="w-full h-14 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 transition-all duration-300 group"
                                                >
                                                    {isLoading ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                            전송 중...
                                                        </>
                                                    ) : (
                                                        <span className="flex items-center gap-2">
                                                            문의 보내기
                                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </span>
                                                    )}
                                                </Button>
                                            </form>
                                        </Form>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
