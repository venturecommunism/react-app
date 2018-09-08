import App from './app'

import {useDeps as _useDeps} from './deps'

export const createApp = (...args) => (new App(...args))

export const useDeps = _useDeps
