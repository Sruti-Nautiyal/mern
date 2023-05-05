import React, { useEffect, useRef, useState } from 'react'
import './property.css'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import {request} from '../../APIs/fetch.js'
import {FaBed,FaSquareFull} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import emailjs from '@emailjs/browser'

export default function PropertyDetail() {
  const {user}=useSelector((state)=>state.auth)
  const [propertyDetail,setPropertyDetail]=useState(null)
  const [showForm,setShowForm]=useState(false)
  const [title,setTitle]=useState('')
  const [desc,setDesc]=useState('')
  const {id}=useParams()
  const formRef=useRef()


  const serviceId=process.env.REACT_APP_SERVICE_ID
  const templateId=process.env.REACT_APP_TEMPLATE_ID
  const publicKey=process.env.REACT_APP_PUBLIC_KEY

  console.log(serviceId,publicKey)

  useEffect(()=>{
    const fetchDetails=async()=>{
      try {
        const data=await request(`/property/find/${id}`,"GET")
        setPropertyDetail(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchDetails()
  },[id])

  const handleCloseForm=()=>{
    setShowForm(false)
    setTitle("")
    setDesc("")
  }

  const handleContactOwner=async(e)=>{
    e.preventDefault()

    emailjs.sendForm(serviceId,templateId,formRef.current,publicKey)
    .then((result)=>console.log(result.text))
    .catch((error)=>console.log(error.text))
  }

  return (
    <div className='pdContainer'>
      <div className="pdWrap">
        <div className="pdLeft">
          <img src={`http://localhost:5000/images/${propertyDetail?.img}`} alt=''/>
        </div>

        <div className="pdRight">
          <h3 className='pdTitle'>
            Title:{propertyDetail?.title}
          </h3>

          <div className="pdDetails">
            <div className="typeAndPlace">
              <div>Type:<span>{`${propertyDetail?.type}`}</span></div>
              <div>Place:<span>{`${propertyDetail?.place}`}</span></div>
            </div>

            <div className="pdPriceAndOwner">
              <span className='pdPrice'><span>Price: ₹</span>{`${propertyDetail?.price}`}</span>
              <span style={{display:'flex', alignItems:'center',gap:'2px'}}>
                Owner <img src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}` } alt=''/>
              </span>
            </div>
            <div className="pdmoreDetails">
              <span>{propertyDetail?.beds}<FaBed className='icon'/></span>
              <span>{propertyDetail?.sq_area}<FaSquareFull className='icon'/></span>
            </div>
          </div>
          <p className="pdDesc">
            Desc:<span>{`${propertyDetail?.desc}`}</span>
          </p>
          <button onClick={()=>setShowForm(true)} className='contactOwner'>Contact Owner</button>
        </div>
      </div>
      {
        showForm && (
          <div className="contactForm" onClick={handleCloseForm}>
            <div className="contactFormWrapper" onClick={(e)=>e.stopPropagation()}>
                <h2>Send Email to Owner</h2>
                <form ref={formRef} onSubmit={handleContactOwner}>
                  <input value={user?.email} type='text' placeholder='My Email' name='From_Email'/>
                  <input value={user?.username} type="text" placeholder='My username' name="from_username"  />
                  <input value={propertyDetail?.currentOwner?.email} type="email" placeholder='Owner email' name="to_email"  />
                  <input value={title} type="text" placeholder='Title' name="from_title" onChange={(e) => setTitle(e.target.value)} />
                  <input value={desc} type="text" placeholder='Desc' name="message" onChange={(e) => setDesc(e.target.value)} />
                  <button>Send</button>
                </form>
                <AiOutlineClose onClick={handleCloseForm} className='removeIcon' />
            </div>
          </div>
        )
      }
    </div>
  )
}
