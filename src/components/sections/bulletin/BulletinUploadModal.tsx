'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Image as ImageIcon, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface BulletinUploadModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function BulletinUploadModal({ isOpen, onClose, onSuccess }: BulletinUploadModalProps) {
    const [loading, setLoading] = useState(false)

    // Form States
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [volume, setVolume] = useState('')
    const [sermonTitle, setSermonTitle] = useState('')
    const [preacher, setPreacher] = useState('전근일 담임목사')
    const [scripture, setScripture] = useState('')

    // File States
    const [thumbnail, setThumbnail] = useState<File | null>(null)
    const [pdfFile, setPdfFile] = useState<File | null>(null)

    // Drag States
    const [isDraggingThumbnail, setIsDraggingThumbnail] = useState(false)
    const [isDraggingPdf, setIsDraggingPdf] = useState(false)

    // Drag Handlers
    const handleDragOver = (e: React.DragEvent, setDragging: (v: boolean) => void) => {
        e.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent, setDragging: (v: boolean) => void) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDrop = (e: React.DragEvent, setFile: (f: File | null) => void, setDragging: (v: boolean) => void, type: 'image' | 'pdf') => {
        e.preventDefault()
        setDragging(false)

        const file = e.dataTransfer.files[0]
        if (file) {
            if (type === 'image' && file.type.startsWith('image/')) {
                setFile(file)
            } else if (type === 'pdf' && file.type === 'application/pdf') {
                setFile(file)
            } else {
                alert(type === 'image' ? '이미지 파일만 가능합니다.' : 'PDF 파일만 가능합니다.')
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !date || !thumbnail || !pdfFile) {
            alert('필수 항목(제목, 날짜, 썸네일, PDF)을 모두 입력해주세요.')
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('date', date)
            formData.append('volume', volume)
            formData.append('sermonTitle', sermonTitle)
            formData.append('preacher', preacher)
            formData.append('scripture', scripture)
            formData.append('thumbnail', thumbnail)
            formData.append('pdfFile', pdfFile)

            const response = await fetch('/api/bulletin', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) throw new Error('Upload failed')

            alert('주보가 성공적으로 등록되었습니다!')
            onSuccess()
            onClose()

            // Reset
            setTitle('')
            setDate('')
            setVolume('')
            setSermonTitle('')
            setScripture('')
            setThumbnail(null)
            setPdfFile(null)
        } catch (error) {
            console.error('Error:', error)
            alert('업로드 중 오류가 발생했습니다.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
                            <h2 className="text-xl font-bold">주보 등록하기</h2>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* 기본 정보 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="date">날짜 *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => {
                                            setDate(e.target.value)
                                            // 날짜 선택 시 제목 자동 생성 (선택 사항)
                                            if (!title) setTitle(`${e.target.value.split('-')[0]}년 ${parseInt(e.target.value.split('-')[1])}월 ${parseInt(e.target.value.split('-')[2])}일 주보`)
                                        }}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title">제목 *</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="예: 2024년 3월 31일 주보"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="volume">권/호</Label>
                                    <Input
                                        id="volume"
                                        value={volume}
                                        onChange={(e) => setVolume(e.target.value)}
                                        placeholder="예: 제 32권 13호"
                                    />
                                </div>
                            </div>

                            {/* 설교 정보 */}
                            <div className="space-y-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">설교 정보</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="sermonTitle">설교 제목</Label>
                                        <Input
                                            id="sermonTitle"
                                            value={sermonTitle}
                                            onChange={(e) => setSermonTitle(e.target.value)}
                                            placeholder="예: 부활의 소망을 품으라"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="scripture">성경 본문</Label>
                                        <Input
                                            id="scripture"
                                            value={scripture}
                                            onChange={(e) => setScripture(e.target.value)}
                                            placeholder="예: 고린도전서 15:12-20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="preacher">설교자</Label>
                                        <Input
                                            id="preacher"
                                            value={preacher}
                                            onChange={(e) => setPreacher(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 파일 업로드 */}
                            <div className="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-6">

                                {/* 썸네일 */}
                                <div className="space-y-2">
                                    <Label>썸네일 이미지 (Drag & Drop) *</Label>
                                    <div
                                        onDragOver={(e) => handleDragOver(e, setIsDraggingThumbnail)}
                                        onDragLeave={(e) => handleDragLeave(e, setIsDraggingThumbnail)}
                                        onDrop={(e) => handleDrop(e, setThumbnail, setIsDraggingThumbnail, 'image')}
                                        className={cn(
                                            "relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 h-40",
                                            isDraggingThumbnail
                                                ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                                                : "border-slate-300 dark:border-slate-700 hover:border-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        )}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {thumbnail ? (
                                            <div className="relative w-full h-full">
                                                <img src={URL.createObjectURL(thumbnail)} alt="Preview" className="w-full h-full object-contain" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity text-white text-sm">
                                                    클릭하여 변경
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-full">
                                                    <ImageIcon className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                                                </div>
                                                <p className="text-sm text-slate-500">이미지 파일을 끌어오거나 클릭하세요</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* PDF 파일 */}
                                <div className="space-y-2">
                                    <Label>주보 PDF 파일 (Drag & Drop) *</Label>
                                    <div
                                        onDragOver={(e) => handleDragOver(e, setIsDraggingPdf)}
                                        onDragLeave={(e) => handleDragLeave(e, setIsDraggingPdf)}
                                        onDrop={(e) => handleDrop(e, setPdfFile, setIsDraggingPdf, 'pdf')}
                                        className={cn(
                                            "relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-2 h-32",
                                            isDraggingPdf
                                                ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                                                : "border-slate-300 dark:border-slate-700 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-900/10"
                                        )}
                                    >
                                        <input
                                            type="file"
                                            accept=".pdf"
                                            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        {pdfFile ? (
                                            <div className="flex items-center gap-3 text-red-600 font-medium">
                                                <FileText className="w-8 h-8" />
                                                <span>{pdfFile.name}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-full">
                                                    <FileText className="w-6 h-6 text-red-600 dark:text-red-400" />
                                                </div>
                                                <p className="text-sm text-slate-500">PDF 파일을 끌어오거나 클릭하세요</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
                                    취소
                                </Button>
                                <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            업로드 중...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            주보 등록
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
