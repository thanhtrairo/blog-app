'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Tiptap from '~/components/tiptap'

type FormValues = {
  desc: string
  title: string
  img: string
  slug: string
  catSlug: string
}

const WritePage = () => {
  const router = useRouter()
  const [formValues, setFormValues] = useState<FormValues>({
    catSlug: '',
    desc: '',
    title: '',
    img: '',
    slug: '',
  })

  console.log('formValues', formValues)

  const handleChangeForm = (value: string, name: keyof FormValues) => {
    console.log('value', value)
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')

  const handleSubmit = async () => {
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
    <div className="">
      <input type="text" placeholder="Title" className="" onChange={(e) => handleChangeForm(e.target.value, 'title')} />
      <select className="" onChange={(e) => handleChangeForm(e.target.value, 'catSlug')}>
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <Tiptap content={formValues.desc} onChange={(value) => handleChangeForm(value, 'desc')} />
      <button className="" onClick={handleSubmit}>
        Publish
      </button>
    </div>
  )
}

export default WritePage
