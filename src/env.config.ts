export default {
  ...process.env
}

export const IS_DEV = process.env.NODE_ENV === 'development'
