import { computed, reactive } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useObservableFnState<Fn extends (...args: any[]) => Promise<any>>(fn: Fn) {
  const state = reactive({
    status: 'standby' as 'standby' | 'pending' | 'fulfilled' | 'rejected',
    result: undefined as Awaited<ReturnType<Fn>> | undefined,
    error: undefined as unknown,
    isStandby: computed((): boolean => state.status === 'standby'),
    isPending: computed((): boolean => state.status === 'pending'),
    isFulfilled: computed((): boolean => state.status === 'fulfilled'),
    isRejected: computed((): boolean => state.status === 'rejected'),
    isSettled: computed((): boolean => state.isFulfilled || state.isRejected),
  })

  return state
}
