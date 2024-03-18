import React from 'react'
import { useLocation} from 'react-router-dom'

const Displayuser = () => {
  const location = useLocation()
  var id = location.state.id
  console.log(id)
  return (
    <div>hiiiii</div>
  )
}

export default Displayuser