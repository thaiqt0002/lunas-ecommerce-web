import publicServer from '@core/services/server/public'

import Content from './_components/Content'
import MainItem from './_components/MainItem'
import SeeMoreBtn from '../_components/SeeMoreBtn'

export default async function Page() {
  const { gsc } = await publicServer.getHomePage()
  return (
    <section className="container mx-auto mt-28 flex justify-center">
      <div className="max-w-[60rem] rounded-xl border-[3px] border-ui-primary-300 bg-ui-surface-50 p-8 shadow-ui-dialog">
        <div className="relative flex flex-col items-center gap-y-4 rounded-br-[2.5rem] rounded-tl-[2.5rem] border-[3px] border-ui-primary-400 px-10 py-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr]">
            {!!gsc[0] && <MainItem data={gsc[0]} />}
            <Content data={gsc.slice(1)} />
          </div>
          <SeeMoreBtn />
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
