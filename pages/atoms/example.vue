<template>
  <example />
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Example from '~/components/atoms/Example.vue'

@Component({
  components: {
    Example
  }
})
export default class ExamplePage extends Vue {
  private title = 'Example Page'
}
</script>
