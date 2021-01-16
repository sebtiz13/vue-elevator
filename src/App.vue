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
            @move="moveElevator"
            @changeDirection="changeDirection"
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
import { Component, Vue, Watch } from 'vue-property-decorator'

import Elevator from './components/Elevator.vue'
import Button from './components/Button.vue'
import Level from './components/Level.vue'

import { Person, Direction, LevelState, ElevatorState } from './interfaces'

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

  @Watch('levels', { deep: true })
  levelsUpdated (levels: LevelState[]) {
    const elevatorState = { ...this.elevator }
    const waitingPersons = levels
      .reduce(
        (acc, { persons }) => ([...acc, ...persons]),
        ([] as Person[])
      )
      .concat(this.elevator.persons)
      .filter((person: Person) => person.difference !== 0)

    elevatorState.waitingPersons = waitingPersons

    this.elevator = elevatorState
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
    if (newLevel === currentLevel) {
      alert('can\'t move to same level')
      return
    }

    const person = new Person(currentLevel)
    person.changeLevel(newLevel)

    this.levels[currentLevel].persons.push(person)
    this.handlePersons()
  }

  changeDirection (direction: Direction) {
    this.elevator = { ...this.elevator, direction }
    this.handlePersons()
  }

  moveElevator (level: number) {
    // If the elevator are on max level, he can only down
    if ((this.levels.length - 1) < level || level < 0) {
      console.error(`level "${level}" not exist`)
      return
    }
    this.elevator = { ...this.elevator, level }
    this.handlePersons()
  }

  handlePersons () {
    const levels = [...this.levels]
    const elevatorState = { ...this.elevator }
    const { level } = elevatorState

    const exitPersons = this.elevator.persons.filter((person) => person.level === level)
    if (exitPersons.length > 0) {
      // Remove persons from elevator
      elevatorState.persons = this.elevator.persons.filter((person) => person.level !== level)
      // Move persons to levels
      levels[level].persons.push(...exitPersons.map((person) => {
        // Update persons levels
        person.update(level)
        return person
      }))
    }

    const enterPersons = levels[level].persons.filter(({ difference }) => (
      elevatorState.direction === Direction.DOWN ? difference < 0 : difference > 0
    ))

    if (enterPersons.length > 0) {
      levels[level].persons = levels[level].persons.filter((person) => !enterPersons.includes(person))
      elevatorState.persons.push(...enterPersons)
    }
    this.levels = levels
    this.elevator = elevatorState
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
