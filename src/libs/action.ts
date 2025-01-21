'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const reloadCache = (path: string) => {
  revalidatePath(path)
  redirect(path)
}
