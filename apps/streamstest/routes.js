import React from 'react'
import {mount} from 'react-mounter'
import { DBConnProvider } from '../../config/lib/helpers/legacy/react-datascript'

import Index from './components/index'

export default function (injectDeps, context, actions) {
  const conn = context.conn
  const MainLayoutCtx = function (props) {
    const MainLayoutCtx = injectDeps(Index)
    return (
      <DBConnProvider conn={ conn } >
        <MainLayoutCtx { ...props } />
      </DBConnProvider>
    )
  }
  mount(MainLayoutCtx, {
    conn: conn
  })
}
