<template>
  <div class="buttons">
    <div v-for="(button, index) in buttons" :key="index">
      <button @click="emmitLevel(button)">
        <template v-if="button === 0">rdc</template>
        <template v-else>{{ button }}</template>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop(Number) readonly level!: number

  buttons: number[] = []

  mounted () {
    const buttons = []
    for (let index = 0; index <= this.level; index++) {
      buttons.push(index)
    }
    buttons.sort((a, b) => b - a)
    this.buttons = buttons
  }

  emmitLevel (level: number) {
    this.$emit('changeLevel', level)
  }
}
</script>

<style>
.buttons {
  display: flex;
  flex: 0 0;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.buttons > div {
  flex-basis: 10%;
  padding: 5px;
}
</style>
