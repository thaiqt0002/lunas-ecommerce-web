import { notFound } from 'next/navigation'

import { API_URL, RELATIVE_DATE } from '@core/constants'

import { IBaseRes } from '@core/types/base'

export class BaseServer {
  private readonly relativeDate: number = RELATIVE_DATE

  private readonly apiUrl: string = API_URL

  public request = async <T>(url: string): Promise<T> => {
    const res: IBaseRes<T> = await fetch(url, {
      next: {
        revalidate: this.relativeDate,
      },
    }).then((res) => res.json())
    if (!res?.data) {
      return notFound()
    }
    return res.data
  }
}
