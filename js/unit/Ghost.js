import * as c from './const.js'
import addBounded from '../utils/addBounded.js'
import nextSquare from '../utils/nextSquare.js'
import onGridSquare from '../utils/onGridSquare.js'
import pointToPosition from '../utils/pointToPosition.js'
import selectRandomColor from '../utils/selectRandomColor.js'

export default class Ghost {
    constructor(pacman, map) {
        this.pacman = pacman
        this.map = map
        this.color = selectRandomColor()

        this.position = null
        this.direction = null
        this.eatable = null
        this.eaten = null
        this.due = null
    }

    reset() {
        this.eaten = null
        this.eatable = null
        this.position = { x: 90, y: 80 }
        this.direction = this.getRandomDirection()
        this.due = this.getRandomDirection()
        this.color = selectRandomColor()
    }

    getRandomDirection() {
        const moves = (
            this.direction === c.LEFT || this.direction === c.RIGHT
        ) ? [c.UP, c.DOWN] : [c.LEFT, c.RIGHT]

        return moves[Math.floor(Math.random() * 2)]
    }

    makeEatable() {
        this.direction = this.oppositeDirection(this.direction)
        this.eatable = this.pacman.tick()
    }

    oppositeDirection(dir) {
        const { LEFT, DOWN, RIGHT, UP } = c

        return dir === LEFT && RIGHT || dir === RIGHT && LEFT || dir === UP && DOWN || UP
    }

    eat() {
        this.eatable = null
        this.eaten = this.pacman.tick()
    }

    getColor() {
        if (this.eatable) {
            if (this.secondsAgo(this.eatable) > 5) {
                return this.pacman.tick() % 20 > 10 ? c.COLOR.white : c.COLOR.indigo
            } else {
                return c.COLOR.indigo
            }
        } else if (this.eaten) {
            return c.COLOR.dark
        }

        return this.color
    }

    secondsAgo(tick) {
        return (this.pacman.tick() - tick) / c.FPS
    }

    draw(ctx) {
        const s = this.map.blockSize
        const top = (this.position.y / 10) * s
        const left = (this.position.x / 10) * s
        const tl = left + s
        const base = top + s - 3
        const inc = s / 10
        const off = {}
        const f = s / 12
        const high = this.pacman.tick() % 10 > 5 ? 3 : -3
        const low = this.pacman.tick() % 10 > 5 ? -3 : 3

        if (this.eatable && this.secondsAgo(this.eatable) > 8)
            this.eatable = null

        if (this.eaten && this.secondsAgo(this.eaten) > 3)
            this.eaten = null

        ctx.fillStyle = this.getColor()
        ctx.beginPath()

        ctx.moveTo(left, base)

        ctx.quadraticCurveTo(left, top, left + (s / 2), top)
        ctx.quadraticCurveTo(left + s, top, left + s, base)

        // Wavy things at the bottom
        ctx.quadraticCurveTo(tl - inc, base + high, tl - (inc * 2), base)
        ctx.quadraticCurveTo(tl - (inc * 3), base + low, tl - (inc * 4), base)
        ctx.quadraticCurveTo(tl - (inc * 5), base + high, tl - (inc * 6), base)
        ctx.quadraticCurveTo(tl - (inc * 7), base + low, tl - (inc * 8), base)
        ctx.quadraticCurveTo(tl - (inc * 9), base + high, tl - (inc * 10), base)

        ctx.closePath()
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = c.COLOR.white

        ctx.arc(
            left + 6, top + 6, s / 6,
            0, 300, false
        )

        ctx.arc(
            (left + s) - 6,
            top + 6, s / 6,
            0, 300, false
        )

        ctx.closePath()
        ctx.fill()

        off[c.RIGHT] = [f, 0]
        off[c.LEFT] = [-f, 0]
        off[c.UP] = [0, -f]
        off[c.DOWN] = [0, f]

        ctx.beginPath()
        ctx.fillStyle = c.COLOR.black
        ctx.arc(
            left + 6 + off[this.direction][0],
            top + 6 + off[this.direction][1],
            s / 15, 0, 300, false
        )
        ctx.arc(
            (left + s) - 6 + off[this.direction][0],
            top + 6 + off[this.direction][1],
            s / 15, 0, 300, false
        )
        ctx.closePath()
        ctx.fill()
    }

    move(ctx) {
        let newPos = null
        const oldPos = this.position
        const onGrid = onGridSquare(this.position)

        if (this.due !== this.direction) {
            newPos = this.getNewPosition(this.due, this.position)

            if (onGrid && this.map.isFloorSpace({
                y: pointToPosition(nextSquare(newPos.y, this.due)),
                x: pointToPosition(nextSquare(newPos.x, this.due))
            }))
                this.direction = this.due
            else
                newPos = null
        }

        if (newPos === null)
            newPos = this.getNewPosition(this.direction, this.position)

        if (onGrid &&
            this.map.isWall({
                y: pointToPosition(nextSquare(newPos.y, this.direction)),
                x: pointToPosition(nextSquare(newPos.x, this.direction))
            })
        ) {
            this.due = this.getRandomDirection()

            return this.move(ctx)
        }

        this.position = newPos

        const tmp = this.pane(this.position)

        if (tmp) this.position = tmp

        this.due = this.getRandomDirection()

        return {
            new: this.position,
            old: oldPos
        }
    }

    pane(pos) {
        if (pos.y === 100 && pos.x >= 190 && this.direction === c.RIGHT)
            return { y: 100, x: -10 }

        if (pos.y === 100 && pos.x <= -10 && this.direction === c.LEFT)
            return this.position = { y: 100, x: 190 }

        return false
    }

    getNewPosition(dir, current) {
        const speed = this.eatable !== null ? 1 : this.eaten !== null ? 4 : 2
        const xSpeed = (dir === c.LEFT && -speed || dir === c.RIGHT && speed || 0)
        const ySpeed = (dir === c.DOWN && speed || dir === c.UP && -speed || 0)

        return {
            x: addBounded(current.x, xSpeed),
            y: addBounded(current.y, ySpeed)
        }
    }
}
