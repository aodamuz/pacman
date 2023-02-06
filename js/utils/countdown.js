import * as c from '../unit/const.js'

export default function countdown() {
    let diff = 5 + Math.floor((this.timerStart - this.tick) / c.FPS)

    if (diff === 0) {
        this.map.draw(this.ctx)
        this.setStatus(c.PLAYING)
    } else if (diff !== this.lastTime) {
        this.lastTime = diff
        this.map.draw(this.ctx)
        this.dialog(`Starting in: ${diff}`)
    }
}
