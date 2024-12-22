'use client'

import { useDropzone } from 'react-dropzone'
import { Camera, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState, useCallback, useEffect } from 'react'

interface AvatarUploadProps {
  initialImage: string | null
  onImageChange: (file: File) => Promise<void>
  initials?: string
}

export function AvatarUpload({ initialImage, onImageChange, initials = 'U' }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(() => initialImage || null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage)
    }
  }, [initialImage])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      try {
        setIsLoading(true)
        const previewUrl = URL.createObjectURL(file)
        setPreview(previewUrl)
        await onImageChange(file)
      } catch (error) {
        console.error('Error uploading image:', error)
        setPreview(initialImage || null)
      } finally {
        setIsLoading(false)
      }
    }
  }, [initialImage, onImageChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  })

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer",
          "w-[120px] h-[120px] rounded-full overflow-hidden",
          "bg-muted border-2 border-muted-foreground",
          "transition-all duration-200 ease-in-out",
          isDragActive && "border-sky-400 border-dashed",
          isLoading && "opacity-70"
        )}
      >
        <input {...getInputProps()} />
        {preview ? (
          <Image
            src={preview}
            alt="Profile"
            fill
            className="object-cover z-10"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-muted-foreground">
            {initials}
          </div>
        )}

        {/* Hover Overlay */}
        <div className={cn(
          "absolute inset-0 bg-black/60 flex flex-col items-center justify-center",
          "opacity-0 group-hover:opacity-100 transition-opacity",
          "text-white text-sm gap-2"
        )}>
          <Camera className="w-6 h-6" />
          <span>Change Photo</span>
        </div>

        {isLoading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          </div>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Click or drag to upload
      </p>
    </div>
  )
}