<template>
  <div class="elevator">
    <div
      class="elevator-direction"
      v-html="directionChar"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { Person, Direction } from '../interfaces'

@Component
export default class Elevator extends Vue {
  @Prop({ default: () => [] }) readonly persons!: Person[]
  @Prop({ default: 0 }) readonly level!: number
  @Prop({ default: Direction.UP }) readonly direction!: Direction
  @Prop({ default: () => [] }) readonly waitingPersons!: Person[]

  get directionChar (): string {
    return this.direction === Direction.DOWN ? '&darr;' : '&uarr;'
  }
}
</script>

<style>
.elevator {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgb(221, 221, 221);
}

.elevator-direction {
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px;
  font-size: 20px;
  color: red;
}
</style>
