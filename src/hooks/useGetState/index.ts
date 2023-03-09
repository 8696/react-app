/**
 * @description 对 ahooks.useGetState 的补充，支持 set 后，立刻 get
 * */

import { useRef, useState } from 'react'
import { useMemoizedFn } from 'ahooks'
import type { Dispatch, SetStateAction } from 'react'
type GetStateAction<T> = () => T;

function useGetState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];

function useGetState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];

function useGetState<T>(initialData?: T): [(T | undefined), Dispatch<SetStateAction<T | undefined>>, GetStateAction<T | undefined>] {
  const ref = useRef(initialData)

  const [s, setS] = useState(initialData)

  const getState = useMemoizedFn(() => ref.current)

  const setState = useMemoizedFn((patch: any) => {
    ref.current = typeof patch === 'function' ? patch(getState()) : patch
    setS(patch)
  })

  return [s, setState, getState]
}

export default useGetState
