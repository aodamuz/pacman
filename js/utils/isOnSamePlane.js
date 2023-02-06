import { DOWN, LEFT, RIGHT, UP } from '../unit/const.js'

export default (due, dir) => (
    (due === LEFT || due === RIGHT) &&
    (dir === LEFT || dir === RIGHT)
) || (
    (due === UP || due === DOWN) &&
    (dir === UP || dir === DOWN)
)
