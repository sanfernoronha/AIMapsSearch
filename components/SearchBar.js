import React, { useContext, useState } from 'react'
import GlobalApi from '../services/GlobalApi'
import { UserLocationContext } from '../context/UserLocationContext'
import { BusinessListContext } from '../context/BusinessListContext'
import { SearchingContext } from '../context/SearchingContext'

function SearchBar() {
  const {userLocation} = useContext(UserLocationContext)
  const {setBusinessList} = useContext(BusinessListContext)
  const {setSearchWithAI} = useContext(SearchingContext)
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
 
  const searchPlace = async (text) => {
    setSearchText(text)
    setIsLoading(true)
    try {
      const resp = await GlobalApi.searchPlace(text, userLocation.lat, userLocation.lng)
      setBusinessList(resp.data.candidates)
      setSearchWithAI(false)
    } catch (error) {
      console.error('Error searching places:', error)
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
          fill="none"
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-6 h-6 text-purple-400"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" 
          />
        </svg>

        <div className="relative flex-1">
          <input 
            type='text'
            placeholder='Normal Search'
            onKeyDown={handleKeyDown}
            className={`bg-transparent outline-none w-full text-[17px]
              text-gray-800 placeholder-purple-400
              ${isLoading ? 'invisible' : ''}`}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center">
              <div className="text-[17px] text-purple-600 animate-pulse">
                Searching for &quot;{searchText}&quot;
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

export default SearchBar