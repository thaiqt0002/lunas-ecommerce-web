import Image from 'next/image'
import Link from 'next/link'
import Button from '@customafk/lunas-ui/Atoms/Button'

export default function NotFound() {
  return (
    <div className="flex size-full flex-col items-center gap-y-4 pt-12">
      <Image src="/images/not-found.png" alt="404" width={640} height={640} />
      <div className="flex flex-col items-center gap-y-4">
        <p className="text-2xl font-semibold text-ui-text-500">
          Chúng tôi xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Button size="large">
          <Link href="/" className="text-ui-text-50">
            Quay lại trang chủ
          </Link>
        </Button>
      </div>
    </div>
  )
}
