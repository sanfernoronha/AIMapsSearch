import { useEffect, useState } from 'react'
import '../styles/globals.css'
import { UserLocationContext } from '../context/UserLocationContext'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  const [userLocation, setUserLocation] = useState([])
  const [locationError, setLocationError] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  useEffect(() => {
    checkLocationPermission()
  }, [])

  const checkLocationPermission = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      if (result.state === 'denied') {
        setLocationError('Location access is blocked.')
      } else if (result.state === 'prompt') {
        getUserLocation()
      } else if (result.state === 'granted') {
        getUserLocation()
      }

      result.addEventListener('change', (e) => {
        if (e.target.state === 'granted') {
          getUserLocation()
          setLocationError(false)
          setShowInstructions(false)
        } else {
          setLocationError('Location access is blocked.')
        }
      })
    })
  }

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
        setLocationError(false)
        setShowInstructions(false)
      },
      function(error) {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('Location access is blocked.')
          setShowInstructions(true)
        }
      }
    )
  }

  return (
    <>
      <UserLocationContext.Provider value={{userLocation, setUserLocation}}>
        {/* Location Error Banner */}
        {locationError && (
          <div className="fixed top-0 left-0 right-0 bg-yellow-50 p-4 shadow-md z-50">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                  strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-600">
                  <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" 
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="text-yellow-800">{locationError}</p>
                <button 
                  onClick={() => setShowInstructions(!showInstructions)}
                  className="ml-2 px-4 py-1 bg-yellow-100 hover:bg-yellow-200 
                           rounded-md text-yellow-800 text-sm transition-colors duration-200"
                >
                  How to enable?
                </button>
              </div>
              
              {showInstructions && (
                <div className="text-sm text-yellow-800 mt-2 bg-yellow-100 p-3 rounded-md">
                  <p className="font-semibold mb-1">To enable location services:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Click the lock/info icon in your browser's address bar</li>
                    <li>Find "Location" or "Site Settings"</li>
                    <li>Change the setting to "Allow"</li>
                    <li>Refresh the page</li>
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Vote Banner */}
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" 
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
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