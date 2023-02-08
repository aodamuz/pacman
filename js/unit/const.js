// Options
export const FPS = 25
export const GHOST_COUNT = 4

// Map blocks types
export const WALL = 0
export const BISCUIT = 1
export const BLOCK = 3
export const EMPTY = 2
export const PILL = 4

export const DISABLED_AUDIO_KEY = 'sound'

// Directions
export const NONE = 4
export const UP = 3
export const RIGHT = 11
export const DOWN = 1
export const LEFT = 2

// Audio
export const AUDIO = [
    { name: 'die', path: './audio/die.ogg' },
    { name: 'ghost', path: 'audio/./eat-ghost.ogg' },
    { name: 'pill', path: 'audio/./eat-pill.ogg' },
    { name: 'eating', path: './audio/eating.ogg' },
    { name: 'live', path: './audio/live.ogg' },
    { name: 'alarm', path: './audio/alarm.ogg' },
    { name: 'start', path: './audio/start.ogg' }
]

// Status
export const PAUSE = 1
export const COUNTDOWN = 2
export const DYING = 3
export const EATEN_PAUSE = 4
export const PLAYING = 5
export const WAITING = 6

// State
export const GHOSTS = []

// Colors
export const COLOR = {
    used: [],
    white: 'hsl(0, 0%, 100%)',
    dark: 'hsl(0, 0%, 10%)',
    black: 'hsl(0, 0%, 0%)',
    yellow: 'hsl(55, 100%, 50%)',
    blue: 'hsl(240, 100%, 50%)',
    indigo: 'hsl(253, 100%, 20%)',
    ghosts: (() => {
        const arr = []

        for (let i = 0; i < 360; i++)
            // 360/16 It is the representation of 16 colors distributed in a radius of 360 degrees
            if ((i % Math.ceil(360 / 16)) === 0)
                arr.push(`hsl(${i}, 100%, 50%)`)

        return arr
    })()
}

