'use client'
import { FC } from 'react'

import Google from './Google'

import { GoogleOAuthProvider } from '@react-oauth/google'

const ReactOauth: FC = () => {
  return (
    <GoogleOAuthProvider clientId="891151639714-mlirt06engupkrgjonsc9qlv0eifmbno.apps.googleusercontent.com">
      <Google />
    </GoogleOAuthProvider>
  )
}

export default ReactOauth
