import axios, { AxiosRequestConfig } from 'axios'
import MockAdapter from 'axios-mock-adapter'

export const startMock = () => {
  const mock: MockAdapter = new MockAdapter(axios)
  mock.onGet(new RegExp('/axios-mock-adapter/get'))
    .reply((config: AxiosRequestConfig) => {
      console.log('mock: /axios-mock-adapter/get')
      console.log(config)
      return new Promise(async (resolve) => {
        resolve([
          200,
          {
            code: 100,
            message: 'ok',
            data: true
          }
        ])
      })
    })
  mock.onAny().passThrough()
}
