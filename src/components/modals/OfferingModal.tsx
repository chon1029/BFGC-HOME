'use client'

import { Copy } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'

interface OfferingModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function OfferingModal({ open, onOpenChange }: OfferingModalProps) {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        toast({
            title: "복사되었습니다",
            description: "계좌번호가 클립보드에 복사되었습니다.",
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">온라인 헌금 안내</DialogTitle>
                    <DialogDescription className="text-center">
                        하나님께 드리는 기쁨, 온라인으로도 함께할 수 있습니다.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="krw" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="krw">원화 (KRW)</TabsTrigger>
                        <TabsTrigger value="huf">포린트 (HUF)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="krw" className="space-y-4 mt-4">
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-slate-500">십일조 / 감사헌금 / 선교헌금</p>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                                        <div className="font-mono font-bold text-lg">3333-00-0000000</div>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard("3333-00-0000000")}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-right text-slate-400">카카오뱅크 (예금주: 부다페스트한인선교교회)</p>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-700 dark:text-blue-300">
                            <p className="font-bold mb-1">💡 송금 시 유의사항</p>
                            <p>보내시는 분 성함 뒤에 헌금 종류를 기재해주세요.<br />예) 홍길동(십일조), 김철수(감사)</p>
                        </div>
                    </TabsContent>

                    <TabsContent value="huf" className="space-y-4 mt-4">
                        <Card>
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <p className="text-sm font-medium text-slate-500">일반 헌금 (HUF)</p>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                                        <div className="font-mono font-bold text-lg">11700000-00000000</div>
                                        <Button variant="ghost" size="icon" onClick={() => copyToClipboard("11700000-00000000")}>
                                            <Copy className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-xs text-right text-slate-400">OTP Bank (BFGC)</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
