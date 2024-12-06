export type TFile = {
  asset_id: string
  url: string
  original_extension: string
  original_filename: string
  format: string
  resource_type: string
  created_at: string
}

export type CreateFileRes = {
  message: 'Success' | 'Error'
  status: number
  uploadedImageData: TFile
}
