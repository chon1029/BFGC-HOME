// src/components/admin/settings/SiteSettings.tsx
// 사이트 관리 컴포넌트 - SEO, 연락처, 예배 시간 등

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Save, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

/**
 * 사이트 관리 컴포넌트
 *
 * 관리 항목:
 * - 교회 기본 정보 (교회명, 소개, 로고)
 * - SEO 설정 (메타 제목, 설명, 키워드, OG 이미지)
 * - 연락처 정보 (전화, 이메일, 주소, 카카오톡, 지도)
 * - 예배 시간 (주일, 금요, 새벽, 특별 공지)
 * - 외부 서비스 (GA, 페이스북 픽셀, 네이버)
 */
export default function SiteSettings() {
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)

    // TODO: Sanity에서 데이터 불러오기
    const [formData, setFormData] = useState({
        // 교회 기본 정보
        churchName: '부다페스트한인선교교회',
        churchDescription: '사도행전적 역사가 일어나는 교회 부다페스트 한인선교교회에 오신 것을 환영합니다!',

        // SEO 설정
        metaTitle: '부다페스트한인선교교회 | BFGC',
        metaDescription: '헝가리 부다페스트에 위치한 한인교회입니다. 예배, 선교, 양육, 치유, 교제를 통해 하나님 나라를 세워갑니다.',
        keywords: '부다페스트, 한인교회, BFGC, 헝가리, 선교교회',

        // 연락처 정보
        phone: '+36 20 320 1595',
        email: 'bfgc1004@gmail.com',
        address: '1073 Budapest, Osvát utca 16, Hungary',
        kakaoChannelUrl: '',
        googleMapUrl: '',

        // 예배 시간
        sundayService: '주일 예배: 15:00(오후 3시)',
        fridayPrayer: '금요 기도회: 19:00(저녁 7시)',
        dawnPrayer: '',
        specialNotice: '',

        // 외부 서비스
        googleAnalyticsId: '',
        facebookPixelId: '',
        naverSiteVerification: '',
    })

    // 폼 입력 핸들러
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // 저장 핸들러
    const handleSave = async () => {
        setLoading(true)

        try {
            // TODO: Sanity API로 데이터 저장
            await new Promise((resolve) => setTimeout(resolve, 1000)) // 임시 지연

            toast({
                title: '✅ 저장 완료',
                description: '사이트 설정이 성공적으로 저장되었습니다.',
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

    return (
        <div className="space-y-6">
            {/* 교회 기본 정보 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">
                    교회 기본 정보
                </h3>
                <div className="grid gap-4">
                    <div>
                        <Label htmlFor="churchName" className="text-slate-700 font-medium">
                            교회명
                        </Label>
                        <Input
                            id="churchName"
                            name="churchName"
                            value={formData.churchName}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="churchDescription" className="text-slate-700 font-medium">
                            교회 소개
                        </Label>
                        <Textarea
                            id="churchDescription"
                            name="churchDescription"
                            value={formData.churchDescription}
                            onChange={handleChange}
                            rows={4}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* SEO 설정 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">
                    SEO 설정
                </h3>
                <div className="grid gap-4">
                    <div>
                        <Label htmlFor="metaTitle" className="text-slate-700 font-medium">
                            메타 제목
                        </Label>
                        <Input
                            id="metaTitle"
                            name="metaTitle"
                            value={formData.metaTitle}
                            onChange={handleChange}
                            maxLength={60}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                        <p className="text-xs text-slate-400 mt-1">브라우저 탭에 표시되는 제목 (최대 60자)</p>
                    </div>
                    <div>
                        <Label htmlFor="metaDescription" className="text-slate-700 font-medium">
                            메타 설명
                        </Label>
                        <Textarea
                            id="metaDescription"
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleChange}
                            maxLength={160}
                            rows={3}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                        <p className="text-xs text-slate-400 mt-1">검색 결과에 표시되는 설명 (최대 160자)</p>
                    </div>
                    <div>
                        <Label htmlFor="keywords" className="text-slate-700 font-medium">
                            키워드
                        </Label>
                        <Input
                            id="keywords"
                            name="keywords"
                            value={formData.keywords}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                        <p className="text-xs text-slate-400 mt-1">쉼표로 구분 (예: 부다페스트, 한인교회)</p>
                    </div>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 연락처 정보 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">연락처 정보</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="phone" className="text-slate-700 font-medium">
                            전화번호
                        </Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email" className="text-slate-700 font-medium">
                            이메일
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <Label htmlFor="address" className="text-slate-700 font-medium">
                            주소
                        </Label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="kakaoChannelUrl" className="text-slate-700 font-medium">
                            카카오톡 채널 URL
                        </Label>
                        <Input
                            id="kakaoChannelUrl"
                            name="kakaoChannelUrl"
                            value={formData.kakaoChannelUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="googleMapUrl" className="text-slate-700 font-medium">
                            구글 지도 링크
                        </Label>
                        <Input
                            id="googleMapUrl"
                            name="googleMapUrl"
                            value={formData.googleMapUrl}
                            onChange={handleChange}
                            placeholder="https://maps.google.com/..."
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 예배 시간 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">예배 시간</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="sundayService" className="text-slate-700 font-medium">
                            주일 예배
                        </Label>
                        <Input
                            id="sundayService"
                            name="sundayService"
                            value={formData.sundayService}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="fridayPrayer" className="text-slate-700 font-medium">
                            금요 기도회
                        </Label>
                        <Input
                            id="fridayPrayer"
                            name="fridayPrayer"
                            value={formData.fridayPrayer}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="dawnPrayer" className="text-slate-700 font-medium">
                            새벽 기도회 (선택)
                        </Label>
                        <Input
                            id="dawnPrayer"
                            name="dawnPrayer"
                            value={formData.dawnPrayer}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="specialNotice" className="text-slate-700 font-medium">
                            특별 예배 공지 (선택)
                        </Label>
                        <Textarea
                            id="specialNotice"
                            name="specialNotice"
                            value={formData.specialNotice}
                            onChange={handleChange}
                            rows={2}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            {/* 외부 서비스 연동 */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold bg-gradient-to-r from-sky-500 to-purple-600 text-transparent bg-clip-text">외부 서비스 연동</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="googleAnalyticsId" className="text-slate-700 font-medium">
                            구글 애널리틱스 ID
                        </Label>
                        <Input
                            id="googleAnalyticsId"
                            name="googleAnalyticsId"
                            value={formData.googleAnalyticsId}
                            onChange={handleChange}
                            placeholder="G-XXXXXXXXXX"
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
                    </div>
                    <div>
                        <Label htmlFor="facebookPixelId" className="text-slate-700 font-medium">
                            페이스북 픽셀 ID
                        </Label>
                        <Input
                            id="facebookPixelId"
                            name="facebookPixelId"
                            value={formData.facebookPixelId}
                            onChange={handleChange}
                            className="bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-400 focus:ring-sky-400"
                        />
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
