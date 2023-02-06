import * as c from '../unit/const.js'

export default function dying() {
    if (this.tick - this.timerStart > (c.FPS * 2)) {
        this.loseLife()
    } else {
        this.drawBlock(this.playerPos)

        for (let i = 0, len = c.GHOSTS.length; i < len; i++) {
            this.drawBlock(this.ghostPos[i].old)
            this.ghostPos.push(c.GHOSTS[i].draw(this.ctx))
        }

        this.player.drawDead(this.ctx, (this.tick - this.timerStart) / (c.FPS * 2))
    }
}
