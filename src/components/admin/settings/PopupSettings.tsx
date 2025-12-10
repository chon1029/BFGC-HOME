// src/components/admin/settings/PopupSettings.tsx
// 팝업 & 공지 관리 컴포넌트 - 템플릿 기반 팝업 생성

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Save, Eye, Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * 팝업 & 공지 관리 컴포넌트
 *
 * 워크플로우:
 * 1. 공지글 작성 (제목 + 내용)
 * 2. "확인" 클릭 → "팝업으로 알릴까요?" 모달
 * 3. "확인" → 템플릿 선택 + 커스터마이징
 * 4. 미리보기 → 최종 확인 → 저장
 *
 * 템플릿 종류:
 * - 🎄 특별 예배 안내
 * - 📅 행사 초대
 * - ⚠️ 긴급 공지
 * - 🎉 축하 메시지
 */
export default function PopupSettings() {
    const { toast } = useToast()
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showPreviewModal, setShowPreviewModal] = useState(false)

    // 공지글 데이터
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        template: 'special-worship',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        buttonText: '자세히 보기',
        buttonLink: '',
        buttonColor: '#38bdf8',
        enabled: false,
        startDate: '',
        endDate: '',
        displayOnce: true,
        priority: 5,
    })

    // 폼 입력 핸들러
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // "확인" 클릭 - 팝업 생성 확인 모달 표시
    const handleSubmit = () => {
        if (!formData.title || !formData.content) {
            toast({
                title: '⚠️ 입력 오류',
                description: '제목과 내용을 모두 입력해주세요.',
                variant: 'destructive',
            })
            return
        }
        setShowConfirmModal(true)
    }

    // 팝업 생성 확인
    const handleConfirmPopup = () => {
        setShowConfirmModal(false)
        // 바로 미리보기 표시
        setShowPreviewModal(true)
    }

    // 최종 저장
    const handleSave = async () => {
        try {
            // TODO: Sanity API로 저장
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: '✅ 저장 완료',
                description: '팝업이 성공적으로 저장되었습니다.',
            })

            setShowPreviewModal(false)
            // 폼 초기화
            setFormData({
                title: '',
                content: '',
                template: 'special-worship',
                backgroundColor: '#ffffff',
                textColor: '#000000',
                buttonText: '자세히 보기',
                buttonLink: '',
                buttonColor: '#38bdf8',
                enabled: false,
                startDate: '',
                endDate: '',
                displayOnce: true,
                priority: 5,
            })
        } catch (error) {
            toast({
                title: '❌ 저장 실패',
                description: '팝업 저장 중 오류가 발생했습니다.',
                variant: 'destructive',
            })
        }
    }

    // 템플릿별 스타일
    const getTemplateStyle = () => {
        switch (formData.template) {
            case 'special-worship':
                return 'bg-gradient-to-r from-purple-500 to-sky-500'
            case 'event-invitation':
                return 'bg-gradient-to-r from-sky-400 to-blue-500'
            case 'urgent-notice':
                return 'bg-gradient-to-r from-orange-400 to-red-500'
            case 'celebration':
                return 'bg-gradient-to-r from-pink-400 to-purple-500'
            default:
                return 'bg-gradient-to-r from-sky-400 to-purple-600'
        }
    }

    return (
        <div className="space-y-6">
            {/* 공지글 작성 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">공지글 작성</h3>
                <div className="grid gap-4">
                    <div>
                        <Label htmlFor="title" className="text-slate-700 font-medium">
                            공지 제목
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="예: 2025 크리스마스 특별 예배 안내"
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="content" className="text-slate-700 font-medium">
                            공지 내용
                        </Label>
                        <Textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={6}
                            placeholder="공지 내용을 입력하세요..."
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 템플릿 선택 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">팝업 템플릿</h3>
                <div>
                    <Label htmlFor="template" className="text-slate-700 font-medium">
                        템플릿 종류
                    </Label>
                    <Select
                        value={formData.template}
                        onValueChange={(value) =>
                            setFormData((prev) => ({ ...prev, template: value }))
                        }
                    >
                        <SelectTrigger className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400">
                            <SelectValue placeholder="템플릿 선택" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="special-worship">🎄 특별 예배 안내</SelectItem>
                            <SelectItem value="event-invitation">📅 행사 초대</SelectItem>
                            <SelectItem value="urgent-notice">⚠️ 긴급 공지</SelectItem>
                            <SelectItem value="celebration">🎉 축하 메시지</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 커스터마이징 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">팝업 커스터마이징</h3>
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <Label htmlFor="backgroundColor" className="text-slate-700 font-medium">
                            배경색
                        </Label>
                        <Input
                            id="backgroundColor"
                            name="backgroundColor"
                            type="color"
                            value={formData.backgroundColor}
                            onChange={handleChange}
                            className="bg-white border-slate-300 h-10 cursor-pointer"
                        />
                    </div>
                    <div>
                        <Label htmlFor="textColor" className="text-slate-700 font-medium">
                            텍스트 색상
                        </Label>
                        <Input
                            id="textColor"
                            name="textColor"
                            type="color"
                            value={formData.textColor}
                            onChange={handleChange}
                            className="bg-white border-slate-300 h-10 cursor-pointer"
                        />
                    </div>
                    <div>
                        <Label htmlFor="buttonColor" className="text-slate-700 font-medium">
                            버튼 색상
                        </Label>
                        <Input
                            id="buttonColor"
                            name="buttonColor"
                            type="color"
                            value={formData.buttonColor}
                            onChange={handleChange}
                            className="bg-white border-slate-300 h-10 cursor-pointer"
                        />
                    </div>
                    <div>
                        <Label htmlFor="buttonText" className="text-slate-700 font-medium">
                            버튼 텍스트
                        </Label>
                        <Input
                            id="buttonText"
                            name="buttonText"
                            value={formData.buttonText}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="buttonLink" className="text-slate-700 font-medium">
                            버튼 링크
                        </Label>
                        <Input
                            id="buttonLink"
                            name="buttonLink"
                            value={formData.buttonLink}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 표시 설정 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">표시 설정</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="startDate" className="text-slate-700 font-medium">
                            시작 날짜
                        </Label>
                        <Input
                            id="startDate"
                            name="startDate"
                            type="datetime-local"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="endDate" className="text-slate-700 font-medium">
                            종료 날짜
                        </Label>
                        <Input
                            id="endDate"
                            name="endDate"
                            type="datetime-local"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="displayOnce"
                            checked={formData.displayOnce}
                            onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, displayOnce: checked }))
                            }
                        />
                        <Label htmlFor="displayOnce" className="text-slate-700 font-medium">
                            오늘 하루 보지 않기
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="enabled"
                            checked={formData.enabled}
                            onCheckedChange={(checked) =>
                                setFormData((prev) => ({ ...prev, enabled: checked }))
                            }
                        />
                        <Label htmlFor="enabled" className="text-slate-700 font-medium">
                            팝업 활성화
                        </Label>
                    </div>
                </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="flex justify-end gap-2 pt-4">
                <Button
                    onClick={handleSubmit}
                    className="bg-sky-600 hover:bg-sky-700 text-white"
                >
                    <Eye className="mr-2 h-4 w-4" />
                    미리보기 & 저장
                </Button>
            </div>

            {/* 팝업 생성 확인 모달 */}
            <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
                <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                        <DialogTitle className="text-white">팝업으로 알릴까요?</DialogTitle>
                        <DialogDescription>
                            이 공지를 팝업으로 사용자에게 알립니다.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowConfirmModal(false)}
                            className="border-slate-600"
                        >
                            취소
                        </Button>
                        <Button
                            onClick={handleConfirmPopup}
                            className="bg-sky-600 hover:bg-sky-700"
                        >
                            확인
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* 팝업 미리보기 모달 */}
            <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
                <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-white">팝업 미리보기</DialogTitle>
                    </DialogHeader>
                    {/* 팝업 미리보기 */}
                    <div
                        className={`${getTemplateStyle()} p-6 rounded-lg text-center`}
                        style={{
                            backgroundColor: formData.backgroundColor,
                            color: formData.textColor,
                        }}
                    >
                        <h2 className="text-2xl font-bold mb-4">{formData.title}</h2>
                        <p className="text-sm mb-6 whitespace-pre-wrap">{formData.content}</p>
                        {formData.buttonText && (
                            <button
                                className="px-6 py-2 rounded-lg font-semibold text-white"
                                style={{ backgroundColor: formData.buttonColor }}
                            >
                                {formData.buttonText}
                            </button>
                        )}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowPreviewModal(false)}
                            className="border-slate-600"
                        >
                            수정
                        </Button>
                        <Button onClick={handleSave} className="bg-sky-600 hover:bg-sky-700">
                            <Save className="mr-2 h-4 w-4" />
                            최종 확인 & 저장
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
