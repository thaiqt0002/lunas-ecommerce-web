import publicServer from '@core/services/server/public'

interface IParams {
  params: Promise<{ slug: string }>
}
export default async function Page({ params }: IParams) {
  const { slug } = await params
  const uuid = slug.split('_')[1]
  const { product } = await publicServer.getProductDetail(uuid)
  return (
    <div className="flex flex-col gap-y-8 rounded-3xl bg-ui-surface-50 p-8 shadow-ui-flat">
      <div className="flex flex-col gap-y-4 px-2">
        <h3 className="text-ui-h1 font-bold text-ui-primary-500">Tag</h3>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag, index) => (
            <div
              key={tag.id}
              className="rounded-full bg-ui-primary-400 px-3 py-1 text-ui-small-note font-bold text-ui-text-50 shadow-ui-flat"
            >
              {tag.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 rounded-xl border-2 border-ui-primary-400 px-6 pb-6 pt-4">
        <h3 className="text-ui-h1 font-bold text-ui-primary-500">Mô tả sản phẩm</h3>
        <div className="whitespace-pre-wrap text-base text-ui-text-600">{product.description}</div>
      </div>
    </div>
  )
}
