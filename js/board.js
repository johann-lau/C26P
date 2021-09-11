class Board {
  constructor(x, y) {
    this.body = Bodies.rectangle(x, y, 100, 100, { isStatic: true })
    World.add(world, this.body)
  }

  display() {
    var pos = this.body.position
    image(boardimage, pos.x, pos.y, 100, 100)
  }
}