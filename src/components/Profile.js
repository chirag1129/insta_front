import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import '../style/profile.css';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// import DemoImg from '../resources/image-placeholder.svg'

function Profile() {
  const navigate = useNavigate('')
  const { state, dispatch } = useContext(UserContext);
  const [mypics, setMypics] = useState([]);
  const [image, setImage] = useState('')

  const [previewUrl, setPreviewUrl] = useState('')

  useEffect(() => {
    fetch('/mypost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((resulte) => {
        setMypics(resulte.mypost);
      });
  }, []);



  const handleDiscard = () => {
    if (window.confirm("Are you sure you want to discard the uploaded image?")) {
      setPreviewUrl("");
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSelectFile = () => {
    document.getElementById('fileInput').click()
  }

  const uploadProfile = () => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "dnn8wd1xj")
    fetch('https://api.cloudinary.com/v1_1/dnn8wd1xj/image/upload', {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        // localStorage.setItem("user", JSON.stringify({
        //   ...state, profileImage
        //     : data.url
        // }))
        // dispatch({type:"UPDATEPROFILE",payload:data.url})
        fetch("/updateprofile", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            pic: data.url
          })
        })
          .then(res => res.json())
          .then(result => {
            console.log(result)
            localStorage.setItem("user", JSON.stringify({
              ...state, profileImage
                : result.resulte.profileImage
            }))
            dispatch({type:"UPDATEPROFILE",payload:result.resulte.profileImage})
          })
        navigate('/profile')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='user_profile'>
      <div className='user_details'>
        <div className='profile_img'>
          <Avatar
            className='profile_pic'
            style={{ width: '150px', height: '150px' }}
            alt=''
            src={state ? state.profileImage : ""} // Update the profile image URL to use the value from the state or the database
          />
          <div className='edit_profile_box'>
            {previewUrl ? (
              <>
                <div className="profile_preview">
                  <img className='pic_preview' src={previewUrl} alt="preview" />
                </div>
                <div className="profile_details">
                  <div className="upload_btn">
                    <button onClick={() => uploadProfile()}>submit</button>
                    <button onClick={handleDiscard}>Discard</button>
                  </div>

                </div>

              </>

            ) : (
              <>
                <input style={{ display: "none" }} id="fileInput" onChange={handleImageChange} type="file" />
                <div className="demo_image">
                  {/* <img src={DemoImg} alt="demo" /> */}
                  <button className='select_profileImg' onClick={handleSelectFile}>Select Image</button>
                </div>
              </>

            )}

          </div>
        </div>
        <div className='profile_info'>
          <h4>{state ? state.name : 'loading'}</h4>
          <div className='profile_follow_count'>
            <p>
              <span>{mypics.length}</span>Post
            </p>
            <p>
              <span>{state ? state.followers.length : '0'}</span>Followers
            </p>
            <p>
              <span>{state ? state.following.length : '0'}</span>Following
            </p>
          </div>
          <h5>{state ? state.nickname : 'loading'}</h5>
        </div>
      </div>
      <hr
        style={{
          width: '80%',
          margin: '30px auto',
          color: 'gray',
          opacity: '0.4',
        }}
      />
      <div className="profile_grid">
        {
          mypics.map(item => {
            return (

              <img className="profile_item" key={item._id} src={item.photo} alt="" />

            )
          })
        }
      </div>
    </div>
  )
}

export default Profile
