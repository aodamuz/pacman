import isAudioDisabled from './isAudioDisabled.js'

// noinspection JSUnresolvedVariable
const AudioContext = (
    window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext
)

export const hasWebAudioAPI = !!AudioContext && location.protocol.includes('http')

export const music = (() => {
    if (!hasWebAudioAPI)
        return

    const actions = {}

    document.addEventListener('DOMContentLoaded', () => {
        const url = './audio.mp3'
        const context = new AudioContext()
        const req = new XMLHttpRequest()
        req.open('GET', url, true)
        req.responseType = 'arraybuffer'

        req.onload = () => {
            // noinspection JSIgnoredPromiseFromCall
            context.decodeAudioData(
                req.response,
                buf => {
                    const getSource = () => {
                        const source = context.createBufferSource()
                        source.buffer = buf
                        source.connect(context.destination)
                        return source
                    }

                    actions.killStart = () => {
                        actions.start = () => {}
                    }

                    actions.start = () => {
                        actions.killStart()

                        if (!isAudioDisabled())
                            return

                        getSource().start(0, 0.2, 4.24)
                    }
                },
                error => {
                    if (window.console && window.console.error) {
                        window.console.error(`音频: ${url} 读取错误`, error)
                    }
                }
            )
        }

        req.send()
    })

    return actions
})()
