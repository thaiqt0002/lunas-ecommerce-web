import { cn } from '@core/libs/cn'

import publicServer from '@core/services/server/public'

import BadgeList from './_components/BadgeList'
import ProductList from './_components/ProductList'
import Provider from './_components/Provider'
import Card from '../_components/Card'

export default async function Page() {
  const { newProduct } = await publicServer.getHomePage()
  return (
    <section className="container mx-auto mt-28">
      <div
        className={cn(
          'border-[3px] border-ui-primary-200',
          'p-10',
          'bg-ui-surface-50 shadow-ui-dialog',
        )}
      >
        <Provider>
          <Card title="Vừa được lên kệ">
            <BadgeList />
            <div className="absolute top-24 w-full">
              <ProductList data={newProduct} />
            </div>
          </Card>
        </Provider>
      </div>
    </section>
  )
}
