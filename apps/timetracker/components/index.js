import React from 'react'

/**
**  MAKING A NEW MODULE
**  2. This is an example of making a new component. It's kept under
**  timetracker/components/index.js to make it easier to find the root component of all your modules.
**  (go to step 3 at BLAHBLAH)
**/
import Appbar from 'muicss/lib/react/appbar'
import Button from 'muicss/lib/react/button'
import Container from 'muicss/lib/react/container'

const Component = ({result}) => (
  <div>
      <input id="option1" name="options" type="radio" onChange={() => alert('option 1')}></input>
      <input id="option2" name="options" type="radio" onChange={() => alert('option 2')}></input>
      <Appbar>App Bar</Appbar>
      <Container>
        <Button onClick={() => alert('web component button works!')} color="primary">button</Button>
      </Container>
  </div>
)

export default Component
