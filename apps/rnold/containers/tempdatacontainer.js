import { compose, composeAll } from 'react-komposer'
import { useDeps } from 'react-simple-di'

const dataComposer = ({ context, query }, onData) => {
  // onData(null, {result: datascript.datoms(datascript.db(conn), ':eavt')})
  onData(null, {result: "test"})
}

const options = {
  loadingHandler: () => (<Text>loading</Text>),
  errorHandler: e => (<Text>{e.message}</Text>),
}

export default (component) => composeAll(
  compose(dataComposer, options),
  useDeps()
)(component)
