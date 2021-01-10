<template>
  <div id="app">
    <table>
      <tr v-for="(level, index) in levels.slice().reverse()" :key="`level-${index}`">
        <td class="colLevel">
          <template v-if="level.level === 0">rdc</template>
          <template v-else>{{ level.level }}</template>
        </td>
        <td>
          <Elevator
            v-if="level.level === elevator.level"
            v-bind="elevator"
          />
        </td>
        <td class="colButtons">
          <Button
            :level="levelNb"
            @changeLevel="changeLevel($event, level.level)"
          />
        </td>
        <td>
          <Level :persons="level.persons" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Elevator from './components/Elevator.vue'
import Button from './components/Button.vue'
import Level from './components/Level.vue'

import { Direction, LevelState, ElevatorState } from './interfaces'

@Component({
  components: {
    Elevator,
    Button,
    Level
  }
})
export default class App extends Vue {
  levelNb = 5

  levels: LevelState[] = []

  elevator: ElevatorState = {
    level: 0,
    waitingPersons: [],
    direction: Direction.UP,
    persons: []
  }

  mounted () {
    const levels: LevelState[] = []
    for (let index = 0; index <= this.levelNb; index++) {
      levels.push({
        level: index,
        persons: []
      })
    }
    this.levels = levels
  }

  changeLevel (newLevel: number, currentLevel: number) {
    // TODO implement this
  }
}
</script>

<style>
html {
  background-color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

table {
  margin: 60px auto;
}

table, td {
  border-collapse: collapse;
  border: 1px solid black;
}

td {
  height: 120px;
  width: 200px;
}

.colLevel {
  width: 40px;
  color: rgb(202, 68, 68);
  font-weight: bold;
  font-size: 18px;
}

.colButtons {
  width: 120px;
}
</style>
