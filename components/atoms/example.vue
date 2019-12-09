<template>
  <h1>{{ title }}</h1>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Example extends Vue {
  private title = 'Hello World'
}
</script>
