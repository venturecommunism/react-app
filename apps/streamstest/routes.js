import React from 'react'
import {mount} from 'react-mounter'
import 'resize-observer-polyfill/dist/ResizeObserver.global'

import StreamTest from '../rncore/components/index'

export default injectDeps => mount(injectDeps(StreamTest))
