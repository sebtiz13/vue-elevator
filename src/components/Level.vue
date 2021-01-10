<template>
  <div>
    {{ persons }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { Person } from '../interfaces'

@Component
export default class Level extends Vue {
  @Prop({ default: () => [] }) readonly persons!: Person[]
}
</script>
