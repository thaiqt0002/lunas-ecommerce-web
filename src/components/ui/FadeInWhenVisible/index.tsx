import React from 'react'

import { motion } from 'framer-motion'

interface FadInWhenVisibleProps {
  children: React.ReactNode
}
const FadInWhenVisible = ({ children }: FadInWhenVisibleProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      {children}
    </motion.div>
  )
}

export default FadInWhenVisible
