'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Bulletin } from '@/types/bulletin'

interface BulletinViewModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    bulletin: Bulletin | null
    onPrevious?: () => void
    onNext?: () => void
    hasPrevious?: boolean
    hasNext?: boolean
}

export function BulletinViewModal({
    open,
    onOpenChange,
    bulletin,
    onPrevious,
    onNext,
    hasPrevious = false,
    hasNext = false
}: BulletinViewModalProps) {
    if (!bulletin) return null

    const handleDownload = async (fileUrl?: string, fileName?: string) => {
        if (!fileUrl) return

        try {
            const response = await fetch(fileUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = fileName || '주보.pdf'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Download error:', error)
            window.open(fileUrl, '_blank')
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl"
                    >
                        {/* 헤더 */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{bulletin.title}</h2>
                                <p className="text-sm text-slate-500">{bulletin.date} • {bulletin.volume}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() => handleDownload(bulletin.pdfFile, `${bulletin.title}.pdf`)}
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    다운로드
                                </Button>
                                <button
                                    onClick={() => onOpenChange(false)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* PDF 뷰어 */}
                        <div className="flex-1 relative overflow-hidden">
                            {bulletin.pdfFile ? (
                                <iframe
                                    src={bulletin.pdfFile}
                                    className="w-full h-full"
                                    title={`${bulletin.title} PDF`}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-slate-500">PDF 파일을 불러올 수 없습니다.</p>
                                </div>
                            )}

                            {/* 이전/다음 네비게이션 버튼 */}
                            {hasPrevious && (
                                <button
                                    onClick={onPrevious}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all backdrop-blur-sm"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                            )}
                            {hasNext && (
                                <button
                                    onClick={onNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 dark:bg-slate-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-slate-800 transition-all backdrop-blur-sm"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
