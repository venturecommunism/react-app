import React from 'react'

const FollowerTreeComponent = ({ result, actions }) => (
  <div>
    <h3>Stellar Testnet </h3>
    <button onClick={ actions.transactstellar }>
      Add follower
    </button>
    <code>
      <pre>
        {JSON.stringify(result, null, 2)}
      </pre>
    </code>
  </div>
)

export default FollowerTreeComponent
