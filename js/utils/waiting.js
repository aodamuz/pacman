export default function waiting() {
    this.stateChanged = false
    this.map.draw(this.ctx)
    this.dialog(this.toStartText)
}
