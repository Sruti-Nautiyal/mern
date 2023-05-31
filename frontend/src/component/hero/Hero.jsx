import React, { useState } from 'react'
import './hero.css'
import {AiOutlineSearch} from 'react-icons/ai'
import { useNavigate,Link} from 'react-router-dom'
import Properties from '../properties/Properties'

export default function Hero() {
  const [type,setType]=useState("House")
  const [place,setPlace]=useState("0")
  const [priceRange,setPriceRange]=useState("0")
  const navigate =useNavigate()

  const handleSearch = () => {
    // navigating to properties
   console.log('hellooooooo')
   navigate(`/properties?type=${type}&place=${place}&priceRange=${priceRange}`)
  }


  return (
    <div className="hero">
      <div className="hero_wrapper">
        <h2>Find your place to live </h2>
        <h5>Search for your perfect house</h5>
        <div>
          <Link to={`/properties`}><button>
            Lets's Get Started
          </button>
          </Link>
        </div>
         {/* <div className="options">
          <select onChange={(e)=>setType(e.target.value)} placeholder='types'>
            <option value='' disabled>Select types</option>
            <option value='House'>House</option>
            <option value='Flat'>Flat</option>
            <option value='Room'>Room</option>
          </select>
          
          <select onChange={(e)=>setPriceRange(e.target.value)}>
            <option disabled>Select price Range</option>
            <option value='0'>0-10000</option>
            <option value='1'>10000-20000</option>
            <option value='2'>20000-30000</option>
            <option value='3'>30000-50000</option>
            <option value='4'>50000 -above</option>
          </select>

          <select onChange={(e)=>setPlace(e.target.value)}>
            <option disabled>Select Place</option>
            <option value="0">Fatehpur</option>
            <option value="1">Kanpur</option>
            <option value="2">Pratapgarh</option>
            <option value="3">Varanashi</option>
            <option value="4">Lucknow</option>
            <option value="5">Allahabad</option>
          </select>
          <AiOutlineSearch className='SearchIcon' onClick={handleSearch} />
        </div>  */}
        {/* <Properties/> */}
      </div>
      
    </div>
  )
}
