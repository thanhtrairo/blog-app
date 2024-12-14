import { Metadata } from 'next'

import { LoginContainer } from '~/screens/auth/containers'

export const metadata: Metadata = {
  title: 'Login | thanhtrairo',
}

const LoginPage = () => {
  return <LoginContainer />
}

export default LoginPage
