import { DISABLED_AUDIO_KEY } from './const.js'
import isAudioDisabled from '../utils/isAudioDisabled.js'

export default class Sound {
    constructor() {
        this.files = []
        this.playing = []
        this.events = {
            end: [],
            progress: []
        }

        this.disabled = isAudioDisabled()
    }

    register(obj, cb) {
        const { name, path } = obj
        const file = this.files[name] = document.createElement('audio')

        this.events.progress[name] = event => this.progress(event, name, cb)

        file.addEventListener('canplaythrough', this.events.progress[name], true)
        file.setAttribute('preload', 'true')
        file.setAttribute('autobuffer', 'true')
        file.setAttribute('src', path)
        file.pause()
    }

    progress(event, name, callback) {
        if (event.loaded === event.total && typeof callback === 'function') {
            callback()

            this.files[name].removeEventListener(
                'canplaythrough',
                this.events.progress[name],
                true
            )
        }
    }

    toggleAudioDisabled() {
        this.disabled = !this.disabled

        window.localStorage.setItem(DISABLED_AUDIO_KEY, this.disabled ? 'true' : 'false')

        for (let i = 0; i < this.playing.length; i++) {
            this.files[this.playing[i]].pause()
            this.files[this.playing[i]].currentTime = 0
        }

        this.playing = []
    }

    start() {
        this.play('start')
    }

    die() {
        this.play('die')
    }

    eating() {
        this.play('eating')
    }

    eatPill() {
        this.play('pill')
    }

    live() {
        this.play('live')
    }

    alarm() {
        this.play('alarm')
    }

    eatGhost() {
        this.play('ghost')
    }

    play(name) {
        if (!this.disabled) {
            this.events.end[name] = () => this.ended(name)

            this.playing.push(name)
            this.files[name].addEventListener('ended', this.events.end[name], true)
            this.files[name].play()
        }
    }

    pause() {
        for (let i = 0; i < this.playing.length; i++)
            this.files[this.playing[i]].pause()
    }

    resume() {
        for (let i = 0; i < this.playing.length; i++)
            this.files[this.playing[i]].play()
    }

    ended(name) {
        const tmp = []
        let found = false

        this.files[name].removeEventListener('ended', this.events.end[name], true)

        for (let i = 0; i < this.playing.length; i++)
            if (!found && this.playing[i]) found = true
            else tmp.push(this.playing[i])

        this.playing = tmp
    }
}
