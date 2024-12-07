import React, { useContext, useState } from 'react'
import GlobalApi from '../services/GlobalApi'
import { UserLocationContext } from '../context/UserLocationContext'
import { BusinessListContext } from '../context/BusinessListContext'
import { SearchingContext } from '../context/SearchingContext'
import axios from 'axios'

function AISearchBar() {
  const {userLocation,setUserLocation}=useContext(UserLocationContext)
  const {businessList,setBusinessList}=useContext(BusinessListContext)
  const {searchWithAI, setSearchWithAI} = useContext(SearchingContext)
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
 
  const searchPlace= async (text)=>{
    setSearchText(text)
    setIsLoading(true)
    try {
        const response = await axios.post('https://ekho13ttx2.execute-api.us-east-1.amazonaws.com/Prod/api/suggest', {
          input: text,
          location: `${userLocation.lat},${userLocation.lng}`
        });
        
        console.log('AI Search Results:', response.data);
        setBusinessList(response.data);
        setSearchWithAI(true);
    } catch (error) {
        console.error('Error searching places:', error);
    } finally {
        setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchPlace(e.target.value)
    }
  }

  return (
    <div className='flex gap-3 bg-purple-100 p-3 rounded-xl items-center'>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className='w-6 h-6'
          fill="none"
          stroke="black"
          strokeWidth="2"
        >
          <rect x="45" y="30" width="10" height="50" fill="#6c4a25" />
          <polygon
            points="50,15 53,25 63,25 55,30 58,40 50,33 42,40 45,30 37,25 47,25"
            fill="#ffcc00"
            stroke="#ffaa00"
            strokeWidth="1"
          />
          <circle cx="30" cy="20" r="2" fill="#ffe066" />
          <circle cx="70" cy="20" r="2" fill="#ffe066" />
          <circle cx="50" cy="5" r="2" fill="#ffe066" />
          <circle cx="40" cy="10" r="1.5" fill="#ffd700" />
          <circle cx="60" cy="10" r="1.5" fill="#ffd700" />
        </svg>

        <div className="relative flex-1">
          <input 
            type='text'
            placeholder='AI Search'
            onKeyDown={handleKeyDown}
            className={`bg-transparent outline-none w-full text-[17px]
            placeholder-purple-400 ${isLoading ? 'invisible' : ''}`}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center">
              <div className="text-[17px] text-purple-600 animate-pulse">
                Searching for "{searchText}"
                <span className="inline-block animate-bounce">.</span>
                <span className="inline-block animate-bounce delay-100">.</span>
                <span className="inline-block animate-bounce delay-200">.</span>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default AISearchBar