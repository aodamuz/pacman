/*
* Collision detection(walls) is done when a ghost lands on an
* exact block, make sure they don't skip over it
*/
export default (x1, x2) => {
    const rem = x1 % 10
    const result = rem + x2

    if (rem !== 0 && result > 10) return x1 + (10 - rem)
    else if (rem > 0 && result < 0) return x1 - rem

    return x1 + x2
}
