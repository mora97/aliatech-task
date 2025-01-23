import fa from './locales/fa.json'

const translate = (locale = '', key: string, params: Array<any> | null = null) => {
  let translatedKey = ''

  switch (locale) {
    case 'fa':
      translatedKey = fa[key]
      break
    default:
      translatedKey = ''
  }

  const regex = /\[(.*?)\]/g

  if (params) {
    translatedKey = translatedKey.replace(regex, (substring, value) => {
      return params[value]
    })
  }

  return translatedKey
}

export default translate
