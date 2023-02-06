import * as c from '../unit/const.js'

export default function playing() {
    this.map.draw(this.ctx)
    this.setStatus(c.PLAYING)
}
