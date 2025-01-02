'use client'

import { Controller, Form, useForm } from 'react-hook-form'
import Button from '@customafk/lunas-ui/Atoms/Button'
import Input from '@customafk/lunas-ui/Atoms/Input'
import { Textarea } from '@customafk/lunas-ui/Atoms/Textarea'

import authService from '@core/services/auth'

import { DevTool } from '@hookform/devtools'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const FormSchema = z.object({
  topic: z.string({
    message: 'Chủ đề không được để trống',
  }),
  name: z
    .string({
      message: 'Tên không được để trống',
    })
    .min(2, {
      message: 'Tên phải có ít nhất 2 ký tự',
    }),
  email: z
    .string({
      message: 'Email không được để trống',
    })
    .email({
      message: 'Email không hợp lệ',
    }),
  phoneNumber: z
    .string({
      message: 'Số điện thoại không được để trống',
    })
    .min(10, {
      message: 'Số điện thoại phải có ít nhất 10 số',
    }),
  content: z
    .string({
      message: 'Nội dung không được để trống',
    })
    .min(10, {
      message: 'Nội dung phải có ít nhất 10 ký tự',
    }),
})

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const { mutateAsync, isPending } = authService.useContactSupport()
  return (
    <main className="flex flex-col gap-y-8">
      <div>
        <h2 className="text-ui-h2 font-bold text-ui-primary-500">LIÊN HỆ VỚI LUNAS</h2>
        <p className="break-all text-ui-p font-medium">
          Bạn có thắc mắc, góp ý hoặc cần trợ giúp? Hãy chia sẻ với Lunas ngay.
        </p>
      </div>
      <Form
        control={form.control}
        className="flex flex-col gap-y-5"
        onSubmit={async ({ data }) => {
          await mutateAsync(data).finally(() => {
            form.reset({
              topic: '',
              name: '',
              email: '',
              phoneNumber: '',
              content: '',
            })
          })
        }}
      >
        <Controller
          control={form.control}
          name="topic"
          render={({ field: { value, onChange } }) => (
            <div className="flex flex-col gap-y-1">
              <label>Chủ đề</label>
              <Input
                value={value}
                placeholder="Nhập mô tả chung cho vấn đề bạn đang gặp phải..."
                onChange={({ target: { value } }) => onChange(value)}
              />
              <p className="text-ui-small-note text-ui-destructive-500">
                <ErrorMessage errors={form.formState.errors} name="topic" />
              </p>
            </div>
          )}
        />
        <div className="flex gap-x-5 *:grow">
          <Controller
            control={form.control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-y-1">
                <label>Tên</label>
                <Input
                  value={value}
                  placeholder="Nhập tên của bạn..."
                  onChange={({ target: { value } }) => onChange(value)}
                />
                <p className="text-ui-small-note text-ui-destructive-500">
                  <ErrorMessage errors={form.formState.errors} name="name" />
                </p>
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="phoneNumber"
            render={({ field: { value, onChange } }) => (
              <div className="flex flex-col gap-y-1">
                <label>Số điện thoại</label>
                <Input
                  value={value}
                  placeholder="Nhập số điện thoại của bạn..."
                  onChange={({ target: { value } }) => onChange(value)}
                />
                <p className="text-ui-small-note text-ui-destructive-500">
                  <ErrorMessage errors={form.formState.errors} name="phoneNumber" />
                </p>
              </div>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <div className="flex flex-col gap-y-1">
              <label>Email</label>
              <Input
                value={value}
                placeholder="Nhập email của bạn..."
                onChange={({ target: { value } }) => onChange(value)}
              />
              <p className="text-ui-small-note text-ui-destructive-500">
                <ErrorMessage errors={form.formState.errors} name="email" />
              </p>
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="content"
          render={({ field: { value, onChange } }) => (
            <div className="flex flex-col gap-y-1">
              <label>Nội dung</label>
              <Textarea
                value={value}
                className="border-ui-border-400"
                placeholder="Nhập mô tả chi tiết cho vấn đề bạn đang gặp phải..."
                onChange={({ target: { value } }) => onChange(value)}
              />
              <p className="text-ui-small-note text-ui-destructive-500">
                <ErrorMessage errors={form.formState.errors} name="content" />
              </p>
            </div>
          )}
        />

        <Button disabled={isPending} type="submit" className="w-32">
          Gửi
        </Button>
        <DevTool control={form.control} />
      </Form>
    </main>
  )
}
