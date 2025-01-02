import publicServer from '@core/services/server/public'

import SeriesList from './_components/SeriesList'

export default async function Page() {
  const { bestSeries } = await publicServer.getHomePage()
  return (
    <section className="container mx-auto mt-28 flex items-center justify-center">
      <div className="max-w-[58rem] border-2 border-ui-primary-400 bg-ui-surface-50 p-4 shadow-ui-dialog md:p-16">
        <div className="relative rounded-br-[6rem] rounded-tl-[6rem] border border-ui-primary-400 p-4 md:p-10">
          <div className="flex flex-col items-center gap-y-8 py-8">
            <h2 className="text-xl font-bold sm:text-4xl">Các series nổi bật</h2>
            <SeriesList data={bestSeries} />
          </div>

          <div className="absolute left-0 top-0 translate-x-1/2 translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
            >
              <path
                d="M12.1363 0L15.055 8.98278L24 10.5L15.055 14.5344L12.1363 25L9.21764 14.5344L0 10.5L9.21764 8.98278L12.1363 0Z"
                fill="#6C70F0"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
            >
              <path
                d="M12.1363 0L15.055 8.98278L24 10.5L15.055 14.5344L12.1363 25L9.21764 14.5344L0 10.5L9.21764 8.98278L12.1363 0Z"
                fill="#6C70F0"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
