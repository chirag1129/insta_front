import React from 'react'
import '../style/allpost.css'
import Post from './Post'
import Story from './Story'
import { Avatar } from '@mui/material'


function Allpost() {

  return (
    <div className='main_post'>
      <div className='allpost'>
        <div className="allpost_story">
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
          <Story/>
        </div>
        <div className="allpost_posts">
        
                <Post userName caption imageUrl postLikes/>
        
          
        </div>
      </div>
      <div className='suggestion'>
        <div className="suggesion_profile">
          <div className="switch_profile">
            <Avatar style={{ width: '60px', height: '60px' }}
              alt=''
              src=''
            />
            <div className="username">
              <h6>chirag patel</h6>
              <span>cyx</span>
            </div>
          </div>
          <div className="switch_account">
            <span>Switch</span>
          </div>
        </div>
        <div className="suggestion_box">
          <div className="suggestion_box_header">
            <h6>Suggestions for you</h6>
            <span>See All</span>
          </div>
          <div className="suggestion_list">
            <div className="suggetion_profile">
              <Avatar style={{ width: '30px', height: '30px' }}
                alt=''
                src=''
              />
              <div className="username">
                <span>chirag patel</span>
                <span>cyx</span>
              </div>
            </div>
            <div className="follow_account">
              <span>Follow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Allpost
