import publicServer from '@core/services/server/public'

import Footer from '@core/components/layouts/Footer'

import Categories from './_components/Categories'

export async function generateStaticParams() {
  const categories = await publicServer.getCategories()
  const parentCategories = categories.map((category) => ({
    slug: [category.slug],
  }))
  const subCategories: { slug: string[] }[] = []
  categories.map((category) => {
    category.sub.map((child) => {
      subCategories.push({
        slug: [category.slug, child.slug],
      })
    })
  })
  return [...parentCategories, ...subCategories]
}

export default function Layout({
  main,
  breadcrumb,
}: {
  main: React.ReactNode
  breadcrumb: React.ReactNode
}) {
  return (
    <>
      {breadcrumb}
      <section className="container">
        <Categories>{main}</Categories>
      </section>
      <Footer />
    </>
  )
}
