import React, { useState } from 'react'
import Logo from '../resources/logo.png'
import { useNavigate } from 'react-router-dom'
import Playstore from '../resources/images/play.png'
import Applestore from '../resources/images/app.png'
import '../style/signup.css'

function Signup() {
    const nevigate = useNavigate('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\+?\d{1,3}?\s?(\d{10})$/;

    const PostData = () => {
        if (!emailPattern.test(email) || !phonePattern.test(email)) {
            return alert("please enter valid email or phone number")
        }
        fetch('/signup', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email,
                nickname,
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    alert(data.error)
                }
                nevigate('/login')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='signup'>
            <div className="signup_box">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="signup_input">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                    <input value={nickname} onChange={(e) => setNickname(e.target.value)} type="text" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                </div>
                <div className="terms_conditions">
                    <div className="first_condition">
                        <p>People who use our service may have uploaded your contact information to Instagram. Learn More
                        </p>
                    </div>
                    <div className="second_condition">
                        <p>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .
                        </p>
                    </div>
                </div>
                <button onClick={() => PostData()}>Sign up</button>
            <div className="app_storeImg">
                <img src={Playstore} alt="" />
                <img src={Applestore} alt="" />
            </div>
            </div>

        </div>
    )
}

export default Signup
