// src/components/admin/settings/EmailSettings.tsx
// 이메일 & 알림 설정 컴포넌트 - 알림 수신자 관리

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Save, Loader2, Plus, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * 이메일 & 알림 설정 컴포넌트
 *
 * 관리 항목:
 * - 새가족 등록 알림
 * - 문의하기 알림
 * - 제자훈련 신청 알림
 * - 설교 업로드 알림
 * - 이메일 발송 설정 (발신자, 참조)
 * - 알림 방식 (이메일, 카카오톡, SMS)
 */
export default function EmailSettings() {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    // 새가족 등록 알림
    const [newcomerNotification, setNewcomerNotification] = useState({
        enabled: true,
        recipients: ['bfgc1004@gmail.com'],
        subject: '[BFGC] 새가족 등록 알림',
    })

    // 문의하기 알림
    const [contactNotification, setContactNotification] = useState({
        enabled: true,
        recipients: ['bfgc1004@gmail.com'],
        subject: '[BFGC] 새로운 문의가 접수되었습니다',
    })

    // 제자훈련 신청 알림
    const [discipleshipNotification, setDiscipleshipNotification] = useState({
        enabled: true,
        recipients: ['bfgc1004@gmail.com'],
        subject: '[BFGC] 제자훈련 신청 알림',
    })

    // 설교 업로드 알림
    const [sermonNotification, setSermonNotification] = useState<{
        enabled: boolean
        recipients: string[]
        subject: string
    }>({
        enabled: false,
        recipients: [],
        subject: '[BFGC] 새로운 설교가 업로드되었습니다',
    })

    // 이메일 발송 설정
    const [emailConfig, setEmailConfig] = useState<{
        senderName: string
        senderEmail: string
        replyTo: string
        ccEmails: string[]
    }>({
        senderName: '부다페스트한인선교교회',
        senderEmail: 'bfgc1004@gmail.com',
        replyTo: 'bfgc1004@gmail.com',
        ccEmails: [],
    })

    // 알림 방식
    const [notificationMethods, setNotificationMethods] = useState({
        emailEnabled: true,
        kakaoEnabled: false,
        smsEnabled: false,
    })

    // 새 이메일 입력 상태
    const [newEmailInputs, setNewEmailInputs] = useState({
        newcomer: '',
        contact: '',
        discipleship: '',
        sermon: '',
        cc: '',
    })

    // 이메일 추가 핸들러
    const handleAddEmail = (type: string, email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!email) {
            toast({
                title: '⚠️ 입력 오류',
                description: '이메일을 입력해주세요.',
                variant: 'destructive',
            })
            return
        }

        if (!emailRegex.test(email)) {
            toast({
                title: '⚠️ 형식 오류',
                description: '올바른 이메일 형식이 아닙니다.',
                variant: 'destructive',
            })
            return
        }

        switch (type) {
            case 'newcomer':
                setNewcomerNotification((prev) => ({
                    ...prev,
                    recipients: [...prev.recipients, email],
                }))
                setNewEmailInputs((prev) => ({ ...prev, newcomer: '' }))
                break
            case 'contact':
                setContactNotification((prev) => ({
                    ...prev,
                    recipients: [...prev.recipients, email],
                }))
                setNewEmailInputs((prev) => ({ ...prev, contact: '' }))
                break
            case 'discipleship':
                setDiscipleshipNotification((prev) => ({
                    ...prev,
                    recipients: [...prev.recipients, email],
                }))
                setNewEmailInputs((prev) => ({ ...prev, discipleship: '' }))
                break
            case 'sermon':
                setSermonNotification((prev) => ({
                    ...prev,
                    recipients: [...prev.recipients, email],
                }))
                setNewEmailInputs((prev) => ({ ...prev, sermon: '' }))
                break
            case 'cc':
                setEmailConfig((prev) => ({
                    ...prev,
                    ccEmails: [...prev.ccEmails, email],
                }))
                setNewEmailInputs((prev) => ({ ...prev, cc: '' }))
                break
        }
    }

    // 이메일 제거 핸들러
    const handleRemoveEmail = (type: string, email: string) => {
        switch (type) {
            case 'newcomer':
                setNewcomerNotification((prev) => ({
                    ...prev,
                    recipients: prev.recipients.filter((e) => e !== email),
                }))
                break
            case 'contact':
                setContactNotification((prev) => ({
                    ...prev,
                    recipients: prev.recipients.filter((e) => e !== email),
                }))
                break
            case 'discipleship':
                setDiscipleshipNotification((prev) => ({
                    ...prev,
                    recipients: prev.recipients.filter((e) => e !== email),
                }))
                break
            case 'sermon':
                setSermonNotification((prev) => ({
                    ...prev,
                    recipients: prev.recipients.filter((e) => e !== email),
                }))
                break
            case 'cc':
                setEmailConfig((prev) => ({
                    ...prev,
                    ccEmails: prev.ccEmails.filter((e) => e !== email),
                }))
                break
        }
    }

    // 저장 핸들러
    const handleSave = async () => {
        setLoading(true)

        try {
            // TODO: Sanity API로 데이터 저장
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: '✅ 저장 완료',
                description: '이메일 & 알림 설정이 성공적으로 저장되었습니다.',
            })
        } catch (error) {
            toast({
                title: '❌ 저장 실패',
                description: '설정 저장 중 오류가 발생했습니다.',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    // 이메일 리스트 렌더링 컴포넌트
    const EmailList = ({
        emails,
        type,
        inputValue,
        onInputChange,
    }: {
        emails: string[]
        type: string
        inputValue: string
        onInputChange: (value: string) => void
    }) => (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {emails.map((email) => (
                    <Badge key={email} variant="secondary" className="bg-slate-200">
                        {email}
                        <X
                            className="ml-2 h-3 w-3 cursor-pointer"
                            onClick={() => handleRemoveEmail(type, email)}
                        />
                    </Badge>
                ))}
            </div>
            <div className="flex gap-2">
                <Input
                    type="email"
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="이메일 추가"
                    className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                />
                <Button
                    onClick={() => handleAddEmail(type, inputValue)}
                    size="icon"
                    variant="outline"
                    className="border-slate-600"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )

    return (
        <div className="space-y-6">
            {/* 새가족 등록 알림 */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">새가족 등록 알림</h3>
                    <Switch
                        checked={newcomerNotification.enabled}
                        onCheckedChange={(checked) =>
                            setNewcomerNotification((prev) => ({ ...prev, enabled: checked }))
                        }
                    />
                </div>
                <div>
                    <Label className="text-slate-700 font-medium">수신자 이메일</Label>
                    <EmailList
                        emails={newcomerNotification.recipients}
                        type="newcomer"
                        inputValue={newEmailInputs.newcomer}
                        onInputChange={(value) =>
                            setNewEmailInputs((prev) => ({ ...prev, newcomer: value }))
                        }
                    />
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 문의하기 알림 */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">문의하기 알림</h3>
                    <Switch
                        checked={contactNotification.enabled}
                        onCheckedChange={(checked) =>
                            setContactNotification((prev) => ({ ...prev, enabled: checked }))
                        }
                    />
                </div>
                <div>
                    <Label className="text-slate-700 font-medium">수신자 이메일</Label>
                    <EmailList
                        emails={contactNotification.recipients}
                        type="contact"
                        inputValue={newEmailInputs.contact}
                        onInputChange={(value) =>
                            setNewEmailInputs((prev) => ({ ...prev, contact: value }))
                        }
                    />
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 제자훈련 신청 알림 */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">제자훈련 신청 알림</h3>
                    <Switch
                        checked={discipleshipNotification.enabled}
                        onCheckedChange={(checked) =>
                            setDiscipleshipNotification((prev) => ({ ...prev, enabled: checked }))
                        }
                    />
                </div>
                <div>
                    <Label className="text-slate-700 font-medium">수신자 이메일</Label>
                    <EmailList
                        emails={discipleshipNotification.recipients}
                        type="discipleship"
                        inputValue={newEmailInputs.discipleship}
                        onInputChange={(value) =>
                            setNewEmailInputs((prev) => ({ ...prev, discipleship: value }))
                        }
                    />
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 설교 업로드 알림 */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">설교 업로드 알림</h3>
                    <Switch
                        checked={sermonNotification.enabled}
                        onCheckedChange={(checked) =>
                            setSermonNotification((prev) => ({ ...prev, enabled: checked }))
                        }
                    />
                </div>
                <div>
                    <Label className="text-slate-700 font-medium">구독자 이메일</Label>
                    <EmailList
                        emails={sermonNotification.recipients}
                        type="sermon"
                        inputValue={newEmailInputs.sermon}
                        onInputChange={(value) =>
                            setNewEmailInputs((prev) => ({ ...prev, sermon: value }))
                        }
                    />
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 이메일 발송 설정 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">이메일 발송 설정</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label className="text-slate-700 font-medium">발신자 이름</Label>
                        <Input
                            value={emailConfig.senderName}
                            onChange={(e) =>
                                setEmailConfig((prev) => ({ ...prev, senderName: e.target.value }))
                            }
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label className="text-slate-700 font-medium">발신자 이메일</Label>
                        <Input
                            type="email"
                            value={emailConfig.senderEmail}
                            onChange={(e) =>
                                setEmailConfig((prev) => ({ ...prev, senderEmail: e.target.value }))
                            }
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Label className="text-slate-700 font-medium">답장 받을 이메일</Label>
                        <Input
                            type="email"
                            value={emailConfig.replyTo}
                            onChange={(e) =>
                                setEmailConfig((prev) => ({ ...prev, replyTo: e.target.value }))
                            }
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Label className="text-slate-700 font-medium">참조(CC) 이메일</Label>
                        <EmailList
                            emails={emailConfig.ccEmails}
                            type="cc"
                            inputValue={newEmailInputs.cc}
                            onInputChange={(value) =>
                                setNewEmailInputs((prev) => ({ ...prev, cc: value }))
                            }
                        />
                    </div>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 알림 방식 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">알림 방식</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-slate-700 font-medium">이메일 알림</Label>
                        <Switch
                            checked={notificationMethods.emailEnabled}
                            onCheckedChange={(checked) =>
                                setNotificationMethods((prev) => ({ ...prev, emailEnabled: checked }))
                            }
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-slate-700 font-medium">카카오톡 알림</Label>
                            <p className="text-xs text-slate-400">(추후 구현 예정)</p>
                        </div>
                        <Switch checked={false} disabled />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <Label className="text-slate-700 font-medium">SMS 알림</Label>
                            <p className="text-xs text-slate-400">(추후 구현 예정)</p>
                        </div>
                        <Switch checked={false} disabled />
                    </div>
                </div>
            </div>

            {/* 저장 버튼 */}
            <div className="flex justify-end pt-4">
                <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="bg-sky-600 hover:bg-sky-700 text-white"
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            저장 중...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            저장
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
