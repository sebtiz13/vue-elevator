<template>
  <div class="elevator">
    <div
      class="elevator-direction"
      v-html="directionChar"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

import { Person, Direction } from '../interfaces'

@Component
export default class Elevator extends Vue {
  @Prop({ default: () => [] }) readonly persons!: Person[]
  @Prop({ default: 0 }) readonly level!: number
  @Prop({ default: Direction.UP }) readonly direction!: Direction
  @Prop({ default: () => [] }) readonly waitingPersons!: Person[]

  get schedule (): number[] {
    // Extract all levels
    const levels = this.waitingPersons.reduce(
      (acc, { current, level }) => ([...acc, current, level]),
      ([] as number[])
    )

    // Return sorted uniques levels except current level
    return [...new Set(levels)]
      .filter((level) => level !== this.level)
      .sort()
  }

  get directionChar (): string {
    return this.direction === Direction.DOWN ? '&darr;' : '&uarr;'
  }

  /**
   * Use watch to move elevator
   * schedule are updated with new persons
   * use immediate (on mount) because when elevator change of level, the component are re created
   */
  @Watch('schedule', { immediate: true })
  scheduleUpdated (schedule: number[]) {
    if (schedule.length > 0) {
      this.move()
    }
  }

  move () {
    setTimeout(() => {
      this.$emit('move', this.level + this.direction)
    }, 2500)
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
