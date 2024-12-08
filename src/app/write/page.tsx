'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FIleValues } from '~/models/file'

import Tiptap from '~/components/tiptap'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { UploadImage } from '~/components/widgets'

import { PostService } from '~/services'

type FormValues = {
  desc: string
  title: string
  imgUrl: string
  file: FIleValues | null
  catSlug: string
}

const WritePage = () => {
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

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const { catSlug, desc, imgUrl, title } = formValues
      const blog = await PostService.create({
        catSlug: catSlug || 'style',
        desc,
        imgUrl,
        slug: slugify(title),
        title,
      })
      console.log('blog', blog)
      // router.push(`blog/${blog.slug}`)
    } catch (error) {
      console.log('PostService', { PostService })
      alert(error)
    } finally {
      setLoading(false)
    }

    // const res = await fetch('/api/posts', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     title,
    //     desc: value,
    //     img: media,
    //     slug: slugify(title),
    //     catSlug: catSlug || 'style',
    //   }),
    // })
    // if (res.status === 200) {
    //   const data = await res.json()
    //   router.push(`/posts/${data.slug}`)
    // }
  }

  return (
    <div className="relative flex flex-col">
      <Input placeholder="Title" className="" onChange={(e) => handleChangeForm(e.target.value, 'title')} />
      <UploadImage
        value={formValues.file}
        onChange={(value) => handleChangeForm(value, 'file')}
        onChangeImgUrl={(value) => handleChangeForm(value, 'imgUrl')}
      />
      <Select onValueChange={(value) => handleChangeForm(value, 'catSlug')} defaultValue={formValues.catSlug}>
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="m@example.com">m@example.com</SelectItem>
          <SelectItem value="m@google.com">m@google.com</SelectItem>
          <SelectItem value="m@support.com">m@support.com</SelectItem>
        </SelectContent>
      </Select>
      <Tiptap content={formValues.desc} onChange={(value) => handleChangeForm(value, 'desc')} />
      <Button className="" onClick={handleSubmit}>
        Publish
      </Button>
    </div>
  )
}

export default WritePage
