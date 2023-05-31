import React, { useState } from 'react'
import './navbar.css'
import {Link, useNavigate } from 'react-router-dom'
import {BsHouseDoor} from 'react-icons/bs'
import {useDispatch, useSelector} from 'react-redux'
import { request } from '../../APIs/fetch'
import {AiOutlineClose, AiOutlineFileImage} from 'react-icons/ai'
import { logout } from '../../redux/authSlice'

export default function Navbar() {
  const [state,setState]=useState({})
  const [photo,setPhoto]=useState('')
  const [showForm,setShowForm]=useState(false)
  const {user,token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleState=(e)=>{
    setState(prev =>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

  const handleLogout=()=>{
    dispatch(logout())
    navigate('/signIn')

  }
  const handleCloseForm=()=>{
    setShowForm(false)
    setPhoto(null)
    setState({})
  }

  const handleListProperty= async(e)=>{
  e.preventDefault()

  let filename=null
      if(photo){
        const formData=new FormData()
        filename=crypto.randomUUID() + photo.name
        formData.append('filename', filename)
        formData.append('images', photo)

        await request(`/upload/images`,"POST",{}, formData,true)
      }
        else{
          return
        }

        try {
          const options = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": 'application/json'
          }
    
          const data = await request(`/property`, "POST", options, { ...state, img: filename })
          console.log(data)
          handleCloseForm()
          // dispatch(updateUser(data))
          // window.location.reload()
        } catch (error) {
          console.error(error)
        }
  }
  return (
    <div className="nav">
      <div className="wrapper">
        <Link to='/' className="left">
          Real Estate <BsHouseDoor/>
        </Link>
        <ul className="center">
          <Link to='/'><li className="listItem">Home</li></Link>
          <Link to='/About'><li className="listItem">About</li></Link>
          <Link to='/Featured1'><li className="listItem">Featured</li></Link>
          <Link to='/Contact'><li className="listItem">Contact</li></Link>
        </ul>
        <div className="right">
          {
          !user ? 
          <>
            <Link className='list' to='/signUp'>Sign Up</Link>
            <Link className='list' to='/signIn'>Sign In</Link>
          </>
          :
          <>
            <span className='sp'>Hello {user.username}</span>
            <span onClick={handleLogout} className='logoutBtn'>Logout</span>
            <Link onClick={()=>setShowForm(true)} className='list'>List Your Property</Link>
          </>
          }
        </div>
      </div> 
      {
        showForm && 
          (<div className="lpropertyForm" onClick={handleCloseForm}>
            <div className="lpropertyWrap" onClick={(e)=>e.stopPropagation()}>
              <h2>List Property</h2>
              <form onSubmit={handleListProperty} className='f'>
                <input type='text' placeholder='title...' name='title' onChange={handleState}/>
                <input type='text' placeholder='type....' name='type' onChange={handleState}/>
                <input type='text' placeholder='desc....' name='desc' onChange={handleState}/>
                <input type='text' placeholder='place....' name='place' onChange={handleState}/>
                <input type='number' placeholder='price....' name='price' onChange={handleState}/>
                <input type='number' placeholder='sq_area....' name='sq_area' onChange={handleState}/>
                <input type='number' placeholder='Beds....' name='beds' step={1} min={2} onChange={handleState}/>

                <div style={{display:'flex',alignItems:'center', gap:'3px', width:'50%'}}>
                  <label htmlFor='photo'> Property Pic <AiOutlineFileImage/></label>
                  <input type='file' id='photo' style={{display:'none'}} onChange={(e)=>setPhoto(e.target.files[0])}/>

                  {photo && <p>{photo.name}</p>}
                </div>
                <button>Add property</button>
              </form>
              <AiOutlineClose onClick={handleCloseForm} className='picon'/>
            </div>
          </div>
          )
      } 
    </div>
  )
  return(
    <nav className="nav">
  <div className="wrapper">
    <a className="left" href="#">Logo</a>
    <button className="toggleBtn" aria-label="Toggle Navigation Menu">
      <span className="icon"></span>
    </button>
    <ul className="center">
      <li><a className="listItem" href="#">Home</a></li>
      <li><a className="listItem" href="#">About</a></li>
      <li><a className="listItem" href="#">Services</a></li>
      <li><a className="listItem" href="#">Contact</a></li>
    </ul>
    <div className="right">
      <a href="#">Login</a>
      <a href="#">Signup</a>
    </div>
  </div>
</nav>

  )
}
