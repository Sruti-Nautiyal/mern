import React, { useState } from 'react'
import './signup.css'
import {AiOutlineFileImage} from 'react-icons/ai'
import {useNavigate,Link} from 'react-router-dom'
import { request } from '../../APIs/fetch'

function SignUp() {
  const [state,setState]=useState({})
  const [photo,setphoto]=useState("")
  //const dispatch=useDispatch()
  const navigate =useNavigate()

  const handleState =(e) =>{
    setState(prev=>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()


    try {
      let filename=null
      if(photo){
        const formData=new FormData()
        filename=crypto.randomUUID()+photo.name
        formData.append('filename', filename)
        formData.append('images', photo)

        await request(`/upload/images`,"POST",{}, formData,true)
      }else{
        return
      }

      const headers={
        'Content-Type':"application/json"
      }
      const data=await request(`/auth/register`,"POST",headers,{...state,profileImg: filename})
      console.log(data)
      //dispatch(register(data))
      navigate('/')
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='signup'>
      <div className="sign_wrap">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit} className='fs'>
          <input type='text' name='username' placeholder='name' onChange={handleState}/>
          <input type='email' name='email' placeholder='email' onChange={handleState}/>
          <label htmlFor='photo'>Upload Photo <AiOutlineFileImage/></label>
          <input id='photo' type='file' style={{display:'none'}} onChange={(e)=>setphoto(e.target.files[0])}/>
          <input type='password' name='password' placeholder='password'onChange={handleState}/>
          <button type="submit">Register</button>
          <p>Already have an account?<Link to='/signIn'>Sign In</Link> </p>

        </form>
      </div>
      
    </div>
  )
}

export default SignUp
