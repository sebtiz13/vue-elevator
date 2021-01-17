<template>
  <div class="person">
    <span v-html="direction" />
    {{ level }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { Person } from '../interfaces'

@Component
export default class Level extends Vue {
  @Prop({ default: 0 }) readonly level!: Person['level']
  @Prop({ default: 0 }) readonly difference!: Person['difference']

  get direction (): string {
    if (this.difference === 0) {
      return ''
    }
    return this.difference < 0 ? '&darr;' : '&uarr;'
  }
}
</script>

<style>
.person {
  width: 30px;
  padding: 5px;
  background-color: #7171ec;
}
</style>
