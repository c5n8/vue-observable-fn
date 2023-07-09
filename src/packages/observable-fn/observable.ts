import { readonly } from 'vue'
import { useObservableFnState } from './state'

export function useObservableFn<Fn extends (...args: any[]) => Promise<any>>(fn: Fn) {
  const state = useObservableFnState(fn)

  let lastPromise

  async function observableFn(...args: any[]) {
    state.status = 'pending'
    state.result = undefined
    state.error = undefined
    let result
    const promise = fn(...args)
    lastPromise = promise

    try {
      result = await promise
    } catch (error) {
      if (lastPromise === promise) {
        state.error = error
        state.status = 'rejected'
      }

      throw error
    }

    if (lastPromise === promise) {
      state.result = result
      state.error = null
      state.status = 'fulfilled'
    }

    return result
  }

  return [observableFn, readonly(state)] as [Fn, ReturnType<typeof readonly<typeof state>>]
}
