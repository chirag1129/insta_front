import React, { useState, useEffect, useContext } from 'react'
import '../style/post.css'
import { Avatar } from '@mui/material'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'

function Post({ userName, caption, imageUrl, postLikes }) {

  const [data, setData] = useState([])
  const { state } = useContext(UserContext)
  console.log(data)

  useEffect(() => {
    fetch('/allpost', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result.posts)
        setData(result.posts)
      })
  }, [])

  const likePost = (id) => {
    fetch('/like', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result)
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          }
          else {
            return item
          }
        })
        setData(newData)
      });
  };

  const unLikePost = (id) => {
    fetch('/unlike', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: id
      })
    })
      .then(res => res.json())
      .then(result => {
        // console.log(result)
        const newData = data.map(item => {
          if (item._id === result._id) {
            return result
          }
          else {
            return item
          }
        })
        setData(newData)
      });
  };

  const makeComment = (text, postId) => {
    fetch('/comment', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId,
        text
      })
    })
    .then(res=>res.json())
    .then(resulte=>{
      // console.log(resulte )
      const newData = data.map(item => {
        if (item._id === resulte._id) {
          return resulte
        }
        else {
          return item
        }
      })
      setData(newData)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const deletePost = (postId) => {
    // Send a DELETE request to the server to delete the post with the specified postId
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        // Add an Authorization header with a JWT token to authenticate the request
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
      // Parse the response from the server as JSON
      .then(res => res.json())
      .then(result => {
        // Log the parsed JSON data to the console
        // console.log(result);
        alert("post deleted successfuly")
        setData(data.filter(post => post._id !== postId));
      })
      .catch(err => {
        // Log any errors that occur during the request
        console.error(err);
      });
  };
  
  
  return (
    <>
      {
        data.map(item => {
          return (
            <div className='mypost'>

              <div className="mypost_header">
                <div className='header_name'>
                <Avatar
                  className='mypost_avatar'
                  alt={userName = item.postedBy.name}
                  src={item.postedBy.profileImage}
                  />
                <h3 className='header_username'><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile" } >{userName}</Link></h3>
                  </div>
              <div className="post_moreoption">
                {
                  item.postedBy._id===state._id 
                  &&
                  <div className="dropstart">
                  <span className='option_btn' data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                  </span>
                  <ul className="dropdown-menu">
                   <li onClick={()=>deletePost(item._id)} >Delete post</li>
                  </ul>
                </div>
                }
              
              </div>
                    </div>
              <div className="mypost_image">
                <img src={imageUrl = item.photo} alt="" />
              </div>
              <div className="mypost_icons">
                <div className="likes">
                  {item.likes.includes(state._id) ?
                    <i onClick={() => {
                      unLikePost(item._id)
                    }} className='fa-solid fa-heart' style={{ color: "#f50505" }}></i>
                    :
                    <i onClick={() => {
                      likePost(item._id)
                    }} className='fa-regular fa-heart'></i>
                  }
                  <i className="fa-regular fa-paper-plane"></i>
                  <i className="fa-regular fa-comment"></i>
                </div>
                <div className="bookmark">
                  <i className="fa-regular fa-bookmark"></i>
                </div>
              </div>
              <div className="mypost_caption">
                <div className="likes_count">
                  <h6>{postLikes = item.likes.length} likes</h6>
                </div>
                <div className="post_caption">
                  <strong><p>{userName} : </p></strong><span>{caption = item.body}</span>
                </div>
                <div className="post_comments">
                  <div className="comment_area">
                    {
                      item.comments.map(record=>{
                        return (
                        <h6 key={record._id}><span style={{fontWeight:"600"}}>{record.postedBy.name} </span>{record.text}</h6>
                        )
                      })
                    }
                  </div>
                  <form onSubmit={(e)=>{
                    e.preventDefault()
                    makeComment(e.target[0].value,item._id)
                  }}>
                    <input type="text" placeholder='Add comment' />
                  </form>
                </div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default Post
