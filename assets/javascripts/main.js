const screenSize = {
  width: document.querySelector('.container-canvas').clientWidth - 17,
  height: document.body.clientHeight
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
const divScreen = document.querySelector('.container-canvas')
let drawing
let click = 0
let lastClick = [0, 0]

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
    }
  }
  canvas.onmousedown = (e) => {
    const pos = mousePosition(canvas, e)
    if ( drawing !== 'circle' && drawing === 'pin' ) return

    mouse.startX = (pos.x)
    mouse.startY = pos.y
    element = document.createElement('div')
    element.className = 'circle'
    element.style.left = (pos.x + 127) + 'px'
    element.style.top = pos.y + 'px'
    canvas.appendChild(element)

  }
  canvas.onmouseup = (e) => {
    console.log(`X: ${mouse.startX}, Y: ${mouse.startY}`)
    if (element !== null) {
      element = null;
    }
  }
}
const drawSquare = (canvas) => {
  let mouse = {
      startX: 0,
      startY: 0
  };
  let element = null;

  canvas.onmousemove = (e) => {
    const pos = mousePosition(canvas, e)
    if (element !== null) {
      element.style.width = Math.abs(pos.x - mouse.startX) + 'px'
      element.style.height = Math.abs(pos.y - mouse.startY) + 'px'
    }
  }
  canvas.onmousedown = (e) => {
    const pos = mousePosition(canvas, e)
    if (drawing !== 'square') return
    mouse.startX = pos.x
    mouse.startY = pos.y
    canvas.style.cursor = 'crosshair'
    element = document.createElement('div')
    element.className = 'rectangle'
    element.style.left = (pos.x + 127) + 'px'
    element.style.top = (pos.y) + 'px'
    canvas.appendChild(element)

  }
  canvas.onmouseup = (e) => {
    canvas.style.cursor = 'default'
    if (element !== null) {
      element = null;
    }
  }
}
const saveCanvas = (canvas, id) => {
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
  if ($('.container-canvas').hasClass('isActive') ) {
    $('.container-canvas').removeClass('isActive')
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
    $('.zoomContainer').remove()
    $('.container-canvas').addClass('isActive')
  }
}
const ruler = (canvas, context) => {
  canvas.addEventListener('click', (e) => {
    const pos = mousePosition(canvas, e)
    const rect = canvas.getBoundingClientRect()
    let x = pos.x - canvas.offsetLeft
    let y = pos.y - canvas.offsetTop

    if ( click !== 1 ) {
          click++
    }
    else {
      context.beginPath()
      context.moveTo(lastClick[0], lastClick[1])
      context.lineTo(x, y, 6)
      context.strokeStyle = 'black'
      context.lineWidth = 5
      context.stroke()

      click = 0
    }

    lastClick = [x, y]

  }, false)
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
    case 'ruler':
      ruler(screen, context)
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

document.querySelector('.ruler').addEventListener('click', () => {
  drawing = 'ruler'
  draw()
},false)
