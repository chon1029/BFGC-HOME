'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { User, Bell, Shield, Lock, Save, AlertTriangle } from 'lucide-react'
import { useSession } from "next-auth/react"
import PageLayout from '@/components/layout/PageLayout'

// ----------------------------------------------------------------------
// 1. Profile Form Component
// ----------------------------------------------------------------------

const profileFormSchema = z.object({
    username: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }).max(30),
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    bio: z.string().max(160).min(4, { message: "자기소개는 4글자 이상이어야 합니다." }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

function ProfileForm() {
    const { data: session } = useSession()
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: "",
            email: "",
            bio: "안녕하세요! 부다페스트한인선교교회 성도입니다.",
        },
    })

    useEffect(() => {
        if (session?.user) {
            form.reset({
                username: session.user.name || "",
                email: session.user.email || "",
                bio: "안녕하세요! 부다페스트한인선교교회 성도입니다.",
            })
            setPreviewImage(session.user.image || null)
        }
    }, [session, form])

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            // 1. 파일 크기 체크 (예: 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert("파일 크기는 2MB를 초과할 수 없습니다.")
                return
            }

            // 2. 미리보기 생성
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewImage(reader.result as string)
            }
            reader.readAsDataURL(file)

            // TODO: 실제 서버 업로드 로직 추가 필요
            console.log("Selected file:", file)
        }
    }

    function onSubmit(data: ProfileFormValues) {
        console.log(data)
        alert("프로필이 성공적으로 업데이트되었습니다! (Mock)")
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <User className="w-5 h-5 text-sky-600" />
                    <CardTitle>프로필 정보</CardTitle>
                </div>
                <CardDescription>공개적으로 표시되는 프로필 정보를 수정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20 border-2 border-slate-100">
                        <AvatarImage src={previewImage || ''} className="object-cover" />
                        <AvatarFallback className="text-lg bg-sky-100 text-sky-700">
                            {session?.user?.name?.[0] || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <Button variant="outline" size="sm" onClick={handleImageClick}>
                            사진 변경
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                            JPG, GIF or PNG. 2MB max.
                        </p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>이름</FormLabel>
                                    <FormControl>
                                        <Input placeholder="이름" {...field} />
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
                                    <FormLabel>이메일</FormLabel>
                                    <FormControl>
                                        <Input placeholder="이메일" {...field} disabled className="bg-slate-100" />
                                    </FormControl>
                                    <FormDescription>이메일은 변경할 수 없습니다.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>자기소개</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="간단한 자기소개를 입력하세요." className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white gap-2">
                                <Save className="w-4 h-4" /> 저장하기
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

// ----------------------------------------------------------------------
// 2. Account (Security) Form Component
// ----------------------------------------------------------------------

const accountFormSchema = z.object({
    currentPassword: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
    newPassword: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
})

type AccountFormValues = z.infer<typeof accountFormSchema>

function AccountForm() {
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    function onSubmit(data: AccountFormValues) {
        console.log(data)
        alert("비밀번호가 변경되었습니다! (Mock)")
        form.reset()
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Lock className="w-5 h-5 text-purple-600" />
                        <CardTitle>비밀번호 변경</CardTitle>
                    </div>
                    <CardDescription>계정 보안을 위해 주기적으로 비밀번호를 변경해주세요.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>현재 비밀번호</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>새 비밀번호</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>새 비밀번호 확인</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end">
                                <Button type="submit" variant="outline">비밀번호 업데이트</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="border-red-100 dark:border-red-900/50">
                <CardHeader className="bg-red-50/50 dark:bg-red-900/10">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                        <AlertTriangle className="w-5 h-5" />
                        <CardTitle>위험 구역 (Danger Zone)</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-6 flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="font-medium text-red-900 dark:text-red-200">회원 탈퇴</p>
                        <p className="text-sm text-red-700 dark:text-red-300">
                            탈퇴 시 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                        </p>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">계정 삭제</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>정말 탈퇴하시겠습니까?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    이 작업은 되돌릴 수 없습니다. 계정과 관련된 모든 데이터가 영구적으로 삭제됩니다.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>취소</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700">삭제 확인</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>
        </div>
    )
}

// ----------------------------------------------------------------------
// 3. Notifications Form Component
// ----------------------------------------------------------------------

function NotificationForm() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-amber-600" />
                    <CardTitle>이메일 알림</CardTitle>
                </div>
                <CardDescription>주요 활동에 대한 이메일 수신 여부를 설정합니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">새 회원 가입</Label>
                        <p className="text-sm text-muted-foreground">새로운 교인이 가입했을 때 알림을 받습니다.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">문의사항 접수</Label>
                        <p className="text-sm text-muted-foreground">새로운 문의가 들어오면 즉시 알림을 받습니다.</p>
                    </div>
                    <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                        <Label className="text-base">주간 리포트</Label>
                        <p className="text-sm text-muted-foreground">매주 월요일, 지난주 통계 요약을 받습니다.</p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
        </Card>
    )
}

// ----------------------------------------------------------------------
// Main Page Component
// ----------------------------------------------------------------------

import { Suspense } from 'react'

function SettingsContent() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const currentTab = searchParams.get('tab') || 'general'

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('tab', value)
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">설정 (Settings)</h1>
                <p className="text-muted-foreground">
                    계정 및 사이트 환경설정을 관리합니다.
                </p>
            </div>

            <Separator />

            <Tabs value={currentTab} onValueChange={handleTabChange} className="space-y-8">
                <div className="flex justify-center">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="general">일반 / 프로필</TabsTrigger>
                        <TabsTrigger value="notifications">알림 설정</TabsTrigger>
                        <TabsTrigger value="security">보안 / 계정</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="general" className="space-y-4">
                    <ProfileForm />
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                    <NotificationForm />
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                    <AccountForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default function SettingsPage() {
    return (
        <PageLayout
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: '설정', href: '/settings' },
            ]}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <SettingsContent />
            </Suspense>
        </PageLayout>
    )
}
