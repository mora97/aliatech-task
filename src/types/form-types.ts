type FormSectionType = {
  title: String
  type: String
  required: Boolean
  properties: Array<String>
}

export interface CreateFormType {
  type: String
  title: String
  description: String
  sections: Array<FormSectionType>
}

export interface UpdateFormType extends CreateFormType {
  formId: String
}
