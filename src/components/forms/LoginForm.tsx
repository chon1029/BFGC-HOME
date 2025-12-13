'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Mail, Lock, CheckCircle2, AlertCircle, Chrome } from 'lucide-react'
import { signIn } from 'next-auth/react'

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
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
  email: z.string().email({ message: '올바른 이메일 주소를 입력해주세요.' }),
  password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),
})

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  if (!mounted) {
    return null
  }

  // Mock submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setLoginStatus('idle')
    setErrorMessage('')

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        setLoginStatus('error')
        setErrorMessage('이메일 또는 비밀번호가 일치하지 않습니다.')
        setIsLoading(false)
        setTimeout(() => setLoginStatus('idle'), 3000)
      } else {
        setLoginStatus('success')
        // 로그인 성공 시 메인으로 이동
        setTimeout(() => {
          router.push('/')
          router.refresh() // 세션 상태 업데이트를 위해 새로고침
        }, 1000)
      }
    } catch (error) {
      setLoginStatus('error')
      setErrorMessage('로그인 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.error('Google login error:', error)
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
              환영합니다
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              교회 홈페이지 서비스를 이용하시려면 로그인해주세요.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

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
                          placeholder="비밀번호"
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
                {loginStatus === 'error' && (
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
                className={`w-full h-12 text-base font-semibold shadow-lg transition-all duration-300 ${loginStatus === 'success'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600 hover:shadow-sky-500/25'
                  }`}
                disabled={isLoading || loginStatus === 'success'}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : loginStatus === 'success' ? (
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    로그인 성공!
                  </div>
                ) : (
                  '로그인'
                )}
              </Button>
            </form>
          </Form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-slate-400 font-medium">또는</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full h-12 border-slate-200 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-5 w-5 text-slate-600" />
            Google 계정으로 계속하기
          </Button>

          <div className="mt-8 flex flex-col gap-2 text-center text-sm">
            <Link
              href="/signup"
              className="text-slate-600 hover:text-sky-600 transition-colors font-medium"
            >
              아직 계정이 없으신가요? 회원가입
            </Link>
            <Link
              href="/forgot-password"
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
