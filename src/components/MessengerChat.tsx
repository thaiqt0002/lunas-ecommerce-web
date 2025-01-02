'use client'
import { FC } from 'react'

import { MessengerSvg } from './svgs'

const MessengerChat: FC = () => {
  return (
    <button
      className="fixed bottom-4 right-4 z-[9999] rounded-full p-2 text-ui-text-100 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #00B2FF, #006AFF)',
      }}
      onClick={() => window.open('https://m.me/313203715207637', '_blank')}
    >
      <MessengerSvg />
    </button>
  )
}

export default MessengerChat
