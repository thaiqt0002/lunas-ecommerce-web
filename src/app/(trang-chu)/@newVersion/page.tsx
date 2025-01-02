import publicServer from '@core/services/server/public'

import Card from './_components/Card'
import List from './_components/List'

export default async function Page() {
  const { newVersionProduct } = await publicServer.getHomePage()
  return (
    <section className="mt-28 flex min-h-[28.25rem] w-screen flex-col items-center gap-y-3 bg-ui-tertiary-600 py-6">
      <div className="flex flex-col items-center text-ui-text-50">
        <h2 className="text-ui-h1 font-black">VER MỚI?</h2>
        <p className="text-ui-note font-bold">Những sản phẩm với chủ đề mới</p>
      </div>
      <List>
        {newVersionProduct.map((item) => (
          <Card
            key={item.series.uuid}
            data={{
              seriesName: item.series.name,
              products: item.product.slice(0, 5).map((product) => ({
                uuid: product.uuid,
                name: product.name,
                salePrice: product.salePrice,
                thumbnail: product.thumbnail,
              })),
            }}
          />
        ))}
      </List>
    </section>
  )
}
