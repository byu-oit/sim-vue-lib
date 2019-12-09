<template>
  <h1 class="text-primary">{{ title }}</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Example extends Vue {
  private title = 'Hello World'
}
</script>
