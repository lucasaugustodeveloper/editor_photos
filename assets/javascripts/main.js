const screenSize = {
  width: document.querySelector('.screen').clientWidth - 17,
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

  let mouseX = (evt.clientX - (left + window.pageXOffset))
  let mouseY = (evt.clientY - (top + window.pageYOffset))

  return {
    x: mouseX,
    y: mouseY
  }
}
const drawFree = (canvas, context) => {
  let desenho = false

  canvas.onmousedown = (evt) => {
    if (drawing !== 'free') return

    context.moveTo(evt.clientX, evt.clientY)
    desenho = true
  }
  canvas.onmouseup = () => {
    return desenho = false
  }
  canvas.onmousemove = (evt) => {
    if (desenho && drawing === 'free') {
      context.lineTo(evt.clientX, evt.clientY)
      context.stroke()
    }
  }
}
const drawPin = (context, x, y) => {
  const pin = []

    context.save()
    context.translate (x, y)

    context.beginPath()
    context.moveTo(0, 0)
    context.bezierCurveTo(2, -10, -20, -25, 0, -30)
    context.bezierCurveTo(20, -25, -2, -10, 0, 0)
    context.fillStyle = 'orange'
    context.fill()
    context.strokeStyle = 'black'
    context.lineWidth = 1.5
    context.stroke()
    context.beginPath()
    context.arc(0, -21, 3, 0, Math.PI * 2)
    context.closePath()
    context.fillStyle = 'black'
    context.fill()
    context.restore()
    pin.push({
      drawPin: {
        x: x,
        y: y
      }
    })
    // console.log(pin)
}
const drawCircle = (context, x, y, radius, evt) => {
  const circle = []
  context.beginPath()
  context.arc(`${x + 2}`, `${y + 6}`, `${radius}`, 0, 2 * Math.PI)
  context.closePath()
  context.fill()
  context.stroke()
  circle.push({
    circle: {
      x: x,
      y: y
    }
  })
}
const drawSquare = (context, x, y, width, height, evt) => {
  const square = []
  context.beginPath()
  context.rect(`${x - 50}`, `${y - 50}`, `${width}`, `${height}`)
  context.closePath()
  context.fill()
  context.stroke()
  square.push({
    square: {
      x: x,
      y: y
    }
  })
}
const drawText = (text, x, y) => {
  const contentText = []
  context.font = '2rem Monaco'
  context.fillText(`${text}`, `${x - 15}`, `${y + 15}`)
  contentText.push({
    content: text,
    x: x,
    y: y
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
const downloadCanvas = (link, canvas, filename) => {
  link.href = document.querySelector(canvas).toDataURL()
  link.download = filename
}
const clearCanvas = (canvas, context) => {
  canvas.width = canvas.width
  context.drawImage(bgImage, 0, 0, screen.width, screen.height)
}

const canvas = config('#screen', screenSize.width, screenSize.height)
const screen = canvas.canvas
const context = canvas.context

const bgImage = new Image()
bgImage.src = 'assets/images/planta.jpg'

window.onload = () => {
  context.drawImage(bgImage, 0, 0, screen.width, screen.height)
}

let drawing

const draw = (screen, context, x, y) => {
  switch (drawing) {
    case 'circle':
      drawCircle(context, x, y, 20)
      break
    case 'square':
      drawSquare(context, x, y, 100, 100)
      break
    case 'pin':
      drawText('Lucas', x, y)
      drawPin(context, x, y, 20)
      break
    case 'free':
      drawFree(context, x, y)
      break
    default:
      console.log('Selecione um botão para desenha')
      break
  }
}

document.querySelector('.comment').addEventListener('click', () => {
  drawing = 'pin'
}, true)
document.querySelector('.form_circle').addEventListener('click', () => {
  drawing = 'circle'
}, true)
document.querySelector('.form_square').addEventListener('click', () => {
  drawing = 'square'
}, true)
document.querySelector('.insertText').addEventListener('click', () => {
  drawing = 'text'
}, true)
document.querySelector('.draw_free').addEventListener('click', () => {
  drawing = 'free'
}, true)
document.querySelector('.download').addEventListener('click', () => {
  const btnDownload = document.querySelector('.download')
  downloadCanvas(btnDownload, '#screen', 'test.png')
}, false)
document.querySelector('.clear_canvas').addEventListener('click', () => {
  clearCanvas(screen, context)
}, false)

screen.addEventListener('click', (e) => {
  const mousePos = mousePosition(screen, e)
  draw(screen, context, mousePos.x, mousePos.y)
}, true)


