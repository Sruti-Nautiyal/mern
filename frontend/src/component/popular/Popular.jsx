import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './popular.css'
import img1 from '../../assets/1.jpg'
import img2 from '../../assets/Mount1.jpg'
import img3 from '../../assets/v1.jpg'
import { request } from '../../APIs/fetch'



function Popular() {
  const [numProperties,setNumPropeties]=useState([])

  useEffect(()=>{
    const fetchNumProperties = async()=>{
      try {
        const data=await request("/property/find/types","GET")
        setNumPropeties(data)
        //console.log(data)
      } catch (error) 
      {
        console.log(error.message)
      }
    }
    fetchNumProperties()
  },[])

  return (
    <div className='popular'>
      <div className="popular_wrapper">
        <div className="titles">
          <h5>Different types of Property</h5>
          <h2>Best type of properties</h2>
        </div>
        <div className="properties">
          <Link className='property' to={`/properties?type=House&place=0&priceRange=1`}>
            <img src={img1} alt='image1'/>
            <div className="quantity"> {numProperties?.House} Properties
            </div>
            <h5>House Properties</h5>
          </Link>
          <Link className='property' to={`/properties?type=Flat&place=0&priceRange=1`}>
            <img src={img2} alt='image1'/>
            <div className="quantity">{numProperties?.Flat} Properties</div>
            <h5>Flat Properties</h5>
          </Link>
          <Link className='property' to={`/properties?type=Room&place=0&priceRange=1`}>
            <img src={img3} alt='image1' />
            <div className="quantity">
              {numProperties?.Room} Properties</div>
            <h5>Room Properties</h5>
          </Link>
        </div>
      </div>
      
    </div>
  )
}

export default Popular
