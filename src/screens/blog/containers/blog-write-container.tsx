'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Tiptap, UploadImage } from '~/components/widgets'

import { CAT_SLUG, catOptions } from '~/models/category'
import { FIleValues } from '~/models/file'

import { slugify } from '~/utils/helpers'

import { PostService } from '~/services'

type FormValues = {
  desc: string
  title: string
  imgUrl: string
  file: FIleValues | null
  catSlug: CAT_SLUG | string
}

export const BlogWriteContainer = () => {
  const router = useRouter()
  const [formValues, setFormValues] = useState<FormValues>({
    catSlug: '',
    desc: '',
    title: '',
    imgUrl: '',
    file: null,
  })
  const [loading, setLoading] = useState(false)

  const handleChangeForm = (value: string | FIleValues, name: keyof FormValues) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const { title, desc, imgUrl, file } = formValues
    return !title || !desc || !imgUrl || !file
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      if (validateForm()) {
        throw new Error('Vui lòng nhập đầy đủ thông tin')
      }
      const { catSlug, desc, imgUrl, title } = formValues
      const blog = await PostService.create({
        catSlug: catSlug,
        desc,
        imgUrl,
        slug: slugify(title),
        title,
      })
      router.push(`blogs/${blog.slug}`)
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
        <div className="col-span-12 sm:col-span-6">
          <Input placeholder="Title" className="" onChange={(e) => handleChangeForm(e.target.value, 'title')} />
        </div>
        <div className="col-span-12 sm:col-span-6 md:col-span-3">
          <Select onValueChange={(value) => handleChangeForm(value, 'catSlug')} defaultValue={formValues.catSlug}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {catOptions.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-12">
          <UploadImage
            value={formValues.file}
            onChange={(value) => handleChangeForm(value, 'file')}
            onChangeImgUrl={(value) => handleChangeForm(value, 'imgUrl')}
          />
        </div>
        <div className="col-span-12">
          <Tiptap content={formValues.desc} onChange={(value) => handleChangeForm(value, 'desc')} />
        </div>
      </div>
      <Button className="mt-4" disabled={loading} onClick={handleSubmit}>
        Publish
      </Button>
    </div>
  )
}
