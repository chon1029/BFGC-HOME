// src/components/admin/settings/RestoreSettings.tsx
// 복원 컴포넌트 - 개별 설정 복원

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { RotateCcw, Clock, AlertTriangle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * 복원 컴포넌트
 *
 * 기능:
 * - Sanity 히스토리 API로 과거 버전 조회
 * - 개별 설정별로 복원 가능
 * - 복원 시점 선택 UI
 * - 복원 확인 모달
 */

// 복원 가능한 설정 타입
type SettingType = 'site' | 'popup' | 'email'

// 임시 히스토리 데이터 (TODO: Sanity API로 대체)
interface HistoryVersion {
    _id: string
    _updatedAt: string
    _updatedBy?: string
    title: string
}

export default function RestoreSettings() {
    const { toast } = useToast()
    const [selectedSetting, setSelectedSetting] = useState<SettingType>('site')
    const [selectedVersion, setSelectedVersion] = useState<string>('')
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [loading, setLoading] = useState(false)

    // TODO: Sanity API로 실제 히스토리 가져오기
    const [historyData] = useState<Record<SettingType, HistoryVersion[]>>({
        site: [
            {
                _id: 'site-1',
                _updatedAt: '2025-12-10T15:30:00Z',
                _updatedBy: '관리자',
                title: '사이트 관리 설정',
            },
            {
                _id: 'site-2',
                _updatedAt: '2025-12-09T10:20:00Z',
                _updatedBy: '관리자',
                title: '사이트 관리 설정',
            },
            {
                _id: 'site-3',
                _updatedAt: '2025-12-08T14:15:00Z',
                _updatedBy: '관리자',
                title: '사이트 관리 설정',
            },
        ],
        popup: [
            {
                _id: 'popup-1',
                _updatedAt: '2025-12-10T12:00:00Z',
                title: '크리스마스 예배 안내',
            },
            {
                _id: 'popup-2',
                _updatedAt: '2025-12-09T16:30:00Z',
                title: '송년 감사 예배',
            },
        ],
        email: [
            {
                _id: 'email-1',
                _updatedAt: '2025-12-10T09:00:00Z',
                title: '이메일 & 알림 설정',
            },
            {
                _id: 'email-2',
                _updatedAt: '2025-12-07T11:45:00Z',
                title: '이메일 & 알림 설정',
            },
        ],
    })

    // 날짜 포맷팅
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // 복원 버튼 클릭
    const handleRestoreClick = () => {
        if (!selectedVersion) {
            toast({
                title: '⚠️ 선택 오류',
                description: '복원할 버전을 선택해주세요.',
                variant: 'destructive',
            })
            return
        }
        setShowConfirmModal(true)
    }

    // 복원 실행
    const handleConfirmRestore = async () => {
        setLoading(true)

        try {
            // TODO: Sanity API로 복원 실행
            await new Promise((resolve) => setTimeout(resolve, 1500))

            toast({
                title: '✅ 복원 완료',
                description: '선택한 시점으로 설정이 복원되었습니다.',
            })

            setShowConfirmModal(false)
            setSelectedVersion('')
        } catch (error) {
            toast({
                title: '❌ 복원 실패',
                description: '복원 중 오류가 발생했습니다.',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    // 설정명 매핑
    const settingNames: Record<SettingType, string> = {
        site: '사이트 관리',
        popup: '팝업 & 공지',
        email: '이메일 & 알림',
    }

    // 현재 선택된 설정의 히스토리
    const currentHistory = historyData[selectedSetting]

    return (
        <div className="space-y-6">
            {/* 설정 선택 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">복원할 설정 선택</h3>
                <Select
                    value={selectedSetting}
                    onValueChange={(value) => {
                        setSelectedSetting(value as SettingType)
                        setSelectedVersion('')
                    }}
                >
                    <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400">
                        <SelectValue placeholder="설정 선택" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="site">사이트 관리</SelectItem>
                        <SelectItem value="popup">팝업 & 공지</SelectItem>
                        <SelectItem value="email">이메일 & 알림</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator className="bg-slate-200" />

            {/* 과거 버전 목록 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">
                    {settingNames[selectedSetting]} - 과거 버전 목록
                </h3>

                {currentHistory.length === 0 ? (
                    <Card className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="py-8 text-center">
                            <Clock className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                            <p className="text-slate-400">복원 가능한 버전이 없습니다.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-3">
                        {currentHistory.map((version) => (
                            <Card
                                key={version._id}
                                className={`bg-white border-slate-200 shadow-sm cursor-pointer transition-all ${selectedVersion === version._id ? 'ring-2 ring-sky-500 shadow-md' : 'hover:shadow-lg hover:border-sky-300'}`}
                                onClick={() => setSelectedVersion(version._id)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-slate-900 text-base">
                                                {version.title}
                                            </CardTitle>
                                            <CardDescription className="flex items-center gap-2 text-sm">
                                                <Clock className="h-3 w-3" />
                                                {formatDate(version._updatedAt)}
                                            </CardDescription>
                                        </div>
                                        {selectedVersion === version._id && (
                                            <div className="bg-sky-600 text-white text-xs px-2 py-1 rounded">
                                                선택됨
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                {version._updatedBy && (
                                    <CardContent className="pt-0">
                                        <p className="text-xs text-slate-400">
                                            수정자: {version._updatedBy}
                                        </p>
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* 복원 버튼 */}
            {currentHistory.length > 0 && (
                <div className="flex justify-end pt-4">
                    <Button
                        onClick={handleRestoreClick}
                        disabled={!selectedVersion}
                        className="bg-sky-600 hover:bg-sky-700 text-white"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        이 시점으로 복원
                    </Button>
                </div>
            )}

            {/* 복원 확인 모달 */}
            <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
                <DialogContent className="bg-white border-slate-200 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-slate-900 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            정말 복원하시겠습니까?
                        </DialogTitle>
                        <DialogDescription className="space-y-2">
                            <p>
                                선택한 시점으로 <strong>{settingNames[selectedSetting]}</strong>{' '}
                                설정이 복원됩니다.
                            </p>
                            <p className="text-orange-400">
                                ⚠️ 현재 설정이 선택한 버전으로 덮어씌워집니다.
                            </p>
                            <p className="text-xs text-slate-400">
                                복원 시점:{' '}
                                {selectedVersion &&
                                    formatDate(
                                        currentHistory.find((v) => v._id === selectedVersion)
                                            ?._updatedAt || '',
                                    )}
                            </p>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowConfirmModal(false)}
                            disabled={loading}
                            className="border-slate-600"
                        >
                            취소
                        </Button>
                        <Button
                            onClick={handleConfirmRestore}
                            disabled={loading}
                            className="bg-sky-600 hover:bg-sky-700"
                        >
                            {loading ? (
                                <>
                                    <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                                    복원 중...
                                </>
                            ) : (
                                <>
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    복원 실행
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
