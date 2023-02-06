import * as c from './const.js'
import calcAngle from '../utils/calcAngle.js'
import isMidSquare from '../utils/isMidSquare.js'
import isOnSamePlane from '../utils/isOnSamePlane.js'
import nextSquare from '../utils/nextSquare.js'
import onGridSquare from '../utils/onGridSquare.js'
import pointToPosition from '../utils/pointToPosition.js'

export default class Player {
    constructor(pacman, map) {
        this.pacman = pacman
        this.map = map

        this.keyMap = {
            ArrowLeft: c.LEFT,
            ArrowUp: c.UP,
            ArrowRight: c.RIGHT,
            ArrowDown: c.DOWN
        }

        this.position = {}
        this.direction = null
        this.eaten = null
        this.due = null
        this.lives = null
        this.score = 5

        this.keyDown.bind(this)

        this.init()
    }

    addScore(score) {
        this.score += score
        this.pacman.audio.eating()

        if (this.score % 10000 === 0) {
            this.lives++

            this.pacman.audio.live()
        }
    }

    reset() {
        this.init()
        this.resetPosition()
    }

    init() {
        this.score = 0
        this.lives = 3
        this.newLevel()
    }

    newLevel() {
        this.resetPosition()
        this.eaten = 0
    }

    resetPosition() {
        this.position = { x: 90, y: 120 }
        this.direction = c.LEFT
        this.due = c.LEFT
    }

    keyDown(e) {
        if (typeof this.keyMap[e.key] !== 'undefined') {
            this.due = this.keyMap[e.key]
            e.preventDefault()
            e.stopPropagation()

            return false
        }

        return true
    }

    getNewPosition(dir, current) {
        return {
            x: current.x + (dir === c.LEFT && -2 || dir === c.RIGHT && 2 || 0),
            y: current.y + (dir === c.DOWN && 2 || dir === c.UP && -2 || 0)
        }
    }

    next(pos, dir) {
        return {
            y: pointToPosition(nextSquare(pos.y, dir)),
            x: pointToPosition(nextSquare(pos.x, dir))
        }
    }

    move() {
        let newPos = null
        let nextWhole = null
        let block = null

        const oldPosition = this.position

        if (this.due !== this.direction) {
            newPos = this.getNewPosition(this.due, this.position)

            if (isOnSamePlane(this.due, this.direction) ||
                onGridSquare(this.position) &&
                this.map.isFloorSpace(this.next(newPos, this.due))
            )
                this.direction = this.due
            else
                newPos = null

        }

        if (newPos === null)
            newPos = this.getNewPosition(this.direction, this.position)

        if (onGridSquare(this.position) && this.map.isWall(this.next(newPos, this.direction)))
            this.direction = c.NONE

        if (this.direction === c.NONE)
            return { new: this.position, old: this.position }

        if (newPos.y === 100 && newPos.x >= 190 && this.direction === c.RIGHT)
            newPos = { y: 100, x: -10 }

        if (newPos.y === 100 && newPos.x <= -12 && this.direction === c.LEFT)
            newPos = { y: 100, x: 190 }

        this.position = newPos
        nextWhole = this.next(this.position, this.direction)

        block = this.map.block(nextWhole)

        if ((isMidSquare(this.position.y) || isMidSquare(this.position.x)) &&
            block === c.BISCUIT || block === c.PILL) {

            this.map.setBlock(nextWhole, c.EMPTY)
            this.addScore((block === c.BISCUIT) ? 10 : 50)
            this.eaten += 1

            if (this.eaten === 182) this.pacman.completedLevel()

            if (block === c.PILL) this.pacman.eatenPill()
        }

        return {
            new: this.position,
            old: oldPosition
        }
    }

    drawDead(ctx, amount) {
        const size = this.map.blockSize
        const half = size / 2

        if (amount >= 1) return

        ctx.fillStyle = c.COLOR.yellow
        ctx.beginPath()
        ctx.moveTo(
            ((this.position.x / 10) * size) + half,
            ((this.position.y / 10) * size) + half
        )

        ctx.arc(
            ((this.position.x / 10) * size) + half,
            ((this.position.y / 10) * size) + half,
            half,
            0,
            Math.PI * 2 * amount,
            true
        )

        ctx.fill()
    }

    draw(ctx) {
        const s = this.map.blockSize
        const angle = calcAngle(this.direction, this.position)

        ctx.fillStyle = c.COLOR.yellow

        ctx.beginPath()

        ctx.moveTo(
            ((this.position.x / 10) * s) + s / 2,
            ((this.position.y / 10) * s) + s / 2
        )

        ctx.arc(
            ((this.position.x / 10) * s) + s / 2,
            ((this.position.y / 10) * s) + s / 2,
            s / 2,
            Math.PI * angle.start,
            Math.PI * angle.end,
            angle.direction
        )

        ctx.fill()
    }
}
