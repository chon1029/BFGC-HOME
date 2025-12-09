'use client'

import { useState } from 'react'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Mail, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
    email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
})

export default function ForgotPasswordForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setStatus('idle')
        setErrorMessage('')

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        try {
            // TODO: 실제 비밀번호 재설정 이메일 발송 로직
            console.log('Reset password for:', values.email)

            setStatus('success')
            setIsLoading(false)
        } catch (error) {
            setStatus('error')
            setErrorMessage('요청을 처리하는 중 오류가 발생했습니다.')
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
        >
            {/* Glassmorphism Card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl dark:bg-slate-900/80 dark:border-slate-800">

                {/* Decorative Gradient Blob */}
                <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-400/20 blur-3xl" />

                <div className="relative p-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            비밀번호 재설정
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            가입하신 이메일 주소를 입력하시면<br />비밀번호 재설정 링크를 보내드립니다.
                        </p>
                    </div>

                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">이메일 발송 완료!</h3>
                            <p className="text-slate-600 mb-6">
                                입력하신 이메일로 링크가 전송되었습니다.<br />
                                메일함을 확인해주세요.
                            </p>
                            <Link href="/login">
                                <Button variant="outline" className="w-full">
                                    로그인 페이지로 돌아가기
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="sr-only">이메일</FormLabel>
                                            <FormControl>
                                                <div className="relative group">
                                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                        <Mail className="h-5 w-5" />
                                                    </div>
                                                    <Input
                                                        placeholder="이메일 주소"
                                                        {...field}
                                                        className="pl-10 h-12 bg-white/50 border-slate-200 focus:border-sky-500 focus:ring-sky-500/20 transition-all dark:bg-slate-800/50 dark:border-slate-700"
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Error Message */}
                                <AnimatePresence>
                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="flex items-center gap-2 text-sm text-red-500 bg-red-50 p-3 rounded-lg dark:bg-red-900/20"
                                        >
                                            <AlertCircle className="h-4 w-4" />
                                            {errorMessage}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 shadow-lg hover:shadow-sky-500/25 transition-all duration-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        '재설정 링크 보내기'
                                    )}
                                </Button>

                                <div className="text-center">
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center text-sm text-slate-500 hover:text-slate-700 transition-colors"
                                    >
                                        <ArrowLeft className="mr-1 h-4 w-4" />
                                        로그인 페이지로 돌아가기
                                    </Link>
                                </div>
                            </form>
                        </Form>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
