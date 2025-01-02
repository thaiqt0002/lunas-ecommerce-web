import { ScrollArea, ScrollBar } from '@customafk/lunas-ui/Atoms/ScrollBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="relative">
      {children}
      <ScrollBar />
    </ScrollArea>
  )
}
