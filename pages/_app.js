import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { UserLocationContext } from '../context/UserLocationContext'
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {
  const [userLocation,setUserLocation]=useState([])
  useEffect(()=>{
    getUserLocation()
  },[])
  const getUserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    })
  }
  return (
    <>
    <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
      <Component {...pageProps} />
    </UserLocationContext.Provider>
    <Analytics beforeSend={(e) => {
      if (e.url.includes('private')) return null;
      return e;
    }}/>
    </>
  )
}

export default MyApp
