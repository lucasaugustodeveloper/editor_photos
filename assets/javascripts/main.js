const screenSize = {
  width: document.querySelector('.screen').clientWidth - 17,
  height: 950
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
    const pos = mousePosition(canvas, evt)
    if (drawing !== 'free') return

    context.moveTo( ( pos.x ), ( pos.y ) )
    desenho = true
  }
  canvas.onmouseup = () => {
    return desenho = false
  }
  canvas.onmousemove = (evt) => {
    const pos = mousePosition(canvas, evt)
    if (desenho && drawing === 'free') {
      context.lineTo( ( pos.x ), ( pos.y ) )
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
const drawPin = (canvas) => {
  const pin = []

  canvas.addEventListener('click', (e) => {
    if (drawing !== 'pin') return

    const pos = mousePosition(canvas, e)
    const pin = document.createElement('div')
    const comment = document.createElement('div')

    comment.classList.add('comment')
    comment.setAttribute('contenteditable', true)
    pin.classList.add('pinned')
    pin.classList.add('isActive')


    if ( (pos.x + 320) >= $('.canvas').width() ) comment.style.left = '-330px'

    pin.style.left = `${pos.x + 7}px`
    pin.style.top = `${pos.y - 30}px`

    comment.textContent = 'insirar seu comentário.'

    divScreen.appendChild(pin)
    pin.appendChild(comment)
    comment.focus()
  }, false)
}
const drawCircle = (canvas) => {
  let mouse = {
    startX: 0,
    startY: 0
  };
  let info = {
    type: 'circle',
    width: 0,
    height: 0
  }
  let element = null;

  canvas.onmousemove = (e) => {
    const pos = mousePosition(canvas, e)
    if (element !== null) {
      element.style.width = Math.abs(pos.x - mouse.startX) + 'px'
      element.style.height = Math.abs(pos.y - mouse.startY) + 'px'
      element.style.borderRadius = (Math.abs(pos.x - mouse.startX) / 2) + 'px'
      element.style.left = (pos.x - mouse.startX < 0) ? pos.x + 'px' : mouse.startX + 'px'
      element.style.top = (pos.y - mouse.startY < 0) ? pos.y + 'px' : mouse.startY + 'px'
    }
  }
  canvas.onmousedown = (e) => {
    const pos = mousePosition(canvas, e)
    if ( drawing !== 'circle' && drawing === 'pin' ) return

    mouse.startX = pos.x
    mouse.startY = pos.y
    element = document.createElement('div')
    element.className = 'circle'
    element.style.left = (pos.x) + 'px'
    element.style.top = (pos.y) + 'px'
    canvas.appendChild(element)

  }
  canvas.onmouseup = (e) => {
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
      element.style.left = (mouse.x - mouse.startX < 0) ? (mouse.x - 25) + 'px' : mouse.startX + 'px'
      element.style.top = (mouse.y - mouse.startY < 0) ? (mouse.y - 42) + 'px' : mouse.startY + 'px'
    }
  }
  canvas.onmousedown = (e) => {
    if (drawing !== 'square') return
    setMousePosition(e)
    mouse.startX = (mouse.x - 25)
    mouse.startY = (mouse.y - 42)
    canvas.style.cursor = 'crosshair'
    element = document.createElement('div')
    element.className = 'rectangle'
    element.style.left = (mouse.x - 25) + 'px'
    element.style.top = (mouse.y - 42) + 'px'
    canvas.appendChild(element)

  }
  canvas.onmouseup = (e) => {
    setMousePosition(e)
    canvas.style.cursor = 'default'
    if (element !== null) {
      element = null;
    }
  }
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
const downloadCanvas = (screen) => {
  const divCanvas = document.querySelector('.canvas')
  html2canvas(divCanvas,{
    allowTaint: true,
    logging: true,
    useCORS: true,
  }).then(function (canvas) {
    let tempcanvas = document.createElement('canvas')
    tempcanvas.width = screen.width
    tempcanvas.height = screen.height
    let context = tempcanvas.getContext('2d')
    const link = document.createElement('a')

    context.drawImage(canvas, 0, 0, screen.width, screen.height)
    link.href = tempcanvas.toDataURL('image/jpg')
    link.download = 'screenshoot.jpg'
    link.click()
  })
}
const clearCanvas = (canvas, context) => {
  canvas.width = canvas.width
  context.drawImage(bgImage, 0, 0, screen.width, screen.height)
}
const zoom = () => {
  if ( $('#screen').hasClass('isActive') ) {
    $('#screen').removeClass('isActive')
    $('.zoom-wrapper').addClass('isActive')
    $('#zoom_05').elevateZoom({
      zoomType: 'inner',
      cursor: 'crosshair',
      resposive: true,
      scrollZoom: true
    })
  }
  else {
    $('.zoom-wrapper').removeClass('isActive')
    $('.zoomContainer').css({
      'position': 'relative'
    })
    $('#screen').addClass('isActive')
  }
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
      drawPin(screen)
      break
    case 'free':
      drawFree(screen, context, x, y)
      break
    case 'zoom':
      zoom()
      break
    default:
      console.log('Selecione um botão para desenha')
      break
  }
}

window.onload = () => {
  context.drawImage(bgImage, 0, 0, screen.width, screen.height)

  $('.zoom-input').on('change', () => {
    $('.canvas').css({
      'zoom': $('.zoom-input').val()
    })
  })
  $('.canvas').on('click', '.pinned', function () {
    let isActive = $(this).hasClass('isActive')
    $('.pinned').removeClass('isActive')
    if ( !isActive ) {
      $(this).addClass('isActive')
      $('.pinned .comment').focus()
      isActive = null
    }
  })

  $('#screen').on('click', () => {
    $('.pinned').removeClass('isActive')
  })
}

document.querySelector('.comment').addEventListener('click', (e) => {
  drawing = 'pin'
  const mousePos = mousePosition(screen, e)
  draw()
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

document.querySelector('.download').addEventListener('click', (e) => {
  e.preventDefault()
  const btnDownload = document.querySelector('.download')
  downloadCanvas(screen)
}, false)

document.querySelector('.clear_canvas').addEventListener('click', () => {
  clearCanvas(screen, context)
}, false)

document.querySelector('.btn-zoom').addEventListener('click', () => {
  drawing = 'zoom'
  draw()
})
