import { useRequest } from 'ahooks'


type DataType = {
  code: number
  data: ParamsType
}

type ParamsType = {
  type: string
}

function getUsername(param: ParamsType): Promise<DataType> {
  return new Promise((resolve) => {
    console.log('param', param)
    setTimeout(() => {
      resolve({
        code: 0,
        data: param
      })
    }, 1000)
  })
}

export const useUserName = (param?: ParamsType) => {
  return useRequest<DataType, [ParamsType]>(getUsername,
    {
      defaultParams: (param ? [param] : []) as [ParamsType]
    })
}
