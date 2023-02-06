import { DISABLED_AUDIO_KEY } from '../unit/const.js'

export default () => window.localStorage.getItem(DISABLED_AUDIO_KEY) === 'true'
