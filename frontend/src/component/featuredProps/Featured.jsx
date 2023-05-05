import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { request } from '../../APIs/fetch'
import img from '../../assets/Mount2.jpg'
import './featured.css'
import {FaBed, FaSquareFull } from 'react-icons/fa'

function Featured() {
  const [featureProps,setFeaturedProps]=useState([])

  useEffect(()=>{
   
    const fetchFeatured= async()=>{
      try {
        const data =await request(`/property/find/featured`,"GET")
        //console.log(data)
        setFeaturedProps(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchFeatured()
  },[])
  //http://localhost:5000/property
  //console.log(featureProps)
  return (
    <div className='feature'>
      <div className="feature_wrap">
        <div className="feature_title">
          <h5>properties you may like</h5>
          <h2>our feature props</h2>
        </div>
        <div className="featureProps">
          {featureProps?.map((property)=>(
            <div key={property._id} className="featureProp">
              <Link to={`/propertyDetail/${property._id}`}className='imgContainer'>
                <img src={`http://localhost:5000/images/${property?._img}`} alt=""/>
                {/* {property.img} */}
              </Link>
              <div className="details">
                <div className="priceAndOwner">
                  <span className='price'>{property?.price}
                  </span>
                  <img scr={img} alt='' className='owner'/>
                </div>
                <div className="moreDetails">
                  <span> {property?.beds} beds <FaBed className='iconf'/></span>
                  <span>{property?.sq_area} Square mt <FaSquareFull className='iconf'/></span>
                </div>
                <div className="desc">
                  {property?.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Featured
