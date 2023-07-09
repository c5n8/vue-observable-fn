import { useObservableFn } from './dist/observable'

const [submit, submission] = useObservableFn(async (foo: number, bar: string) => {
  return { foo, bar }
})

submission.result.bar
submission.error.bar
