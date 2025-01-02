import SearchInput from './_components/SearchInput'

export default function Page() {
  return (
    <section className="mt-28 flex min-h-80 w-screen flex-col items-center justify-start gap-y-10 bg-ui-primary-400 pt-28">
      <div className="flex flex-col items-center text-ui-text-50">
        <h2 className="text-xl font-extrabold">BẠN TÌM GÌ ĐÓ?</h2>
        <p className="text-ui-p">Tìm sản phẩm về nhân vật, bộ truyện bạn thích!</p>
      </div>
      <SearchInput />
    </section>
  )
}
