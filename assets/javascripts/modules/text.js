function insertText (canvas, context, text) {
	const contentText = []
	canvas.addEventListener('click', (evt) => {
		const mousePos = positionMouse(canvas, evt)
		context.font = '2rem Monaco'
		context.fillText(`${text}`, `${mousePos.x}`, `${mousePos.y}`)
		contentText.push({
			content: text,
			x: mousePos.x,
			y: mousePos.y
		})
		console.log(contentText)
	})
}