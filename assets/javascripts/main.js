const canvas = document.querySelector('#screen')
const screen_width = $('.screen').width() - 34
const screen_height = 800
const btnText = $('.insertText')

canvas.setAttribute('width', screen_width)
canvas.setAttribute('height', screen_height)

const ctx = canvas.getContext('2d')



draw_free(canvas, ctx)
// draw_pin()
// drawCircle(ctx, 150, 150, 50, 50)
// drawSquare(ctx, 150, 150, 150, 150)

btnText.on('click', () => {
	insertText(canvas, ctx, 'Lucas')
})


