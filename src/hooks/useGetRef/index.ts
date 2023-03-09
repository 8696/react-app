import { useRef } from 'react'
import { useMemoizedFn } from 'ahooks'

function useGetRef<T>(initialData: T): [T, (value: T) => void, () => T];
function useGetRef<T = undefined>(): [T | undefined, (value: T) => void, () => T | undefined];

function useGetRef<T>(initialData?: T): [T | undefined, (value: T) => void, () => T | undefined] {
  const ref = useRef(initialData)

  const setRefData = useMemoizedFn((value: T) => {
    ref.current = value
  })

  const getRefData = useMemoizedFn(() => ref.current)

  return [ref.current, setRefData, getRefData]
}

export default useGetRef
