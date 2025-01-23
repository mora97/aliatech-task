const getCookieName = (cookie) => {
  return cookie.substr(0, cookie.indexOf('=')).trim()
}

const getCookie = (name) => {
  const strCookies = decodeURIComponent(document.cookie)
  const arrCookies = strCookies.split(';')

  const cookie = arrCookies.find((el) => {
    const cookieName = getCookieName(el)
    return name === cookieName ? el : undefined
  })

  return cookie ? cookie.trim() : undefined
}

export const useCookie = () => {
  const get = (name) => {
    const cookie = getCookie(name)

    if (cookie) {
      return cookie.substr(name.length + 1)
    }

    return undefined
  }

  const set = (name, data, expireTime, path) => {
    let expireDate = ''
    if (expireTime !== 0) {
      const date = new Date()
      date.setTime(date.getTime() + expireTime * 1000)
      expireDate = `expires=${date.toUTCString()};`
    }

    document.cookie = `${name}=${data}; ${expireDate} path=${path};`
  }

  const existed = (name) => {
    return get(name) && get(name) !== 'undefined'
  }

  const expire = (name) => {
    set(name, '', -1, '/')
  }

  return {
    get,
    set,
    expire,
    existed
  }
}
