function draw_livre (canvas, ctx) {
	let drawing = false

	canvas.onmousedown = (evt) => {
		ctx.moveTo(evt.clientX, evt.clientY)
		drawing = true
	}
	canvas.onmouseup = () => {
		drawing = false
	}
	canvas.onmousemove = (evt) => {
		if (drawing) {
			ctx.lineTo(evt.clientX, evt.clientY)
			ctx.stroke()
		}
	}
	// $(`${canvas}`).click(false)
}