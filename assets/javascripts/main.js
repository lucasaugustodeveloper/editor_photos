const screenSize = {
  width: document.querySelector('.screen').clientWidth - 17,
  height: 900
}
const bgImage = new Image()
bgImage.src = 'assets/images/planta.jpg'

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
const canvas = config('#screen', screenSize.width, screenSize.height)
const screen = canvas.canvas
const context = canvas.context
const divScreen = document.querySelector('.canvas')
let drawing

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
  const draw = []
  let desenho = false


  canvas.onmousedown = (evt) => {
    if (drawing !== 'free') return

    context.moveTo( (evt.clientX - 30), (evt.clientY - 20) )
    desenho = true
  }
  canvas.onmouseup = () => {
    return desenho = false
  }
  canvas.onmousemove = (evt) => {
    if (desenho && drawing === 'free') {
      context.lineTo( (evt.clientX - 30), (evt.clientY - 20) )
      context.lineWidth = 5
      context.strokeStyle = 'green'
      context.stroke()
      draw.push({
        type: 'form free',
        x: evt.clientX,
        y: evt.clientY
      })
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
const drawForm = (canvas, form) => {
  let mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0
  };
  let element = null;

  const setMousePosition = (e) => {
    const ev = e || window.event; //Moz || IE
    if (ev.pageX) { //Moz
      mouse.x = ev.pageX + window.pageXOffset
      mouse.y = ev.pageY + window.pageYOffset
    } else if (ev.clientX) { //IE
      mouse.x = ev.clientX + document.body.scrollLeft
      mouse.y = ev.clientY + document.body.scrollTop
    }
  }

  canvas.onmousemove = (e) => {
    setMousePosition(e)
    if (element !== null) {
      element.style.width = Math.abs(mouse.x - mouse.startX) + 'px'
      element.style.height = Math.abs(mouse.y - mouse.startY) + 'px'
      element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px'
      element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px'
    }
  }
  canvas.onclick = (e) => {
    setMousePosition(e)
    if (element !== null) {
      element = null;
      canvas.style.cursor = "default"
    }
    else {
      mouse.startX = mouse.x
      mouse.startY = mouse.y
      element = document.createElement('div')
      element.className = (form === 'square') ? 'rectangle' : 'circle'
      element.style.left = mouse.x + 'px'
      element.style.top = mouse.y + 'px'
      canvas.appendChild(element)
      canvas.style.cursor = "crosshair"
    }
  }
  console.log(form)
}
const drawCircle = (canvas) => {
  let mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
  };
  let info = {
    type: 'circle',
    width: 0,
    height: 0
  }
  let element = null;
  const setMousePosition = (e) => {
    const ev = e || window.event; //Moz || IE
    if (ev.pageX) { //Moz
      mouse.x = ev.pageX + window.pageXOffset
      mouse.y = ev.pageY + window.pageYOffset
    } else if (ev.clientX) { //IE
      mouse.x = ev.clientX + document.body.scrollLeft
      mouse.y = ev.clientY + document.body.scrollTop
    }
  }

  canvas.onmousemove = (e) => {
    setMousePosition(e)
    if (element !== null) {
      element.style.width = Math.abs(mouse.x - mouse.startX) + 'px'
      element.style.height = Math.abs(mouse.y - mouse.startY) + 'px'
      element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px'
      element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px'
    }
  }
  canvas.onmousedown = (e) => {
    if ( drawing !== 'circle' ) return
    setMousePosition(e)
    mouse.startX = mouse.x
    mouse.startY = mouse.y
    element = document.createElement('div')
    element.className = 'circle'
    element.style.left = mouse.x + 'px'
    element.style.top = mouse.y + 'px'
    canvas.appendChild(element)

  }
  canvas.onmouseup = (e) => {
    setMousePosition(e)
    if (element !== null) {
      element = null;
    }
  }
}
const drawSquare = (canvas) => {
  let mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0
  };
  let element = null;

  const setMousePosition = (e) => {
    const ev = e || window.event; //Moz || IE
    if (ev.pageX) { //Moz
      mouse.x = ev.pageX + window.pageXOffset
      mouse.y = ev.pageY + window.pageYOffset
    } else if (ev.clientX) { //IE
      mouse.x = ev.clientX + document.body.scrollLeft
      mouse.y = ev.clientY + document.body.scrollTop
    }
  }

  canvas.onmousemove = (e) => {
    setMousePosition(e)
    if (element !== null) {
      element.style.width = Math.abs(mouse.x - mouse.startX) + 'px'
      element.style.height = Math.abs(mouse.y - mouse.startY) + 'px'
      element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px'
      element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px'
    }
  }
  canvas.onmousedown = (e) => {
    if (drawing !== 'square') return
    setMousePosition(e)
    mouse.startX = mouse.x
    mouse.startY = mouse.y
    element = document.createElement('div')
    element.className = 'rectangle'
    element.style.left = mouse.x + 'px'
    element.style.top = mouse.y + 'px'
    canvas.appendChild(element)

  }
  canvas.onmouseup = (e) => {
    setMousePosition(e)
    if (element !== null) {
      element = null;
    }
  }
}
const drawText = (text, x, y) => {
  const contentText = []
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
const draw = (x, y) => {
  switch (drawing) {
    case 'circle':
      drawCircle(divScreen)
      break
    case 'square':
      drawSquare(divScreen)
      break
    case 'pin':
      //
      break
    case 'free':
      drawFree(screen, context, x, y)
      break
    default:
      console.log('Selecione um botão para desenha')
      break
  }
}

window.onload = () => {
  context.drawImage(bgImage, 0, 0, screen.width, screen.height)

  $('.zoom-input').on('change', () => {
    $('body').css({
      'zoom': $('.zoom-input').val()
    })
  })
}

document.querySelector('.comment').addEventListener('click', (e) => {
  drawing = 'pin'
  const mousePos = mousePosition(screen, e)
  draw(mousePos.x, mousePos.y)
}, false)

document.querySelector('.form_circle').addEventListener('click', (e) => {
  drawing = 'circle'
  draw()
}, false)

document.querySelector('.form_square').addEventListener('click', (e) => {
  drawing = 'square'
  draw()
}, false)

document.querySelector('.draw_free').addEventListener('click', (e) => {
  drawing = 'free'
  const mousePos = mousePosition(screen, e)
  draw(mousePos.x, mousePos.y)
}, false)

document.querySelector('.download').addEventListener('click', () => {
  const btnDownload = document.querySelector('.download')
  downloadCanvas(btnDownload, '#screen', 'test.png')
}, false)

document.querySelector('.clear_canvas').addEventListener('click', () => {
  clearCanvas(screen, context)
}, false)
