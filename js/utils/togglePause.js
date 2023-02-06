import { PAUSE } from '../unit/const.js'

export default function togglePause() {
    if (this.started) {
        if (this.status === PAUSE) {
            this.audio.resume()
            this.map.draw(this.ctx)
            this.setStatus(this.stored)
        } else {
            this.stored = this.status
            this.setStatus(PAUSE)
            this.audio.pause()
            this.map.draw(this.ctx)
            this.dialog('Paused')
        }
    }
}
