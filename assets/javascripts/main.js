const canvas = document.querySelector('#screen')
const screen_width = $('.screen').width() - 34
const screen_height = 800 //$(document).height()
const bgImage = new Image()

canvas.setAttribute('width', screen_width)
canvas.setAttribute('height', screen_height)

const ctx = canvas.getContext('2d')

bgImage.src = 'http://www.pedradeitauna.com.br/files/2013/04/Planta-2-coluna-6.jpg'
ctx.drawImage(bgImage, 0, 0, screen_width, screen_height, 0, 0, screen_width, screen_height)

draw_livre(canvas, ctx)
draw_pin()

