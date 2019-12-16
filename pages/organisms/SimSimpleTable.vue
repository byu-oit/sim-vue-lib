<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg">
        <sim-simple-table
          v-model="selected"
          class="col-lg"
          :items="items"
          :headers="headers"
          :deduplicate="['a', 'c']"
          show-select
        />
      </div>
      <div class="col-lg-2">
        <div class="row bg-primary">
          <h3 class="m-auto text-light">Selected</h3>
        </div>
        <div v-for="(item, i) of selected" :key="i" class="row mx-auto">
          {{ item.a }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import SimSimpleTable from '~/components/organisms/SimSimpleTable.vue'

@Component({
  components: {
    SimSimpleTable
  }
})
export default class ExpandTablePage extends Vue {
  private selected: Object[] = []

  private headers = ['a', 'b', 'c']

  private items = [
    {
      a: 'and',
      c: 'cat'
    },
    {
      a: 'ant',
      b: 'bat',
      c: 'can'
    },
    {
      a: 'ant',
      b: 'bat',
      c: 'can'
    },
    {
      a: 'ant',
      b: 'bat',
      c: 'can'
    },
    {
      a: 'ant',
      b: 'bat',
      c: 'can'
    },
    {
      a: 'ant',
      b: 'bat',
      c: 'can'
    },
    {
      a: 'ant',
      b: 'bat',
      c: 'can'
    },
    {
      a: 'ant',
      b: 'boy',
      c: 'can'
    },
    {
      a: 'all',
      b: 'bop',
      c: 'con'
    },
    {
      a: 'all',
      b: 'big',
      c: 'con'
    },
    {
      a: 'act',
      b: 'bop',
      c: 'con'
    },
    {
      a: 'apt',
      b: 'bop'
    },
    {
      a: 'apt',
      b: 'biz'
    },
    {
      a: 'apt',
      b: 'biz',
      c: 'can'
    }
  ]
}
</script>
