'use strict';
const Robot = (function createRobot() {
  let bearingOptions = ['north','east','south','west']
  let guideOptions = ['L','R','A']

  return class Robot {
    constructor(coordinates, bearing){
      this.coordinates = []
      this.bearing = bearing
    }

    at(x,y) {
      this.coordinates[0] = x
      this.coordinates[1] = y
    }

    turnLeft() {
      switch (this.bearing) {
        case 'north':
          this.bearing = 'west'
          break;
        case 'west':
          this.bearing = 'south'
          break;
        case 'south':
          this.bearing = 'east'
          break;
        case 'east':
          this.bearing = 'north'
          break;
      }
    }

    turnRight() {
      switch (this.bearing) {
        case 'north':
          this.bearing = 'east'
          break;
        case 'east':
          this.bearing = 'south'
          break;
        case 'south':
          this.bearing = 'west'
          break;
        case 'west':
          this.bearing = 'north'
          break;
      }
    }

    advance() {
      switch (this.bearing) {
        case 'north':
          this.coordinates[1]++
          break;
        case 'south':
          this.coordinates[1]--
          break;
        case 'east':
          this.coordinates[0]++
          break;
        case 'west':
          this.coordinates[0]--
          break;
      }
    }

    orient(direction) {
      if (bearingOptions.includes(direction)) {
        this.bearing = direction
      } else {
        throw Error("Invalid Robot Bearing")
      }
    }

    place(postionObject) {
      if ((typeof postionObject.x === 'number') &&
          (typeof postionObject.y === 'number') &&
          (bearingOptions.includes(postionObject.direction))) {
            this.coordinates[0] = postionObject.x
            this.coordinates[1] = postionObject.y
            this.bearing = postionObject.direction
          }
    }

    instructions(guide) {
      guide.split('').forEach(movement => {
        if (!guideOptions.includes(movement)){
          throw Error("Invalid input")
        }
      })
      return guide.split('').map(movement => {
        switch (movement) {
          case 'R':
            return 'turnRight'
          case 'L':
            return 'turnLeft'
          case 'A':
            return 'advance'
        }
      })
    }

    evaluate(guide) {
      let guideMovement = this.instructions(guide)
      if (typeof guideMovement === 'string') {
        throw Error("Invalid Input")
      }
      guideMovement.forEach(order => {this[order]()})
    }

  }
})()
