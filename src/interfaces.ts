class Person {
  public current = 0;
  public level = 0;
  public difference = 0;

  constructor (current: number) {
    this.current = current
  }

  changeLevel (newLevel: number) {
    this.level = newLevel
    this.difference = newLevel - this.current
  }

  update (level: number) {
    this.current = level
    this.difference = 0
  }
}

interface LevelState {
  level: number;
  persons: Person[];
}

enum Direction {
  UP = 1,
  DOWN = -1
}

interface ElevatorState extends LevelState {
  waitingPersons: Person[];
  direction: Direction;
}

export { Person, Direction, LevelState, ElevatorState }
