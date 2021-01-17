<template>
  <div class="level">
    <Person
      v-for="(person, index) in persons"
      :key="index"
      v-bind="person"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import PersonCmp from './Person.vue'

import { Person } from '../interfaces'

@Component({
  components: {
    Person: PersonCmp
  }
})
export default class Level extends Vue {
  @Prop({ default: () => [] }) readonly persons!: Person[]
}
</script>

<style>
  .level {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
