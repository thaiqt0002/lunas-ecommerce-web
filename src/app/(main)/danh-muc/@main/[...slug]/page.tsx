import publicServer from '@core/services/server/public'

import DataList from './_components/DataList'

interface IParams {
  params: Promise<{
    slug: string[]
  }>
}
export default async function Page({ params }: IParams) {
  const [parent, sub] = (await params).slug
  const categories = await publicServer.getCategories()
  const parentUuid = categories.find((category) => category.slug === parent)?.uuid
  const subUuid = categories
    .find((category) => category.sub.some(({ slug }) => slug === sub))
    ?.sub.find(({ slug }) => slug === sub)?.uuid
  return <DataList parentUuid={parentUuid} subUuid={subUuid} />
}
