'use client'
import React, { useEffect, useRef } from 'react'

import { channels, MSG_URL } from '@core/constants'

import {
  EBroadcastType,
  EIframeFrom,
  EIframeType,
  TBroadcastMessage,
  TIframeMsg,
} from '@core/types/base'

import { useQueryClient } from '@tanstack/react-query'

const MessageComponent = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const queryClient = useQueryClient()

  // LISTEN FROM IFRAME
  useEffect(() => {
    if (!iframeRef.current) return
    const msgListener = ({ origin, data }: MessageEvent<TIframeMsg>) => {
      if (origin !== MSG_URL) return
      if (data.from === 'auth.lunas.vn' && data.action === 'LOGGED_IN') {
        queryClient.invalidateQueries({ queryKey: ['GET_ME'] })
      }
      if (data.from === 'auth.lunas.vn' && data.action === 'LOGOUT') {
        queryClient.invalidateQueries({ queryKey: ['GET_ME'] })
      }
      if (data.from === 'payment.lunas.vn' && data.action === 'LOGOUT') {
        queryClient.invalidateQueries({ queryKey: ['GET_ME'] })
      }
    }
    window.addEventListener('message', msgListener)
    return () => window.removeEventListener('message', msgListener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // LISTEN FROM BROADCAST CHANNEL
  useEffect(() => {
    const authChannel = new BroadcastChannel(channels.auth)
    authChannel.onmessage = ({ data }: MessageEvent<TBroadcastMessage>) => {
      if (data.type === EBroadcastType.Auth && data.action === 'LOGOUT') {
        queryClient
          .invalidateQueries({
            queryKey: ['SIGN_OUT'],
          })
          .then(() => {
            const msg: TIframeMsg = {
              type: EIframeType.Auth,
              action: 'LOGOUT',
              from: EIframeFrom.Store,
            }
            iframeRef.current?.contentWindow?.postMessage(msg, MSG_URL)
            queryClient.invalidateQueries({ queryKey: ['GET_ME'] })
          })
      }
    }
    return () => authChannel.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <iframe ref={iframeRef} src={MSG_URL} style={{ display: 'none' }} />
}

export default MessageComponent
