import { ScrollArea, ScrollBar } from '@customafk/lunas-ui/Atoms/ScrollBar'

import Footer from '@core/components/layouts/Footer'

export default function Layout({
  children,
  slider,
  bestSeller,
  newProduct,
  search,
  newGSC,
  newFigure,
  newVersion,
  hotSeries,
}: {
  children: React.ReactNode
  slider: React.ReactNode
  bestSeller: React.ReactNode
  newProduct: React.ReactNode
  search: React.ReactNode
  newGSC: React.ReactNode
  newFigure: React.ReactNode
  newVersion: React.ReactNode
  hotSeries: React.ReactNode
}) {
  return (
    <ScrollArea className="relative">
      {slider}
      {bestSeller}
      {newProduct}
      {search}
      {newGSC}
      {newFigure}
      {newVersion}
      {hotSeries}
      {/* {children} */}
      <Footer />
      <ScrollBar />
    </ScrollArea>
  )
}
