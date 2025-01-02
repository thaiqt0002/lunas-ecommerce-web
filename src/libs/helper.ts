import { AUTH_URL, IMAGE_URL } from '@core/constants'

class Helper {
  public formatFullName(firstName: string, lastName: string): string {
    firstName = firstName.trim().charAt(0).toUpperCase() + firstName.trim().toLowerCase().slice(1)
    lastName = lastName.trim().charAt(0).toUpperCase() + lastName.trim().toLowerCase().slice(1)
    return `${firstName} ${lastName}`
  }

  public sleep = (ms: number) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms)
    })

  public convertToSlug(text: string): string {
    const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return text
      .toString()
      .toLowerCase()
      .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
      .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
      .replace(/đ/gi, 'd')
      .replace(/\s+/g, '-')
      .replace(p, (c) => b.charAt(a.indexOf(c)))
      .replace(/&/g, '-and-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  public formatVietnameseCurrency = (price: number | string): string => {
    if (typeof price === 'string') price = parseFloat(price)
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 2,
    }).format(price)
  }

  public openGoogleAuth = () => {
    const left = window.screen.width / 2 - 250
    const top = window.screen.height / 2 - 300
    const win = window.open(
      'https://dev.api.lunas.vn/api/v1/auth/google',
      'Dang nhap',
      `width=500,height=600,top=${top},left=${left}`,
    )

    const checkConnect = setInterval(() => {
      if (!win || !win.closed) return
      clearInterval(checkConnect)
      window.location.href = '/'
    }, 100)
  }
  joinArrayAddress = (strs: string[]) => {
    return strs.join(', ')
  }

  public openAuthLogin = () => {
    const left = window.screen.width / 2 - 250
    const top = window.screen.height / 2 - 300
    const win = window.open(
      `${AUTH_URL}/?open=store`,
      'Dang nhap',
      `width=460,height=480,top=${top},left=${left}`,
    )

    const checkConnect = setInterval(() => {
      if (!win || !win.closed) return
      clearInterval(checkConnect)
      window.location.href = '/'
    })
  }
  public openAuthSignUp = () => {
    const left = window.screen.width / 2 - 250
    const top = window.screen.height / 2 - 300
    const win = window.open(
      `${AUTH_URL}/dang-ky?open=store`,
      'Dang ',
      `width=460,height=480,top=${top},left=${left}`,
    )
  }

  public deleteCookie = (name: string, domain: string = '.lunas.vn') => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`
  }

  public getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift()
    return undefined
  }

  public convertImageUrl = (url: string): string => {
    const imageDomain = IMAGE_URL
    return `${imageDomain}/${url}`
  }

  public removeSquareBracket = (str: string): string => {
    return str.replace(/\[.*?\]/g, '').trim()
  }
}
const helper = new Helper()
export { helper }
