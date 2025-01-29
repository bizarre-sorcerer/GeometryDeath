class Circle {
  constructor (x, y, r, dx, dy){
    this.x = x
    this.y = y
    this.radius = r
    this.dx = dx
    this.dy = dy
  }
  
  randomDirection(){
    let random = Math.floor(Math.random() * (2 - 1 + 1) + 1)
  
    if (random % 2 === 0){
      this.dx = 4
    } else {
      this.dx = -4
    }
    if (Math.floor(Math.random() * (2 - 1 + 1) + 1) % 2 === 0){
      this.dy = 4
    } else {
      this.dy = -4
    }
  }
}

class Canvas {
  constructor (canvas){
    this.canvas = canvas  
    this.ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.allCircles = []
  }

  drawCircle(circle){
    this.ctx.beginPath()
    this.ctx.strokeStyle = 'white'
    this.ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false)
    this.ctx.stroke()
  }

  animateCircle(circle){
    circle.x += circle.dx
    circle.y += circle.dy
  
    if (circle.x + circle.radius > window.innerWidth || circle.x < circle.radius){
      circle.dx *= -1
    } 
    if (circle.y > window.innerHeight - circle.radius || circle.y < circle.radius){
      circle.dy *= -1
    }
  }

  createCircles(quantity){
    for (let i=0; i<quantity; i++){
      let x = Math.floor(Math.random() * (window.innerWidth - (Data.radius*2) + 1) + Data.radius)
      let y = Math.floor(Math.random() * (window.innerHeight - (Data.radius*2) + 1) + Data.radius)
      let newCircle = new Circle(x, y, Data.radius, Data.dx, Data.dy)
      newCircle.randomDirection()
      this.allCircles.push(newCircle) 
    }
  }

  startVisual(quantity){
    if (this.allCircles.length == 0){
      this.createCircles(quantity)
    }

    for (let circle of this.allCircles) {
      this.drawCircle(circle);
      this.animateCircle(circle);
      console.log(this.allCircles)

    }
  }
}

class Data{
  static radius = 50
  static dx = 3
  static dy = 3
}

let canvas = document.querySelector('#canvas')
canvas = new Canvas(canvas) 

function animation(){
  requestAnimationFrame(animation)
  canvas.ctx.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height)
  
  canvas.startVisual(15)
}

animation()