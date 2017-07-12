function draw_free (canvas, ctx) {
	let drawing = false

	canvas.onmousedown = (evt) => {
		ctx.moveTo(evt.clientX - 35, evt.clientY - 35)
		drawing = true
	}
	canvas.onmouseup = () => {
		drawing = false
	}
	canvas.onmousemove = (evt) => {
		if (drawing) {
			ctx.lineTo(evt.clientX - 35, evt.clientY - 35)
			ctx.stroke()
		}
	}
	// $(`${canvas}`).click(false)
}