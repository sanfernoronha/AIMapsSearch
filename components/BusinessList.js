import React, { useContext, useEffect, useState } from "react";
import BusinessItem from "./BusinessItem";
import ShimmerEffectItem from "./ShimmerEffectItem";
import { SelectedBusinessContext } from "../context/SelectedBusinessContext";
import { SearchingContext } from "../context/SearchingContext";

function BusinessList({businessListData}) {
    const [count,setCount]=useState(0);
    const [loader,setLoader]=useState(true);
    const {searchWithAI, setSearchWithAI} = useContext(SearchingContext)
    const {selectedBusiness,setSelectedBusiness}=useContext(SelectedBusinessContext)
    const [filteredCategory, setFilteredCategory] = useState('');
    const [filteredPrice, setFilteredPrice] = useState('');
    const [categories, setCategories] = useState([]);
    useEffect(()=>{
      setInterval(()=>{
        setLoader(false)
      },1000)
    },[])

    useEffect(() => {
      if (businessListData && businessListData.length > 0) {
          const uniqueCategories = [...new Set(businessListData
              .map(business => business.category)
              .filter(category => category))]
          setCategories(uniqueCategories);
      }
  }, [businessListData]);

    useEffect(()=>{
      setLoader(true);
      setCount(0);
      setFilteredCategory('')
      setFilteredPrice('')
    },[businessListData])

    // Filter businesses based on selected category and price
    const filteredBusinesses = businessListData.filter(business => {
      const matchesCategory = !filteredCategory || business.category === filteredCategory;
      const matchesPrice = !filteredPrice || business.price_level?.toString() === filteredPrice;
      return matchesCategory && matchesPrice;
  });


    const priceOptions = [
      { value: '', label: 'Any Price' },
      { value: '1', label: '$' },
      { value: '2', label: '$$' },
      { value: '3', label: '$$$' },
      { value: '4', label: '$$$$' }
  ];

    
  return (
    <div>
      <h2 className="text-[20px] mt-3 font-bold mb-3
       flex items-center justify-between">
        Top Nearby Places
      <span className="flex">
       {count>0? <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={()=>setCount(count-3)}
          className="w-10 h-10 p-2 text-gray-400 hover:text-purple-500
          hover:bg-purple-100 cursor-pointer rounded-lg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>:null}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          onClick={()=>setCount(count+3)}
          className="w-10 h-10 p-2 text-gray-400 hover:text-purple-500
          hover:bg-purple-100 cursor-pointer rounded-lg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </span>
      </h2>

        {/* Filters Section */}
        {!loader && businessListData.length > 0 && (
                <div className="flex gap-4 mb-4">
                    {/* Category Filter */}
                    {categories.length > 0 && (
                        <select
                            value={filteredCategory}
                            onChange={(e) => setFilteredCategory(e.target.value)}
                            className="w-full md:w-[200px] p-2 rounded-lg border border-purple-300 
                                     bg-white text-gray-700 focus:outline-none focus:border-purple-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* Price Filter */}
                    {searchWithAI && (
                      <select
                      value={filteredPrice}
                      onChange={(e) => setFilteredPrice(e.target.value)}
                      className="w-full md:w-[200px] p-2 rounded-lg border border-purple-300 
                               bg-white text-gray-700 focus:outline-none focus:border-purple-500"
                  >
                      {priceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                              {option.label}
                          </option>
                      ))}
                  </select>
                    )}
                    
                </div>
            )}

      {/* Business Item  */}
   {!loader && !searchWithAI?  <div>
        {businessListData.map((business,index)=>
        index>=count&&index<count+3&&(
          <div key={index} className={`cursor-pointer rounded-2xl
          ${selectedBusiness.name==business.name?'bg-purple-50':null}`}
          onClick={()=>setSelectedBusiness(business)}>
            <BusinessItem business={business} />
          </div>
        ))}
      
      </div>:null}
      {!loader && searchWithAI?  <div>
        {filteredBusinesses.map((business,index)=>
        index>=count&&index<count+3&&(
          <div key={index} className={`cursor-pointer rounded-2xl
          ${selectedBusiness.name==business.name?'bg-purple-50':null}`}
          onClick={()=>setSelectedBusiness(business)}>
            <BusinessItem business={business} />
          </div>
        ))}
      
      </div>:null}
     {loader? [1,2,3].map((item,index)=>(
       <ShimmerEffectItem key={index}/>
     )):null}
    
      
    </div>
  );
}

export default BusinessList;
