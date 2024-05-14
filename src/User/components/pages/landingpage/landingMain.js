import React from 'react'
import Our3DModels from './landing02'
import Landing03 from './landing03'
import Landing01 from './landing01/Home'

const LandingMain = () => {
  return (
    <div className='landingMain'>
      <Landing01/>
        <Our3DModels/>
        <Landing03/>

    </div>
  )
}

export default LandingMain