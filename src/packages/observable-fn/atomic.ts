import { readonly } from 'vue'
import { useObservableFnState } from './state'

export function useAtomicObservableFn<Fn extends (...args: any[]) => Promise<any>>(fn: Fn) {
  const state = useObservableFnState(fn)

  async function observableFn(...args: any[]) {
    if (state.isPending) {
      throw new AtomicFunctionError('Cannot call atomic function while it is pending')
    }

    state.status = 'pending'
    state.result = undefined
    state.error = undefined

    let result

    try {
      result = await fn(...args)
    } catch (error) {
      state.error = error
      state.status = 'rejected'

      throw error
    }
    state.result = result
    state.error = null
    state.status = 'fulfilled'

    return result
  }

  return [observableFn, readonly(state)] as [Fn, ReturnType<typeof readonly<typeof state>>]
}

class AtomicFunctionError extends Error {
  constructor(...params: any[]) {
    super(...params)
  }
}
