import { computed, reactive } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useObservableFnState<Fn extends (...args: any[]) => Promise<any>>(fn: Fn) {
  const state: ObservableFnState<Fn> = reactive({
    status: 'standby',
    result: undefined,
    error: undefined,
    isStandby: computed(() => state.status === 'standby'),
    isPending: computed(() => state.status === 'pending'),
    isFulfilled: computed(() => state.status === 'fulfilled'),
    isRejected: computed(() => state.status === 'rejected'),
    isSettled: computed(() => state.isFulfilled || state.isRejected),
  })

  return state
}

export interface ObservableFnState<Fn extends (...args: any[]) => Promise<any>> {
  status: 'standby' | 'pending' | 'fulfilled' | 'rejected'
  result?: Awaited<ReturnType<Fn>>
  error?: unknown
  isStandby: boolean
  isPending: boolean
  isFulfilled: boolean
  isRejected: boolean
  isSettled: boolean
}
