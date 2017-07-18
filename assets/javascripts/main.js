const screenSize = {
  width: document.querySelector('.screen').clientWidth,
  height: 900
}
const config = (id, width, height) => {
  const canvas = document.querySelector(`${id}`)
  const context = canvas.getContext('2d')
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)

  return {
    context,
    canvas
  }
}
const mousePosition = (canvas, evt) => {
  let obj = canvas
  let top = 0
  let left = 0

  while (obj && obj.tagName !== 'body') {
    top += obj.offsetTop
    left += obj.offsetLeft
    obj = obj.offsetParent
  }

  let mouseX = (evt.clientX - (left + window.pageXOffset)) - 2.5
  let mouseY = (evt.clientY - (top + window.pageYOffset)) - 2.5

  return {
    x: mouseX,
    y: mouseY
  }
}
const draws = (data) => {
  const drawing = []
  drawing.push(data)
  console.log(drawing)
}
const drawFree = (canvas, context) => {
  let drawing = false

  canvas.onmousedown = (evt) => {
    context.moveTo(evt.clientX, evt.clientY)
    drawing = true
  }
  canvas.onmouseup = () => {
    drawing = false
  }
  canvas.onmousemove = (evt) => {
    if (drawing) {
      context.lineTo(evt.clientX, evt.clientY)
      context.stroke()
    }
  }
}
const drawPin = (canvas, context, evt) => {
  const pin = []
  canvas.addEventListener('click', (e) => {
    const mousePos = mousePosition(canvas, e)
    context.fillRect(`${mousePos.x}`, `${mousePos.y}`, 10, 10)
    pin.push({
      drawPin: {
        x: mousePos.x,
        y: mousePos.y
      }
    })
    console.log(pin)
  })
}
const drawCircle = (canvas, context, radius, evt) => {
  const circle = []
  canvas.addEventListener('click', (evt) => {
    const mousePos = mousePosition(canvas, evt)
    context.beginPath()
    context.arc(`${mousePos.x}`, `${mousePos.y}`, `${radius}`, 0, Math.PI * 2)
    context.closePath()
    context.fill()
    context.stroke()
    circle.push({
      circle: {
        x: mousePos.x,
        y: mousePos.y
      }
    })
  })
}
const drawSquare = (canvas, context, width, height, evt) => {
  const square = []
  canvas.addEventListener('click', (evt) => {
    const mousePos = mousePosition(canvas, evt)
    context.rect(`${mousePos.x}`, `${mousePos.y}`, `${width}`, `${height}`)
    context.stroke()
    square.push({
      square: {
        x: mousePos.x,
        y: mousePos.y
      }
    })
    console.log(square)
  })
}
const drawText = (canvas, context, text) => {
  const contentText = []
  canvas.addEventListener('click', (evt) => {
    const mousePos = mousePosition(canvas, evt)
    context.font = '2rem Monaco'
    context.fillText(`${text}`, `${mousePos.x - 15}`, `${mousePos.y + 15}`)
    contentText.push({
      content: text,
      x: mousePos.x,
      y: mousePos.y
    })
    console.log(contentText)
  })
}
const saveCanvas = (canvas, id) => {
  const imgData = canvas.toDataURL()
  const btnSave = document.querySelector(`${id}`)

  canvas.src = imgData

  btnSave.addEventListener('click', (e) => {
    this.href = imgData
    this.download = 'canvas.png'
    return false
  });
}
const clearCanvas = (canvas) => {
  canvas.width = canvas.width
}

const canvas = config('#screen', screenSize.width, screenSize.height)
const screen = canvas.canvas
const context = canvas.context

const bgImage = new Image()
bgImage.src = 'assets/images/planta.jpg'

window.onload = () => {
  context.drawImage(bgImage, 0, 0, screen.width, screen.height)
}

let drawing = 'free'

const draw = () => {
  switch (drawing) {
    case 'circle':
      // circle
      break
    case 'square':
      // square
      break
    case 'text':
      // text
      break
    case 'pin':
      // pin
    default:
      // free
      break
  }
}
