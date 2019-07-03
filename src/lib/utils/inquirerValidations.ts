export const notEmpty = (errorMsg: string) => (str: string) => {
  if (!str) return errorMsg
  return true
}

export const isURL = (errorMsg: string) => (str: string) => {
  const regex = /^((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))$/g
  if (!regex.test(str)) return errorMsg
  return true
}
