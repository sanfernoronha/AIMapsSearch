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
    <a 
  href="https://mastersunion.org/events/hssl-leaderboard-details/67513adf30ca264e0eff502f" 
  target="_blank" 
  rel="noopener noreferrer"
  className="fixed top-6 -right-8 z-50 bg-purple-500 text-white px-6 py-2 
           shadow-lg hover:bg-purple-600 transition-colors duration-200 
           flex items-center gap-2 transform rotate-45
           animate-pulse"
>
  <span>Vote for us</span>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
</a>
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
