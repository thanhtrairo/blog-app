import { NextRequest, NextResponse } from 'next/server'
import sha1 from 'sha1'

const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME
const cloudinaryPresetName = process.env.CLOUDINARY_PRESET_NAME

export const POST = async (req: NextRequest) => {
  try {
    if (!cloudinaryPresetName || !cloudinaryPresetName) {
      throw new Error('cloudinaryCloudName or cloudinaryPresetName not found')
    }
    const formData = await req.formData()
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME || '')
    const { searchParams } = new URL(req.url)
    const resourceType = searchParams.get('resource_type')
    const file = formData.get('file')
    if (!file) {
      return NextResponse.json({ success: false, message: 'no image found' })
    }

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      },
    )
    const uploadedImageData = await uploadResponse.json()
    return NextResponse.json({
      uploadedImageData,
      message: 'Success',
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({ message: 'Error', status: 500 })
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get('url')
    if (!url || !cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
      return NextResponse.json({
        success: false,
        message: 'url, cloudinaryApiSecret, cloudinaryApiKey or cloudinaryCloudName invalid',
      })
    }
    const regex = /\/upload\/v\d+\/(uploadimages\/[^.]+)\.\w{3,4}$/
    const publicId = url.match(regex)
    if (!publicId) {
      return NextResponse.json({ success: false, message: 'no url found' })
    }
    const timestamp = new Date().getTime().toString()
    const string = `public_id=${publicId[1]}&timestamp=${timestamp}${cloudinaryApiSecret}`
    const signature = sha1(string)

    const formData = new FormData()
    formData.append('public_id', publicId[1])
    formData.append('signature', signature)
    formData.append('api_key', cloudinaryApiKey)
    formData.append('timestamp', timestamp)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/destroy`, {
      method: 'POST',
      body: formData,
    })
    await res.json()
    return NextResponse.json({
      message: 'Success',
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({ message: 'Error', status: 500 })
  }
}
