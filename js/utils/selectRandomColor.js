import { COLOR } from '../unit/const.js'
import getRandomColor from './getRandomColor.js'

export default () => {
    let color = getRandomColor()

    while (COLOR.used.includes(color)) {
        if (COLOR.used.length === COLOR.ghosts.length) {
            COLOR.used = []
        }

        color = getRandomColor()
    }

    COLOR.used.push(color)

    return color
}
