import { cn } from '@core/libs/cn'

import publicServer from '@core/services/server/public'

import BadgeList from './_components/BadgeList'
import ProductList from './_components/ProductList'
import Provider from './_components/Provider'
import Card from '../_components/Card'

export default async function Page() {
  const { bestSeller } = await publicServer.getHomePage()
  return (
    <section className={cn('container mt-28')}>
      <div
        className={cn(
          'max-w-[75rem]',
          'border-[3px] border-ui-primary-200',
          'p-10',
          'bg-ui-surface-50 shadow-ui-dialog',
        )}
      >
        <Provider>
          <Card title="Danh sách bán chạy">
            <BadgeList />
            <ProductList data={bestSeller} />
          </Card>
        </Provider>
      </div>
    </section>
  )
}
