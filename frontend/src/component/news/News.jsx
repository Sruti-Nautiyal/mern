import React from 'react'
import './news.css'
import {FiSend} from 'react-icons/fi'

function News() {
  return (
    <div className='news'> 
      <div className='news_wrap'>
        <div className='titles'>
          <h5>Want to get the latest offers?</h5>
          <h2>Send us your email and we will do the rest!</h2>
        </div>
        <div className='inputContainer'>
          <input type="email" placeholder='Type email...' />
          <FiSend className='sendIcon' />
        </div>
      </div>
    </div>
  )
}

export default News
