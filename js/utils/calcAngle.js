import { DOWN, LEFT, RIGHT, UP } from '../unit/const.js'

export default (dir, pos) => {
    // If the direction is right and the x position of the object is less than 5
    if (dir === RIGHT && (pos.x % 10 < 5)) {
        // Return the start position of 0.25 and end position of 1.75, with the direction set to false
        return { start: 0.25, end: 1.75, direction: false }
    }
    // If the direction is down and the y position of the object is less than 5
    else if (dir === DOWN && (pos.y % 10 < 5)) {
        // Return the start position of 0.75 and end position of 2.25, with the direction set to false
        return { start: 0.75, end: 2.25, direction: false }
    }
    // If the direction is up and the y position of the object is less than 5
    else if (dir === UP && (pos.y % 10 < 5)) {
        // Return the start position of 1.25 and end position of 1.75, with the direction set to true
        return { start: 1.25, end: 1.75, direction: true }
    }
    // If the direction is left and the x position of the object is less than 5
    else if (dir === LEFT && (pos.x % 10 < 5)) {
        // Return the start position of 0.75 and end position of 1.25, with the direction set to true
        return { start: 0.75, end: 1.25, direction: true }
    }

    // If none of the conditions are met, return the default start
    // position of 0 and end position of 2, with the direction set to false
    return { start: 0, end: 2, direction: false }
};
