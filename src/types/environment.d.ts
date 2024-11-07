export interface EnvUrl {
  login: string
  loginAction: string
  loginResetCredentials: string
  registration: string
  registrationAction: string
  resourcesPath: string
}

export interface EnvTitle {
  logoTitle: string,
  mainTitle: string,
  mainSubtitle: string,
  registerTitle: string,
  loginTitle: string,
  verifyEmailTitle: string,
  checkEmailTitle: string,
  resetPasswordTitle: string,
  termsAndPrivacy: string
}

export interface EnvPermission {
  loginWithEmailAllowed: boolean
  password: boolean
  passwordRequired: boolean
  registrationAllowed: boolean
  registrationEmailAsUsername: boolean
  registrationDisabled: boolean
  rememberMe: boolean
  resetPasswordAllowed: boolean
  usernameEditDisabled: boolean
}

export interface EnvLabel {
  backToLogin: string
  confirmLinkIdpContinue: string
  doClickHere: string
  doForgotPassword: string
  doLogIn: string
  doRegister: string
  doSubmit: string
  or: string
  email: string
  firstName: string
  lastName: string
  noAccount: string
  password: string
  passwordConfirm: string
  rememberMe: string
  username: string
  usernameOrEmail: string
}

export interface EnvForm {
  loginUsername: string
  loginRememberMe: boolean
  registerEmail: string
  registerFirstName: string
  registerLastName: string
  registerUsername: string
  selectedCredential: string
}

export interface EnvUser {
  email: string
  firstName: string
  lastName: string
  username: string
}

export interface EnvValidation {
  email: string
  firstName: string
  lastName: string
  password: string
  passwordConfirm: string
  username: string
  usernameOrPassword: string
}

export interface EnvMessage {
  type: string
  summary: string
}

export interface EnvInstruction {
  emailLinkIdp1: string
  emailLinkIdp2: string
  emailLinkIdp3: string
  emailLinkIdp4: string
  emailLinkIdp5: string
}

export interface EnvSocial {
  alias: string
  displayName: string
  loginUrl: string
}

export interface Environment {
  forms: EnvForm
  instruction: EnvInstruction
  labels: EnvLabel
  message: EnvMessage
  permissions: EnvPermission
  titles: EnvTitle
  urls: EnvUrl
  user: EnvUser
  validations: EnvValidation
  social: EnvSocial[]
}
