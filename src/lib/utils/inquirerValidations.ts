export const notEmpty = (errorMsg: string) => (str: string) => {
  if (!str) return errorMsg
  return true
}
