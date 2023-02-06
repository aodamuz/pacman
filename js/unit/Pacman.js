// noinspection JSUnusedGlobalSymbols

import Word from './Word.js'
import Sound from './Sound.js'
import Ghost from './Ghost.js'
import Player from './Player.js'
import * as c from './const.js'

import dying from '../utils/dying.js'
import waiting from '../utils/waiting.js'
import playing from '../utils/playing.js'
import countdown from '../utils/countdown.js'
import togglePause from '../utils/togglePause.js'
import collided from '../utils/collided.js'
import drawPacMan from '../utils/drawPacMan.js'
import isAudioDisabled from '../utils/isAudioDisabled.js'

export default class Pacman {
    constructor(el) {
        this.started = false
        this.status = c.WAITING
        this.stateChanged = true
        this.toStartText = '[Enter] Start [M] Mute [P] Pause'
        this.tick = this.level = this.lastTime = this.eatenCount = 0
        this.playerPos = this.audio = this.audio = this.ctx = this.ghostPos =
            this.map = this.stored = this.timerStart = this.player = null

        this.init(el)
    }

    init(wrapper) {
        const blockSize = wrapper.offsetWidth / 19
        const canvas = document.createElement('canvas')

        canvas.setAttribute('width', `${blockSize * 19}px`)
        canvas.setAttribute('height', `${(blockSize * 22) + 30}px`)

        wrapper.appendChild(canvas)

        this.ctx = canvas.getContext('2d')

        this.audio = new Sound
        this.map = new Word(blockSize)

        this.player = new Player({
            completedLevel: () => this.completedLevel(),
            eatenPill: () => this.eatenPill(),
            audio: this.audio
        }, this.map)

        for (let i = 0; i < c.GHOST_COUNT; i++)
            c.GHOSTS.push(new Ghost({ tick: () => this.tick }, this.map))

        this.map.draw(this.ctx)

        this.dialog('Loading ...')

        this.load(c.AUDIO, () => this.loaded())
    }

    eatenPill() {
        this.eatenCount = 0
        this.audio.alarm()
        this.audio.eatPill()
        this.timerStart = this.tick

        for (let i = 0; i < c.GHOSTS.length; i++)
            c.GHOSTS[i].makeEatable(this.ctx)
    }

    completedLevel() {
        this.setStatus(c.WAITING)
        this.level++
        this.map.reset()
        this.player.newLevel()
        this.start()
    }

    load(arr, callback) {
        if (arr.length === 0)
            return callback()

        const x = arr.pop()
        this.audio.register(x, () => this.load(arr, callback))
    }

    loaded() {
        this.dialog('Press Enter to Start')

        document.addEventListener('keydown', e => this.keyDown(e), true)
        document.addEventListener('keypress', e => this.keyPress(e), true)

        window.setInterval(() => this.loop(), 1000 / c.FPS)
    }

    loop() {
        if (this.status !== c.PAUSE)
            this.tick++

        this.map.drawPills(this.ctx)

        const diff = (this.tick - this.timerStart) > (c.FPS / 3)

        if (this.status === c.EATEN_PAUSE && diff)
            playing.call(this)
        else if (this.status === c.PLAYING)
            this.draw()
        else if (this.status === c.WAITING && this.stateChanged)
            waiting.call(this)
        else if (this.status === c.DYING)
            dying.call(this)
        else if (this.status === c.COUNTDOWN)
            countdown.call(this)

        this.drawInfo()
    }

    loseLife() {
        this.setStatus(c.WAITING)

        this.player.lives--

        if (this.player.lives > 0) this.start()
        else this.started = false
    }

    keyPress(e) {
        if ([c.WAITING, c.PAUSE].includes(this.status)) {
            e.preventDefault()
            e.stopPropagation()
        }
    }

    keyDown(e) {
        if (e.key === 'Enter')
            this.newGame()
        else if (e.key === 'm')
            this.audio.toggleAudioDisabled()
        else if (e.key === 'p')
            togglePause.call(this)
        else if (this.status !== c.PAUSE)
            return this.player.keyDown(e)

        return true
    }

    newGame() {
        this.setStatus(c.WAITING)
        this.started = true
        this.level = 1
        this.player.reset()
        this.map.reset()
        this.map.draw(this.ctx)
        this.start()
    }

