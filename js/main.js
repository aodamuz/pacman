import Pacman from './unit/Pacman.js'

Object.prototype.clone = function () {
    const newObj = (this instanceof Array) ? [] : {}

    for (const i in this) {
        if (i === 'clone') continue

        newObj[i] = typeof this[i] === 'object' ? this[i].clone() : this[i]
    }

    return newObj
}

new Pacman(document.getElementById('pacman'))
