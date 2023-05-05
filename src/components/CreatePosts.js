import React, { useState } from 'react'
import '../style/createpost.css'
import { useNavigate } from 'react-router-dom'
import DemoImg from '../resources/image-placeholder.svg'

function CreatePosts() {
  const navigate = useNavigate('')
  const [title,setTitle] = useState('')
  const [body,setBody] = useState('')
  const [image,setImage] = useState('')
  const [url,setUrl] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const postDetails = ()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","dnn8wd1xj")
    fetch('https://api.cloudinary.com/v1_1/dnn8wd1xj/image/upload',{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data.url)
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
    fetch('/createpost',{
      method:'post',
      headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          title,
          body,
          pic:url
      })
  })
  .then(res=>res.json())
  .then(data=>{
      console.log(data)
      if(data.error){
        console.log(data.error)
          alert(data.error)
      }
      else{
        navigate('/')
      }
  })

}

const handleDiscard=()=>{
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
  return (
    <div className='create_post'>

      
      <div className="create_post_box">
        {previewUrl ? (
          <>
        <div className="image_preview">
       <img className='preview' src={previewUrl} alt="preview" />
        </div>
        <div className="post_editor">
          <div className="caption">
            <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" />
            <input value={body} onChange={(e)=>setBody(e.target.value)} type="text" />
          </div>

          <div className="editor_btn">
          <button onClick={()=>postDetails()}>submit</button>
          <button onClick={handleDiscard}>Discard</button>
          </div>

        </div>
        
          </>

        ) : (
          <>
<input style={{display:"none"}} id="fileInput" onChange={handleImageChange} type="file" />
          <div className="demo_image">
          <img src={DemoImg} alt="demo" />
          <button className='choose_filebtn' onClick={handleSelectFile}>Select Image</button>
          </div>
          </>

        )}

      </div>

    </div>
   );

}



export default CreatePosts
