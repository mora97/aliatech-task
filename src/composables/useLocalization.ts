import translate from '../localization'

export const useLocalization = () => {

  const __ = (key: string, params: any | null = null, locale = '') => {
    let currentLocale = locale.length ? locale : 'fa'

    return translate(currentLocale, key, params)
  }

  return {
    __
  }
}
