<script setup lang="ts">
import { useObservableFn } from '@/packages/observable-fn'

const [submit, submission] = useObservableFn(async (foo: number, bar: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  // await new Promise((resolve, reject) => setTimeout(() => reject(new Error('failed')), 1000))

  return { foo, bar }
})
</script>

<template>
  <button type="button" @click="submit(1, 'hello')">submit</button>
  <div v-if="submission.isPending">loading</div>
  <div v-if="submission.isFulfilled">{{ submission.result }}</div>
  <div v-if="submission.isRejected">{{ submission.error }}</div>
</template>