    start() {
        this.player.resetPosition()

        for (let i = 0; i < c.GHOSTS.length; i++)
            c.GHOSTS[i].reset()

        this.audio.start()
        this.timerStart = this.tick

        this.setStatus(c.COUNTDOWN)
    }

    draw() {
        const len = c.GHOSTS.length

        this.ghostPos = []

        for (let i = 0; i < len; i++)
            this.ghostPos.push(c.GHOSTS[i].move(this.ctx))

        const position = this.player.move(this.ctx)

        for (let i = 0; i < len; i++)
            this.drawBlock(this.ghostPos[i].old)

        this.drawBlock(position.old)

        for (let i = 0; i < len; i++)
            c.GHOSTS[i].draw(this.ctx)

        this.player.draw(this.ctx)

        this.playerPos = position.new

        for (let i = 0; i < len; i++) {
            if (collided(this.playerPos, this.ghostPos[i].new)) {
                if (c.GHOSTS[i].eatable !== null) {
                    this.audio.eatGhost()
                    c.GHOSTS[i].eat()
                    this.eatenCount++

                    const score = this.eatenCount * 50
                    this.drawScore(score, this.ghostPos[i])
                    this.player.addScore(score)
                    this.setStatus(c.EATEN_PAUSE)
                    this.timerStart = this.tick
                } else if (c.GHOSTS[i].eaten === null) {
                    this.audio.die()
                    this.setStatus(c.DYING)
                    this.timerStart = this.tick
                }
            }
        }
    }

    drawInfo() {
        const dimX = this.map.width * this.map.blockSize
        const dimY = this.map.height * this.map.blockSize
        const textBase = dimY + 17

        this.ctx.fillStyle = c.COLOR.black
        this.ctx.fillRect(0, dimY, dimX, 30)
        this.ctx.fillStyle = c.COLOR.yellow
        this.ctx.beginPath()
        this.ctx.font = '18px BDCartoonShoutRegular'

        drawPacMan(this.ctx, dimX, textBase - 7, 9, this.player.lives)

        const disabled = isAudioDisabled()
        const levelText = `Level: ${this.level}`
        const levelWidth = this.ctx.measureText(levelText).width

        this.ctx.fillStyle = c.COLOR.yellow

        this.ctx.font = '14px BDCartoonShoutRegular'
        this.ctx.fillText(`Score: ${this.player.score}`, disabled ? 40 : 12, textBase)

        this.ctx.font = '18px BDCartoonShoutRegular'
        disabled && this.ctx.fillText('🔇', 10, textBase)

        this.ctx.font = '14px BDCartoonShoutRegular'
        this.ctx.fillText(levelText, dimX - (levelWidth - 8), textBase)
    }

    drawScore(text, position) {
        this.ctx.fillStyle = c.COLOR.white
        this.ctx.font = '12px BDCartoonShoutRegular'
        this.ctx.fillText(
            text,
            (position.new.x / 10) * this.map.blockSize,
            ((position.new.y + 5) / 10) * this.map.blockSize
        )
    }

    drawBlock(pos) {
        this.map.drawBlock(Math.floor(pos.y / 10), Math.floor(pos.x / 10), this.ctx)
        this.map.drawBlock(Math.ceil(pos.y / 10), Math.ceil(pos.x / 10), this.ctx)
    }

    dialog(text, fontSize = '14px') {
        this.ctx.font = `${fontSize} BDCartoonShoutRegular`
        // Shadow for dialog text
        this.ctx.strokeStyle = c.COLOR.black
        this.ctx.fillStyle = c.COLOR.yellow
        this.ctx.lineWidth = 10

        // Measure the width of the text
        const width = this.ctx.measureText(text).width

        // Calculate the x coordinate for the center of the canvas
        const x = ((this.map.width * this.map.blockSize) - width) / 2
        // Calculate the y coordinate for the center of the canvas
        const y = ((this.map.height * this.map.blockSize) / 2) + (parseInt(fontSize) / 2)

        this.ctx.strokeText(text, x, y)
        this.ctx.fillText(text, x, y)
    }

    setStatus(nState) {
        this.status = nState
        this.stateChanged = true
    }
}
