const positionMouse = (canvas, evt) => {
	let obj = canvas
	let top = 0
	let left = 0
	while (obj && obj.tagName != 'body') {
		top += obj.offsetTop
		left += obj.offsetLeft
		obj = obj.offsetParent
	}

	let mouseX = (evt.clientX - (left + window.pageXOffset)) - 6
	let mouseY = (evt.clientY - (top + window.pageYOffset)) - 6

	return {
		x: mouseX,
		y: mouseY
	}
}
const draw_pin = (evt) => {
	const pin = []
	canvas.addEventListener('click', (evt) => {
		const mousePos = positionMouse(canvas, evt)
		ctx.fillRect(`${mousePos.x}`, `${mousePos.y}`, 12, 12)
		// console.log(`${mousePos.x} ${mousePos.y}`)
		pin.push({ x: mousePos.x, y: mousePos.y })
		console.log(pin)
	})
}