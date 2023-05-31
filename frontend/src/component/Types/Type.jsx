import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { request } from '../../APIs/fetch'
import './type.css'

function Type() {
  const [properties, setProperties] = useState([])
  const location = useLocation()
  const propertyType = new URLSearchParams(location.search).get('type')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await request(`/property?type=${propertyType}`, "GET")
        setProperties(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchProperties()
  }, [propertyType])

  return (
    <div>
      {properties.map(property => (
        // display each property
        <div className="type">
            <div className="typeItems" key={property._id}>
                <Link to={`/propertyDetail/${property._id}`} className='typeImg'>
                </Link>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Type;
