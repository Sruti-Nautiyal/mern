import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation, Link} from 'react-router-dom'
import {request} from '../../APIs/fetch.js'
import { placeToIdx } from '../../APIs/place.js'
import { arrPriceRanges } from '../../APIs/price.js'
import './Properties.css'
import {AiOutlineSearch} from 'react-icons/ai'
import {FaSquareFull,FaBed} from 'react-icons/fa'

function Properties() {
  const [allProperties,setAllProperties]=useState([])
  const [filterProperties,setFilterProperties]=useState([])
  const [state,setState]=useState(null)
  const query=( useLocation().search).slice(1)
  const arrQuery=query.split("&")
  const navigate= useNavigate()


  const handleState=(e)=>{
    setState(prev=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }

  useEffect(()=>{
    const fetchAllProperties = async()=>{
      const data=await request(`/property/getAll`,'GET')
      setAllProperties(data)
    }
    fetchAllProperties()
  },[])

  useEffect(()=>{
    if(arrQuery && allProperties?.length> 0 && state===null){
      let formateQuery={}
      arrQuery.forEach((option,idx)=>{
        //console.log(option.split("="))
        const key=option.split("=")[0]
        const value=option.split("=")[1]


        formateQuery={...formateQuery,[key]:value}
        if(idx=== arrQuery.length-1){
          setState(formateQuery)
          //console.log(formateQuery)
          //handleSearch(formateQuery)
        }
      })
    }
  },[allProperties,arrQuery])
   //console.log(allProperties)

  const handleSearch = (param = state)=>{
    let opt
    console.log(state)
    if(param?.nativeEvent)
    {
      opt=state
    }else{
      opt=param
    }
      const filterProperties =allProperties.filter((property)=>{
      const price=arrPriceRanges[opt.priceRange]
      const minPrice=Number(price.split('-')[0])
      const maxPrice=Number(price.split('-')[1])
      console.log(property.place,opt.place,)

      const place=placeToIdx(property.place)
      console.log(property.type,opt.type.toLowerCase(),place,Number(opt.place))
      if(property.type===opt.type.toLowerCase() && place===Number(opt.place) && property.price>=minPrice && property.price<=maxPrice)
      {
        return property
      }
    })

    const queryStr=`type=${opt.type}&place=${opt.place}&priceRange=${opt.priceRange}`

    navigate(`/properties?${queryStr}`,{replace:true})
    setFilterProperties(filterProperties)

  }

  return (
    <div className='containerp'>
      <div className='wrapperp'>
      <div className="optionsp">
          <select value={state?.type} name="type" onChange={handleState}>
            <option disabled>Select types</option>
            <option value='House'>House</option>
            <option value='Flat'>Flat</option>
            <option value='Room'>Room</option>
          </select>
          <select onChange={handleState} value={state?.priceRange} name="priceRange">
            <option disabled>Select price Range</option>
            <option value='0'>0-10000</option>
            <option value='1'>10000-20000</option>
            <option value='2'>20000-30000</option>
            <option value='3'>30000-50000</option>
            <option value='4'>50000-100000</option>
          </select>
          <select onChange={handleState} value={state?.place} name="place">
            <option disabled>Select Place</option>
            <option value="0">Fatehpur</option>
            <option value="1">Kanpur</option>
            <option value="2">Pratapgarh</option>
            <option value="3">Varanashi</option>
            <option value="4">Lucknow</option>
            <option value="5">Allahabad</option>
          </select>

          <button className='searchBtn' >
            <AiOutlineSearch className='icon' onClick={handleSearch}  />
          </button>
        </div>
        {filterProperties.length > 0 ?
          <>
            <div className='titlesp'>
              <h5>Selected properties</h5>
              <h2>Property you may like</h2>
            </div>
            <div className='propertiesp'>
              {filterProperties?.map((property) => (
                <div key={property._id} className='propertyp'>
                  <Link to={`/propertyDetail/${property._id}`} className='imgContainer'>
                    <img src={`http://localhost:5000/images/${property?.img}`} alt="" />
                  </Link>
                  <div className='detailsp'>
                    <div className='priceAndOwnerp'>
                      <span className='pricep'>$ {property.price}</span>
                      <img src='https://images.unsplash.com/photo-1680006276756-0630979c2f31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60' alt='' className='owner' />
                    </div>
                    <div className='moreDetailsp'>
                      <span>{property.beds} <FaBed className='icon' /></span>
                      <span>{property.sqmeters} square meters<FaSquareFull className='icon' /></span>
                    </div>
                    <div className='descp'>
                      {property.decs}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </> : <h2 className='noProperty'>We have no properties with the specified options.</h2>}
      </div>
    </div>
  )
}

export default Properties