// Map coordinates
export const MAP = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 4, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 4, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 2, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 2, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [2, 2, 2, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 2, 2, 2],
    [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 4, 0],
    [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

// Map Walls
export const WALLS = [
    [
        { move: [0, 9.5] }, { line: [3, 9.5] },
        { curve: [3.5, 9.5, 3.5, 9] }, { line: [3.5, 8] },
        { curve: [3.5, 7.5, 3, 7.5] }, { line: [1, 7.5] },
        { curve: [0.5, 7.5, 0.5, 7] }, { line: [0.5, 1] },
        { curve: [0.5, 0.5, 1, 0.5] }, { line: [9, 0.5] },
        { curve: [9.5, 0.5, 9.5, 1] }, { line: [9.5, 3.5] }
    ],

    [
        { move: [9.5, 1] },
        { curve: [9.5, 0.5, 10, 0.5] }, { line: [18, 0.5] },
        { curve: [18.5, 0.5, 18.5, 1] }, { line: [18.5, 7] },
        { curve: [18.5, 7.5, 18, 7.5] }, { line: [16, 7.5] },
        { curve: [15.5, 7.5, 15.5, 8] }, { line: [15.5, 9] },
        { curve: [15.5, 9.5, 16, 9.5] }, { line: [19, 9.5] }
    ],

    [
        { move: [2.5, 5.5] }, { line: [3.5, 5.5] }
    ],

    [
        { move: [3, 2.5] },
        { curve: [3.5, 2.5, 3.5, 3] },
        { curve: [3.5, 3.5, 3, 3.5] },
        { curve: [2.5, 3.5, 2.5, 3] },
        { curve: [2.5, 2.5, 3, 2.5] }
    ],

    [
        { move: [15.5, 5.5] }, { line: [16.5, 5.5] }
    ],

    [
        { move: [16, 2.5] }, { curve: [16.5, 2.5, 16.5, 3] },
        { curve: [16.5, 3.5, 16, 3.5] }, { curve: [15.5, 3.5, 15.5, 3] },
        { curve: [15.5, 2.5, 16, 2.5] }
    ],

    [
        { move: [6, 2.5] }, { line: [7, 2.5] }, { curve: [7.5, 2.5, 7.5, 3] },
        { curve: [7.5, 3.5, 7, 3.5] }, { line: [6, 3.5] },
        { curve: [5.5, 3.5, 5.5, 3] }, { curve: [5.5, 2.5, 6, 2.5] }
    ],

    [
        { move: [12, 2.5] }, { line: [13, 2.5] }, { curve: [13.5, 2.5, 13.5, 3] },
        { curve: [13.5, 3.5, 13, 3.5] }, { line: [12, 3.5] },
        { curve: [11.5, 3.5, 11.5, 3] }, { curve: [11.5, 2.5, 12, 2.5] }
    ],

    [
        { move: [7.5, 5.5] }, { line: [9, 5.5] }, { curve: [9.5, 5.5, 9.5, 6] },
        { line: [9.5, 7.5] }
    ],

    [
        { move: [9.5, 6] }, { curve: [9.5, 5.5, 10.5, 5.5] },
        { line: [11.5, 5.5] }
    ],

    [
        { move: [5.5, 5.5] }, { line: [5.5, 7] }, { curve: [5.5, 7.5, 6, 7.5] },
        { line: [7.5, 7.5] }
    ],

    [
        { move: [6, 7.5] }, { curve: [5.5, 7.5, 5.5, 8] }, { line: [5.5, 9.5] }
    ],

    [
        { move: [13.5, 5.5] }, { line: [13.5, 7] },
        { curve: [13.5, 7.5, 13, 7.5] }, { line: [11.5, 7.5] }
    ],

    [
        { move: [13, 7.5] }, { curve: [13.5, 7.5, 13.5, 8] },
        { line: [13.5, 9.5] }
    ],

    [
        { move: [0, 11.5] }, { line: [3, 11.5] }, { curve: [3.5, 11.5, 3.5, 12] },
        { line: [3.5, 13] }, { curve: [3.5, 13.5, 3, 13.5] }, { line: [1, 13.5] },
        { curve: [0.5, 13.5, 0.5, 14] }, { line: [0.5, 17] },
        { curve: [0.5, 17.5, 1, 17.5] }, { line: [1.5, 17.5] }
    ],

    [
        { move: [1, 17.5] }, { curve: [0.5, 17.5, 0.5, 18] }, { line: [0.5, 21] },
        { curve: [0.5, 21.5, 1, 21.5] }, { line: [18, 21.5] },
        { curve: [18.5, 21.5, 18.5, 21] }, { line: [18.5, 18] },
        { curve: [18.5, 17.5, 18, 17.5] }, { line: [17.5, 17.5] }
    ],

    [
        { move: [18, 17.5] }, { curve: [18.5, 17.5, 18.5, 17] },
        { line: [18.5, 14] }, { curve: [18.5, 13.5, 18, 13.5] },
        { line: [16, 13.5] }, { curve: [15.5, 13.5, 15.5, 13] },
        { line: [15.5, 12] }, { curve: [15.5, 11.5, 16, 11.5] },
        { line: [19, 11.5] }
    ],

    [
        { move: [5.5, 11.5] }, { line: [5.5, 13.5] }
    ],

    [
        { move: [13.5, 11.5] }, { line: [13.5, 13.5] }
    ],

    [
        { move: [2.5, 15.5] }, { line: [3, 15.5] },
        { curve: [3.5, 15.5, 3.5, 16] }, { line: [3.5, 17.5] }
    ],

    [
        { move: [16.5, 15.5] }, { line: [16, 15.5] },
        { curve: [15.5, 15.5, 15.5, 16] }, { line: [15.5, 17.5] }
    ],

    [
        { move: [5.5, 15.5] }, { line: [7.5, 15.5] }
    ],

    [
        { move: [11.5, 15.5] }, { line: [13.5, 15.5] }
    ],

    [
        { move: [2.5, 19.5] }, { line: [5, 19.5] },
        { curve: [5.5, 19.5, 5.5, 19] }, { line: [5.5, 17.5] }
    ],

    [
        { move: [5.5, 19] }, { curve: [5.5, 19.5, 6, 19.5] },
        { line: [7.5, 19.5] }
    ],

    [
        { move: [11.5, 19.5] }, { line: [13, 19.5] },
        { curve: [13.5, 19.5, 13.5, 19] }, { line: [13.5, 17.5] }
    ],

    [
        { move: [13.5, 19] }, { curve: [13.5, 19.5, 14, 19.5] },
        { line: [16.5, 19.5] }
    ],

    [
        { move: [7.5, 13.5] }, { line: [9, 13.5] },
        { curve: [9.5, 13.5, 9.5, 14] }, { line: [9.5, 15.5] }
    ],

    [
        { move: [9.5, 14] }, { curve: [9.5, 13.5, 10, 13.5] },
        { line: [11.5, 13.5] }
    ],

    [
        { move: [7.5, 17.5] }, { line: [9, 17.5] },
        { curve: [9.5, 17.5, 9.5, 18] }, { line: [9.5, 19.5] }
    ],

    [
        { move: [9.5, 18] }, { curve: [9.5, 17.5, 10, 17.5] },
        { line: [11.5, 17.5] }
    ],

    [
        { move: [8.5, 9.5] }, { line: [8, 9.5] }, { curve: [7.5, 9.5, 7.5, 10] },
        { line: [7.5, 11] }, { curve: [7.5, 11.5, 8, 11.5] },
        { line: [11, 11.5] }, { curve: [11.5, 11.5, 11.5, 11] },
        { line: [11.5, 10] }, { curve: [11.5, 9.5, 11, 9.5] },
        { line: [10.5, 9.5] }
    ]
]
