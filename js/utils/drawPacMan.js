import { COLOR } from '../unit/const.js'

/**
 * drawPacMan - Function to draw Pac-Man on a canvas
 *
 * @param {object} ctx - Canvas context
 * @param {number} width - Width of the canvas
 * @param {number} y - Y-coordinates of the position
 * @param {number} size - Size of each Pac-Man
 * @param {number} quantity - Number of Pac-Man to be drawn
 */
export default (ctx, width, y, size, quantity) => {
    // Get center coordinates of canvas
    const centerX = width / 2
    // Calculate space between Pac-Man
    const space = size * 1.3
    // Calculate total width of Pac-Man
    const totalWidth = (size + space) * quantity
    // Calculate offset for centering Pac-Man
    const offsetX = centerX - totalWidth / 2 + size / 2

    for (let i = 0; i < quantity; i++) {
        // Draw Pac-Man
        ctx.beginPath()
        ctx.arc(
            offsetX + (size + space) * i,
            y,
            size,
            0.2 * Math.PI,
            1.8 * Math.PI
        )
        ctx.lineTo(offsetX + (size + space) * i, y)
        ctx.fillStyle = COLOR.yellow
        ctx.fill()
    }
}
