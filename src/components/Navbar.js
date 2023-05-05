import React, { useContext } from 'react'
import Logo from '../resources/logo2.png'
import '../style/sidenave.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'


function Navbar() {

  const { dispatch } = useContext(UserContext)
  const navigate = useNavigate('')

  const Logout = () => {
    localStorage.clear()
    dispatch({ type: "CLEAR" })
    navigate('/login')
  }

  return (
    <div className='sidenav'>
      <div className="sidenav_logo">
        <Link to="/"><img className='sidenav_logoimg' src={Logo} alt='' /></Link>
      </div>
      <div className="sidenav_menu">
        <div className="sidenav_option">
          <Link to='/'><i class="fa-solid fa-house"></i>Home</Link>
        </div>
        <div className="sidenav_option">
          <Link to='/'><i class="fa-solid fa-magnifying-glass"></i>Search</Link>
        </div>
        <div className="sidenav_option">
          <Link to='/'><i class="fa-regular fa-compass"></i>Explore</Link>
        </div>
        <div className="sidenav_option">
          <Link to='/'><i class="fa-regular fa-square-plus"></i>Reels</Link>
        </div>
        <div className="sidenav_option">
          <Link to='/'><i class="fa-regular fa-comment"></i>Messages</Link>
        </div>
        <div className="sidenav_option">
          <Link to='/'><i class="fa-regular fa-heart"></i>Notifications</Link>
        </div>
        <div className="sidenav_option">
          <Link to='/createpost'><i class="fa-regular fa-square-plus"></i>Create</Link>
        </div>
        <div className="sidenav_option">
          <Link to='/profile'><i class="fa-solid fa-circle-user"></i>Profile</Link>
        </div>
      </div>
      <div className="navbar_moreoption">
        <div className=" dropup sidenav_moreoption">
          <i class="fa-solid fa-bars" data-bs-toggle="dropdown" aria-expanded="false">
          </i>
          <ul class="moreoption_box dropdown-menu">
            <Link to=''><li className='moreoption_item'>Switch appearance</li></Link>
            <li onClick={() => { Logout() }} className='moreoption_item'>Log out</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
