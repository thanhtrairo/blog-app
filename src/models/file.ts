export type TFile = {
  asset_id: string
  url: string
  original_extension: string
  original_filename: string
  format: string
  resource_type: string
  created_at: string
}

export type FIleValues = Pick<TFile, 'url'> & File

export type CreateFileRes = {
  message: 'Success' | 'Error'
  status: number
  uploadedImageData: TFile
}

const VIDEO_SIZE_MAX = 1024 * 1024 * 100 // 100 MB
const IMAGE_SIZE_MAX = 1024 * 1024 * 5 // 5 MB

const validImage = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
const validVideo = ['video/mp4', 'video/avi', 'video/mov', 'video/flv', 'video/wmv']

export const validateImage = (file: File) => {
  if (!validImage.includes(file.type)) {
    return 'Ảnh không đúng định dạng'
  }

  if (file.size > IMAGE_SIZE_MAX) {
    return 'Ảnh không được lớn hơn 5 MB'
  }

  return false
}

export const validateVideo = (file: File) => {
  if (!validVideo.includes(file.type)) {
    return 'Video không đúng định dạng'
  }

  if (file.size > VIDEO_SIZE_MAX) {
    return 'Video không được lớn hơn 100 MB'
  }

  return false
}
