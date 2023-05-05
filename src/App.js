import React,{useEffect,createContext, useReducer, useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Allpost from './components/Allpost';
import Profile from './components/Profile';
import Login from './components/Login';
import CreatePosts from './components/CreatePosts';
import Signup from './components/Signup';
import {reducer,initialState} from './Reducer/UserReducer'
import UserProfile from './components/UserProfile';


export const UserContext = createContext()


const Routing = ()=>{

  const navigate = useNavigate()
  const {dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      navigate('/login')
    }
  },[])

  return(
    <Routes>
    <Route path='/' element={
      <>
        <div className="left">
          <Navbar />
        </div>
        <Allpost />
      </>
    } />
    <Route path='/login' element={
      <>
        <Login />
      </>
    } />
    <Route exact path='/profile' element={
      <>
        <div className="left">
          <Navbar />
        </div>
        <Profile />
      </>
    } />
    <Route path='/profile/:userid' element={
      <>
        <div className="left">
          <Navbar />
        </div>
        <UserProfile/>
      </>
    } />
    <Route path='/createpost' element={
    <>
    <CreatePosts/>
    </>}
    />
    <Route path='/signup' element={
    <>
    <Signup/>
    </>}
    /> 
    </Routes>
  )
}

function App() {

  const [state,dispatch] = useReducer(reducer,initialState)

  return (
    <div className="App">
      <UserContext.Provider value={{state,dispatch}}>

      <Router>
        <Routing/>
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
