// const BASE_URL = 'http://localhost:3000/api/v1'
//通过环境变量来切换环境
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://101.43.155.53:9001/'
    : 'http://101.43.155.53:9001/'

const TIME_OUT = 5000

export { BASE_URL, TIME_OUT }
