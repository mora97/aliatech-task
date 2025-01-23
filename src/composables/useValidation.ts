import {useLocalization} from "@/composables/useLocalization";

export const useValidation = () => {
  let errors = {}
  const { __ } = useLocalization()

  const addError = (field: String, errorMessage: String) => {
    errors[field] = errors[field] ?
      [...errors[field], errorMessage] :
      [errorMessage]
  }

  const required = (field, value) => {
    if (value.length) {
      return
    }

    addError(field, __(`required error`, { field: __(field) }))
  }

  const email = (field, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(value)) {
      return
    }

    addError(field, __('Email format is not valid'))
  }

  const password = (field, value) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{7,}$/;

    if (passwordRegex.test(value)) {
      return
    }

    addError(field, __('Password must contain letters, symbols and numbers with length more than 6'))
  }

  const allRules = {
    required,
    email,
    password
  }

  const validation = (fields: any) => {
    errors = {}

    Object.keys(fields).forEach(field => {
      const rules = fields[field].rules.split('|')

      rules.forEach(rule => {
        allRules[rule](field, fields[field].value)
      })
    })

    return errors
  }

  return {
    validation
  }
}
