'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { SectionHeading, Tiptap, UploadImage } from '~/components/widgets'

import { CAT_SLUG, catOptions } from '~/models/category'
import { FIleValues } from '~/models/file'
import { TPost } from '~/models/post'

import { slugify } from '~/libs/helpers'

import { PostService } from '~/services'

type FormValues = {
  desc: string
  title: string
  imgUrl?: string
  file: FIleValues | null
  catSlug: CAT_SLUG | string
}

type BlogWriteContainerProps = {
  initialData?: TPost
}

export const BlogWriteContainer = ({ initialData }: BlogWriteContainerProps) => {
  const title = initialData ? 'Edit blog' : 'Create blog'
  const action = initialData ? 'Edit' : 'Create'
  const defaultValues = initialData
    ? {
        catSlug: initialData.catSlug,
        desc: initialData.desc,
        title: initialData.title,
        imgUrl: initialData.imgUrl,
        file: null,
      }
    : {
        catSlug: '',
        desc: '',
        title: '',
        imgUrl: '',
        file: null,
      }
  const [formValues, setFormValues] = useState<FormValues>(defaultValues)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChangeForm = (value: string | FIleValues, name: keyof FormValues) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const { title, desc, imgUrl } = formValues
    return !title || !desc || !imgUrl
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (validateForm()) {
        throw new Error('Vui lòng nhập đầy đủ thông tin')
      }
      const { catSlug, desc, imgUrl, title } = formValues
      let blog = null
      if (initialData) {
        blog = await PostService.update({
          id: initialData.id,
          catSlug: catSlug,
          desc,
          imgUrl,
          slug: slugify(title),
          title,
        })
      } else {
        blog = await PostService.create({
          catSlug: catSlug,
          desc,
          imgUrl,
          slug: slugify(title),
          title,
        })
      }
      router.push(`/blogs/${blog.slug}`)
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <SectionHeading>{title}</SectionHeading>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
          <div className="col-span-12 sm:col-span-6">
            <Input
              placeholder="Title"
              value={formValues.title}
              onChange={(e) => handleChangeForm(e.target.value, 'title')}
            />
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
              imgUrl={formValues.imgUrl}
              onChange={(value) => handleChangeForm(value, 'file')}
              onChangeImgUrl={(value) => handleChangeForm(value, 'imgUrl')}
            />
          </div>
          <div className="col-span-12">
            <Tiptap content={formValues.desc} onChange={(value) => handleChangeForm(value, 'desc')} />
          </div>
        </div>
        <Button type="submit" className="mt-4" disabled={loading}>
          {action}
        </Button>
      </form>
    </div>
  )
}
