'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface GalleryUploadModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

const CATEGORIES = ['예배', '친교', '행사', '다음세대', '선교', '기타']

export function GalleryUploadModal({ open, onOpenChange, onSuccess }: GalleryUploadModalProps) {
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [thumbnailIndex, setThumbnailIndex] = useState<number>(0)
    const [images, setImages] = useState<File[]>([])
    const [isDragging, setIsDragging] = useState(false)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        if (files.length > 0) {
            // 이미지 파일만 필터링
            const imageFiles = files.filter(file => file.type.startsWith('image/'))
            setImages(prev => [...prev, ...imageFiles])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)
            setImages(prev => [...prev, ...files])
        }
    }

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index))
        // 썸네일 인덱스 조정
        if (index === thumbnailIndex) {
            setThumbnailIndex(0)
        } else if (index < thumbnailIndex) {
            setThumbnailIndex(prev => prev - 1)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!title || !category || !date) {
            alert('필수 항목을 모두 입력해주세요.')
            return
        }

        if (images.length === 0) {
            alert('최소 한 장 이상의 사진을 업로드해주세요.')
            return
        }

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('title', title)
            formData.append('category', category)
            formData.append('date', date)
            formData.append('description', description)

            // 선택된 썸네일 이미지
            if (images[thumbnailIndex]) {
                formData.append('thumbnail', images[thumbnailIndex])
            }

            images.forEach((file) => {
                formData.append('images', file)
            })

            const response = await fetch('/api/gallery', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) throw new Error('Upload failed')

            alert('앨범이 성공적으로 등록되었습니다!')
            onSuccess?.()
            onOpenChange(false)
            // Reset form
            setTitle('')
            setCategory('')
            setDate('')
            setDescription('')
            setThumbnailIndex(0)
            setImages([])
        } catch (error) {
            console.error('Error:', error)
            alert('업로드 중 오류가 발생했습니다.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
                            <h2 className="text-xl font-bold">새 앨범 만들기</h2>
                            <button onClick={() => onOpenChange(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">앨범 제목 *</Label>
                                    <Input
                                        id="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="예: 2024 부활절 연합예배"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">카테고리 *</Label>
                                    <Select onValueChange={setCategory} required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="카테고리 선택" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map(c => (
                                                <SelectItem key={c} value={c}>{c}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="date">날짜 *</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">설명 (선택)</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="앨범에 대한 간단한 설명을 입력하세요."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-6 border-t border-slate-200 dark:border-slate-800 pt-6">
                                {/* 다중 이미지 Drag & Drop 영역 */}
                                <div className="space-y-2">
                                    <Label>사진 업로드 * (첫 번째 사진이 썸네일로 지정됩니다)</Label>
                                    <div
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={cn(
                                            "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer",
                                            isDragging
                                                ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 scale-[1.02]"
                                                : "border-slate-300 dark:border-slate-700 hover:border-sky-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        )}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileSelect}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center gap-2 pointer-events-none">
                                            <div className="p-3 bg-sky-100 dark:bg-sky-900/30 rounded-full">
                                                <Upload className="w-6 h-6 text-sky-600 dark:text-sky-400" />
                                            </div>
                                            <p className="font-medium text-slate-700 dark:text-slate-200">
                                                여기로 사진들을 끌어오거나 클릭하세요
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                여러 장의 사진을 한 번에 올릴 수 있습니다.
                                            </p>
                                        </div>
                                    </div>

                                    {/* 선택된 이미지 미리보기 및 썸네일 선택 */}
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mt-4">
                                            {images.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className={cn(
                                                        "relative aspect-square rounded-lg overflow-hidden group border-2 cursor-pointer transition-all",
                                                        thumbnailIndex === index ? "border-sky-500 ring-2 ring-sky-200" : "border-slate-200 dark:border-slate-700 hover:border-sky-300"
                                                    )}
                                                    onClick={() => setThumbnailIndex(index)}
                                                >
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Preview ${index}`}
                                                        className="w-full h-full object-cover"
                                                    />

                                                    {/* 썸네일 배지 */}
                                                    {thumbnailIndex === index && (
                                                        <div className="absolute top-1 left-1 bg-sky-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
                                                            대표
                                                        </div>
                                                    )}

                                                    {/* 삭제 버튼 */}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            removeImage(index)
                                                        }}
                                                        className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {images.length > 0 && (
                                        <p className="text-right text-sm text-slate-500">
                                            총 {images.length}장 선택됨 • 사진을 클릭하여 대표 이미지를 변경하세요.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
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
                                            앨범 등록
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
