<template>
  <table class="table table-sm table-striped table-borderless">
    <thead class="table-primary">
      <tr v-if="headers.length">
        <th v-if="showSelect" style="width: 20px">
          <input
            v-if="!singleSelect"
            type="checkbox"
            :checked="selected.length === computedItemsLength"
            @click="selectAll()"
          />
        </th>
        <th v-if="!!deduplicate.length" style="width: 20px"></th>
        <th v-for="(header, i) in headers" :key="i">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, i) in computedItems"
        :key="i"
        :class="[!item.isChild ? 'shadow-sm p-3 mb-5 bg-white rounded' : '']"
      >
        <td v-if="showSelect" style="width: 10px">
          <input
            v-if="!item.isChild"
            type="checkbox"
            :checked="item.selected"
            @click="singleSelect ? selectOne(i) : select(i)"
          />
        </td>
        <td v-if="!!deduplicate.length" style="width: 10px">
          <button v-if="item.expandedItems.length" @click="expandRow(i)">
            <v-icon>{{
              item.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
            }}</v-icon>
          </button>
        </td>
        <td v-for="(col, j) in item.value" :key="j">{{ col }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

interface ComputedItem {
  expanded: boolean
  expandedItems: Object[]
  value: Object
  isChild: boolean
  selected: boolean
}

@Component
export default class SimSimpleTable extends Vue {
  @Prop({ default: [] })
  headers!: string[]

  @Prop({ default: () => [] })
  items!: Object[]

  @Prop({ default: () => [] })
  deduplicate!: string[]

  @Prop({ default: () => [] })
  value!: Object[]

  @Prop({ default: false, type: Boolean })
  showSelect!: boolean

  @Prop({ default: false, type: Boolean })
  singleSelect!: boolean

  private selected: any[] = []

  private computedItems: ComputedItem[] = this.createComputedItems()

  select(i: number) {
    this.computedItems[i].selected = !this.computedItems[i].selected
    this.selected = this.computedItems
      .filter(item => item.selected)
      .map(item => item.value)
    this.$emit('input', this.selected)
  }

  selectOne(i: number) {
    if (!this.computedItems[i].selected) {
      for (const item of this.computedItems) {
        item.selected = false
      }
    }
    this.computedItems[i].selected = !this.computedItems[i].selected
    this.selected = [this.computedItems[i].value]
    this.$emit('input', this.selected)
  }

  selectAll() {
    if (this.computedItemsLength === this.selected.length) {
      this.selected = []
      for (const item of this.computedItems) {
        item.selected = false
      }
    } else {
      this.selected = []
      for (const item of this.computedItems) {
        item.selected = true
        this.selected.push(item.value)
      }
    }
    this.$emit('input', this.selected)
  }

  computedItemsLength: number = this.computedItems.reduce((count, item) => {
    if (!item.isChild) return count + 1
    return count
  }, 0)

  createComputedItem(
    item: Object,
    expandedItems: Object[] = [],
    expanded: boolean = false,
    isChild: boolean = false,
    selected: boolean = false
  ): ComputedItem {
    const defItem = this.headers.reduce(
      (defItem, header) => ({ ...defItem, [header]: '' }),
      {}
    )
    return {
      expandedItems,
      expanded,
      value: { ...defItem, ...item },
      isChild,
      selected
    }
  }

  expandRow(i: number) {
    this.computedItems[i].expanded = !this.computedItems[i].expanded
    if (!this.computedItems[i].expanded) {
      return this.computedItems.splice(
        i + 1,
        this.computedItems[i].expandedItems.length
      )
    }
    const expandedItems = this.computedItems[i].expandedItems.map(item => {
      return this.createComputedItem(item, [], false, true)
    })
    return this.computedItems.splice(i + 1, 0, ...expandedItems)
  }

  createComputedItems(): ComputedItem[] {
    const computedItems: ComputedItem[] = []
    this.items.map((item, i) => {
      const expandedItems: Object[] = []
      if (this.deduplicate) {
        for (let j = i + 1; j < this.items.length; j++) {
          let isDup = true
          for (const key of this.deduplicate) {
            if (this.items[i][key] !== this.items[j][key]) {
              isDup = false
              break
            }
          }
          if (isDup) {
            const removed = this.items.splice(j, 1)[0]
            expandedItems.push(removed)
            j--
          }
        }
      }
      computedItems.push(this.createComputedItem(this.items[i], expandedItems))
    })
    return computedItems
  }
}
</script>
