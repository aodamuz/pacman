import { DOWN, LEFT, RIGHT, UP } from '../unit/const.js'

export default (dir, pos) => {
    if (dir === RIGHT && (pos.x % 10 < 5)) {
        return { start: 0.25, end: 1.75, direction: false }
    } else if (dir === DOWN && (pos.y % 10 < 5)) {
        return { start: 0.75, end: 2.25, direction: false }
    } else if (dir === UP && (pos.y % 10 < 5)) {
        return { start: 1.25, end: 1.75, direction: true }
    } else if (dir === LEFT && (pos.x % 10 < 5)) {
        return { start: 0.75, end: 1.25, direction: true }
    }

    return { start: 0, end: 2, direction: false }
}
