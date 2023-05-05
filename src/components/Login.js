import React,{useState, useContext} from 'react'
import {UserContext} from '../App'
import '../style/login.css'
import IMG from '../resources/images/9364675fb26a.svg'
import Playstore from '../resources/images/play.png'
import Applestore from '../resources/images/app.png'
import Logo from '../resources/logo.png'
import {useNavigate,Link} from 'react-router-dom'

function Login() {

const {dispatch} = useContext(UserContext)
  const nevigate = useNavigate('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const PostData=()=>{
      fetch('/signin',{
          method:'post',
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              password,
              email,
          })
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
          if(data.error){
              alert(data.error)
          }
          else{

              localStorage.setItem("jwt",data.token)
              localStorage.setItem("user", JSON.stringify(data.user))
              dispatch({type:"USER",payload:data.user })
              nevigate('/')
            }
      })
  }

  return (
    <div className='login'>
        <div className="login_left">
          <img src={IMG} alt="" />
        </div>
        <div className="login_right">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
            <form onSubmit={(e)=>{
                e.preventDefault()
                PostData()
            }}>

        <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="text" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} required type="text" />
            <button onClick={()=>PostData()}>login</button>
            <p>Forgot passwprd?</p>
            </form>
            <span>OR</span>
        <div className="singup">
            <span>Don't have an account?<Link to='/signup'>sign up</Link></span>
            <span>Have an account?<Link to='/login'>sign in</Link></span>
            <span>Get the app.</span>
            <div className="app_storeImg">
                <img src={Playstore} alt="" />
                <img src={Applestore} alt="" />
            </div>
        </div>
        </div>
      
    </div>
  )
}

export default Login;