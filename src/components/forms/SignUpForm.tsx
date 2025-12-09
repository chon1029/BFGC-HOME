'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Mail, Lock, User, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

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
    name: z.string().min(2, { message: '이름은 2글자 이상이어야 합니다.' }),
    email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
    password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
})

export default function SignUpForm() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [signupStatus, setSignupStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setSignupStatus('idle')
        setErrorMessage('')

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))

        try {
            // TODO: 실제 회원가입 로직 구현 (Sanity 연동)
            console.log('Signup values:', values)

            setSignupStatus('success')
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        } catch (error) {
            setSignupStatus('error')
            setErrorMessage('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
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
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            계정 만들기
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            부다페스트한인선교교회의 온라인 멤버가 되어주세요.
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                            {/* Name Field */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">이름</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <Input
                                                    placeholder="이름"
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

                            {/* Password Field */}
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">비밀번호</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                                                    <Lock className="h-5 w-5" />
                                                </div>
                                                <Input
                                                    type="password"
                                                    placeholder="비밀번호 (6자 이상)"
                                                    {...field}
                                                    className="pl-10 h-12 bg-white/50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all dark:bg-slate-800/50 dark:border-slate-700"
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Confirm Password Field */}
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="sr-only">비밀번호 확인</FormLabel>
                                        <FormControl>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                                                    <CheckCircle2 className="h-5 w-5" />
                                                </div>
                                                <Input
                                                    type="password"
                                                    placeholder="비밀번호 확인"
                                                    {...field}
                                                    className="pl-10 h-12 bg-white/50 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 transition-all dark:bg-slate-800/50 dark:border-slate-700"
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
                                {signupStatus === 'error' && (
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
                                className={`w-full h-12 text-base font-semibold shadow-lg transition-all duration-300 ${signupStatus === 'success'
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 hover:shadow-sky-500/25'
                                    }`}
                                disabled={isLoading || signupStatus === 'success'}
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                ) : signupStatus === 'success' ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <CheckCircle2 className="h-5 w-5" />
                                        가입 완료! 로그인 페이지로 이동합니다
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        계정 만들기
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </Form>

                    <div className="mt-8 text-center text-sm">
                        <span className="text-slate-600 dark:text-slate-400">이미 계정이 있으신가요? </span>
                        <Link
                            href="/login"
                            className="text-sky-600 hover:text-sky-500 font-medium transition-colors"
                        >
                            로그인하기
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
