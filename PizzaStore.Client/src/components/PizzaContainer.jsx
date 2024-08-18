import React from 'react'

function PizzaContainer({referenceId, name, desc}) {
  return (
    <div>
        <div>{referenceId}</div>
        <div>{name}</div>
        <div>{desc}</div>
    </div>
  )
}

export default PizzaContainer