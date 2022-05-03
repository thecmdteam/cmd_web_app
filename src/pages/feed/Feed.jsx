import React from 'react'
import { useSelector } from 'react-redux'

const Feed = () => {
  const state = useSelector(state => state.auth);
  return (
    <div>{JSON.stringify(state.data)}</div>
  )
}

export default Feed