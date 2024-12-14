'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { SectionHeading } from '~/components/widgets'

import { createSession } from '~/libs/session'

import { AuthService } from '~/services'

type FormValues = {
  username: string
  password: string
}

export const LoginContainer = () => {
  const [loading, setLoading] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    password: '',
  })
  const router = useRouter()

  const handleChangeForm = (value: string, name: keyof FormValues) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const { username, password } = formValues
    return !username || !password
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      if (validateForm()) {
        throw new Error('Vui lòng nhập đầy đủ thông tin')
      }
      setLoading(true)
      const { username, password } = formValues
      const account = await AuthService.SignIn({
        username,
        password,
      })
      await createSession(account.id)
      router.replace('/')
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-96 space-y-8">
      <SectionHeading>Sign In</SectionHeading>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Username"
            value={formValues.username}
            onChange={(e) => handleChangeForm(e.target.value, 'username')}
          />
          <Input
            placeholder="Password"
            type="password"
            value={formValues.password}
            onChange={(e) => handleChangeForm(e.target.value, 'password')}
          />
        </div>
        <Button type="submit" className="mt-4" disabled={loading}>
          Sign In
        </Button>
      </form>
    </div>
  )
}
