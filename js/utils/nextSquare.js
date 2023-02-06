import { DOWN, RIGHT } from '../unit/const.js'

export default (x, dir) => {
    if (x % 10 === 0) {
        return x
    } else if (dir === RIGHT || dir === DOWN) {
        return x + (10 - x % 10)
    }

    return x - x % 10
}
