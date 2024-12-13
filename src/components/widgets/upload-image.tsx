'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Input } from '../ui/input'
import { Label } from '../ui/label'

import { FIleValues, validateImage } from '~/models/file'

import { FileService } from '~/services'

type UploadImageProps = {
  value: FIleValues | null
  onChange: (value: FIleValues) => void
  onChangeImgUrl: (imgUrl: string) => void
}

export const UploadImage = ({ value, onChange, onChangeImgUrl }: UploadImageProps) => {
  const [loading, setLoading] = useState(false)

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      const file = e.target.files?.[0]
      if (file) {
        const error = validateImage(file)
        if (error) {
          throw new Error(error)
        }
        const formData = new FormData()
        formData.append('file', file)
        const { uploadedImageData } = await FileService.create(formData)
        onChange(Object.assign(file, { url: uploadedImageData.url }))
        onChangeImgUrl(uploadedImageData.url)
      }
      e.target.value = ''
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      {value && (
        <div className="relative h-60 w-60 overflow-hidden rounded-md">
          <Image
            fill={true}
            className="object-cover"
            alt="Image"
            src={value.url}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div>
        <Label
          htmlFor="image-upload"
          className={`cursor-pointer rounded-xl border border-input bg-white px-4 py-2 hover:bg-accent hover:text-accent-foreground ${loading && 'cursor-default hover:bg-white disabled:pointer-events-none'} dark:bg-accent`}
        >
          select image
        </Label>
        <Input
          disabled={loading}
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleChangeFile}
        />
      </div>
    </div>
  )
}
