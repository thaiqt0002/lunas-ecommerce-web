'use client'
import { FC, ReactNode } from 'react'

interface IProps {
  children: ReactNode
}
const List: FC<IProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 gap-6 pt-2.5 sm:grid-cols-2 md:grid-cols-4">{children}</div>
  )
}

export default List
