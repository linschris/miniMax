const styles = {
  "0": {
    "0": {
      "top-left": 20,
      "top-right": 0,
      "bot-left": 0,
      "bot-right": 20
    },
    "1": {
      "top-left": 0,
      "top-right": 0,
      "bot-left": 20,
      "bot-right": 20
    },
    "2": {
      "top-left": 0,
      "top-right": 20,
      "bot-left": 20,
      "bot-right": 0
    }
  },
  "1": {
    "0": {
      "top-left": 0,
      "top-right": 20,
      "bot-left": 0,
      "bot-right": 20
    },
    "1": {
      "top-left": 20,
      "top-right": 20,
      "bot-left": 20,
      "bot-right": 20
    },
    "2": {
      "top-left": 20,
      "top-right": 0,
      "bot-left": 20,
      "bot-right": 0
    }
  },
  "2": {
    "0": {
      "top-left": 20,
      "top-right": 20,
      "bot-left": 20,
      "bot-right": 20
    },
    "1": {
      "top-left": 20,
      "top-right": 20,
      "bot-left": 20,
      "bot-right": 20
    },
    "2": {
      "top-left": 20,
      "top-right": 20,
      "bot-left": 20,
      "bot-right": 20
    }
  }
}


class SquareNode {
    constructor(x, y, canvas, i, j) {
        this.x = x + 5
        this.y = y + 5
        this.canvas = canvas
        this.sideLength = 128
        this.status = ""
        this.position = {i: i, j: j}
    }

    show(i, j) {
      this.canvas.fill("#ffd480")
      if(this.position.i == i && this.position.j == j) {
        this.canvas.fill("#ffe0a3")
      }
      this.canvas.stroke('#f7b534')
      this.canvas.strokeWeight(16)
      this.canvas.rect(this.x, this.y, this.sideLength, this.sideLength, styles[this.position.i][this.position.j]["top-left"],
                                                                        styles[this.position.i][this.position.j]["top-right"],
                                                                        styles[this.position.i][this.position.j]["bot-right"],
                                                                        styles[this.position.i][this.position.j]["bot-left"],)
      if(this.status == "X") {
        this.canvas.stroke('red')
        this.canvas.strokeWeight(16)
        this.canvas.line(this.x + 32, this.y + 32, this.x + 96, this.y + 96)
        this.canvas.line(this.x + 32, this.y + 96, this.x + 96, this.y + 32)
        this.canvas.stroke('black')
      }
      if(this.status == "O") {
        this.canvas.stroke('blue')
        this.canvas.strokeWeight(16)
        this.canvas.circle(this.x + this.sideLength / 2, this.y + this.sideLength / 2, 64)
        this.canvas.stroke('black')
      }
      this.canvas.stroke('blue')
      this.canvas.textSize(20)
      this.canvas.strokeWeight(1)
      this.canvas.fill('blue')
      this.canvas.text((3 * this.position.i + this.position.j) + 1, this.x + this.sideLength - 24, this.y + this.sideLength - 16)
      this.canvas.stroke('black')
      this.canvas.strokeWeight(4)
    }
    
    isInside(x, y) {
      return this.x <= x && x <= this.x + this.sideLength && this.y <= y && y <= this.y + this.sideLength
    }
    
    getDistanceTo(node) {
      return Math.ceil(Math.abs(node.x - this.x) + Math.abs(node.y - this.y))
    }

}