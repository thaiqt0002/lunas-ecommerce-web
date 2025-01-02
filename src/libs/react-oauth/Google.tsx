/* eslint-disable camelcase */
'use client'

import { useStore } from '@core/libs/zustand'

import authService from '@core/services/auth'

import { useGoogleOneTapLogin } from '@react-oauth/google'

const Google = () => {
  const { mutateAsync } = authService.useGoogle()
  const isLogged = useStore().use.isLogged()
  useGoogleOneTapLogin({
    disabled: isLogged,
    use_fedcm_for_prompt: true,
    onSuccess: (response) => {
      mutateAsync({
        clientId: response.clientId ?? '',
        credential: response.credential ?? '',
        select_by: response.select_by ?? '',
      })
    },
  })
  return null
}

export default Google
