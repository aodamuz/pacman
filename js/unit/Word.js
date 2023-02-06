import * as c from './const.js'

export default class Word {
    constructor(size) {
        this.height = null
        this.width = null
        this.blockSize = size
        this.pillSize = 0
        this.map = null

        this.reset()
    }

    reset() {
        this.map = c.MAP.clone()
        this.height = this.map.length
        this.width = this.map[0].length
    }

    block(pos) {
        return this.map[pos.y][pos.x]
    }

    setBlock(pos, type) {
        this.map[pos.y][pos.x] = type
    }

    draw(ctx) {
        const size = this.blockSize

        ctx.fillStyle = c.COLOR.black
        ctx.fillRect(0, 0, this.width * size, this.height * size)

        this.drawWall(ctx)

        for (let i = 0; i < this.height; i++)
            for (let j = 0; j < this.width; j++)
                this.drawBlock(i, j, ctx)
    }

    drawPills(ctx) {
        if (++this.pillSize > 30) {
            this.pillSize = 0
        }

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.map[i][j] === c.PILL) {
                    ctx.beginPath()

                    ctx.fillStyle = c.COLOR.black
                    ctx.fillRect(
                        (j * this.blockSize),
                        (i * this.blockSize),
                        this.blockSize,
                        this.blockSize
                    )

                    ctx.fillStyle = c.COLOR.yellow
                    ctx.arc(
                        (j * this.blockSize) + this.blockSize / 2,
                        (i * this.blockSize) + this.blockSize / 2,
                        Math.abs(5 - (this.pillSize / 3)),
                        0,
                        Math.PI * 2,
                        false
                    )

                    ctx.fill()
                    ctx.closePath()
                }
            }
        }
    }

    drawBlock(y, x, ctx) {
        const layout = this.map[y][x]

        if (layout === c.PILL) return

        ctx.beginPath()

        if (layout === c.EMPTY || layout === c.BLOCK ||
            layout === c.BISCUIT) {

            ctx.fillStyle = c.COLOR.black

            ctx.fillRect(
                (x * this.blockSize),
                (y * this.blockSize),
                this.blockSize,
                this.blockSize
            )

            if (layout === c.BISCUIT) {
                ctx.fillStyle = c.COLOR.white
                ctx.fillRect(
                    (x * this.blockSize) + (this.blockSize / 2.5),
                    (y * this.blockSize) + (this.blockSize / 2.5),
                    this.blockSize / 6,
                    this.blockSize / 6
                )
            }
        }

        ctx.closePath()
    }

    drawWall(ctx) {
        ctx.strokeStyle = c.COLOR.blue
        ctx.lineWidth = 5
        ctx.lineCap = 'round'

        for (let i = 0; i < c.WALLS.length; i++) {
            const line = c.WALLS[i]
            ctx.beginPath()

            for (let j = 0; j < line.length; j++) {
                const p = line[j]

                if (p.move) {
                    ctx.moveTo(p.move[0] * this.blockSize, p.move[1] * this.blockSize)
                } else if (p.line) {
                    ctx.lineTo(p.line[0] * this.blockSize, p.line[1] * this.blockSize)
                } else if (p.curve) {
                    ctx.quadraticCurveTo(
                        p.curve[0] * this.blockSize,
                        p.curve[1] * this.blockSize,
                        p.curve[2] * this.blockSize,
                        p.curve[3] * this.blockSize
                    )
                }
            }

            ctx.stroke()
        }
    }

    isWall(pos) {
        return this.withinBounds(pos.y, pos.x) && this.map[pos.y][pos.x] === c.WALL
    }

    isFloorSpace(pos) {
        if (!this.withinBounds(pos.y, pos.x)) return false

        const piece = this.map[pos.y][pos.x]

        return piece === c.EMPTY || piece === c.BISCUIT || piece === c.PILL
    }

    withinBounds(y, x) {
        return y >= 0 && y < this.height && x >= 0 && x < this.width
    }
}
