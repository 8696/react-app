
export const randomString = (length: number = 32) => {
  const str = '0123456789abcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

