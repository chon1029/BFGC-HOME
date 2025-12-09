'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const profileFormSchema = z.object({
    username: z
        .string()
        .min(2, {
            message: "이름은 2글자 이상이어야 합니다.",
        })
        .max(30, {
            message: "이름은 30글자를 넘을 수 없습니다.",
        }),
    email: z
        .string()
        .email({
            message: "올바른 이메일 형식이 아닙니다.",
        }),
    bio: z.string().max(160).min(4),
    urls: z
        .array(
            z.object({
                value: z.string().url({ message: "올바른 URL을 입력해주세요." }),
            })
        )
        .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfilePage() {
    const { data: session } = useSession()

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: "",
            email: "",
            bio: "안녕하세요! 부다페스트한인선교교회 성도입니다.",
            urls: [],
        },
        mode: "onChange",
    })

    // 세션 정보가 로드되면 폼 초기값 설정
    useEffect(() => {
        if (session?.user) {
            form.reset({
                username: session.user.name || "",
                email: session.user.email || "",
                bio: "안녕하세요! 부다페스트한인선교교회 성도입니다.",
            })
        }
    }, [session, form])

    function onSubmit(data: ProfileFormValues) {
        console.log(data)
        // TODO: Sanity에 프로필 업데이트 요청
        alert("프로필이 업데이트되었습니다! (Mock)")
    }

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">프로필</h3>
                <p className="text-sm text-muted-foreground">
                    다른 사람들에게 보여지는 내 정보를 수정합니다.
                </p>
            </div>
            <Separator />

            <div className="flex items-center gap-6 mb-8">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={session?.user?.image || ''} />
                    <AvatarFallback className="text-lg bg-sky-100 text-sky-600">
                        {session?.user?.name?.[0] || 'U'}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <Button variant="outline" size="sm">사진 변경</Button>
                    <p className="text-xs text-muted-foreground mt-2">
                        JPG, GIF or PNG. 1MB max.
                    </p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>이름</FormLabel>
                                <FormControl>
                                    <Input placeholder="이름을 입력하세요" {...field} />
                                </FormControl>
                                <FormDescription>
                                    실명을 사용하는 것을 권장합니다.
                                </FormDescription>
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
                                    <Input placeholder="이메일" {...field} disabled />
                                </FormControl>
                                <FormDescription>
                                    이메일은 변경할 수 없습니다. 관리자에게 문의하세요.
                                </FormDescription>
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
                                    <Textarea
                                        placeholder="간단한 자기소개를 입력하세요."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    다른 성도님들에게 나를 소개해보세요.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">프로필 저장</Button>
                </form>
            </Form>
        </div>
    )
}
