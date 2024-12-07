import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import SideNavBar from "../components/SideNavBar";
import SearchBar from "../components/SearchBar";
import AISearchBar from "../components/AISearchBar";
import CategoryList from "../components/CategoryList";
import BusinessList from "../components/BusinessList";
import GlobalApi from "../services/GlobalApi";
import { useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import GoogleMap_ from "../components/GoogleMap_";
import { BusinessListContext } from "../context/BusinessListContext";

import { SelectedBusinessContext } from "../context/SelectedBusinessContext";
import BusinessToast from "../components/BusinessToast";
import { SearchingContext } from "../context/SearchingContext";

export default function Home() {
  const [businessList,setBusinessList]=useState([]);
  const [selectedBusiness,setSelectedBusiness]=useState([]);
  const [searchWithAI, setSearchWithAI] = useState(false);

  const {userLocation,setUserLocation}
  =useContext(UserLocationContext)

  useEffect(()=>{
    if(userLocation)
      getNearByPlace('restaurant');
    
   
  },[userLocation])

  const getNearByPlace=(category)=>{
    GlobalApi.getNearByPlace(category,userLocation?.lat,
      userLocation.lng)
    .then(resp=>{
    
      setBusinessList(resp.data.results)
    })
  }
  return (
    <div className="flex">
      <SelectedBusinessContext.Provider value={{selectedBusiness,setSelectedBusiness}}>
      <BusinessListContext.Provider value={{businessList,setBusinessList}}>
      <SearchingContext.Provider value={{searchWithAI, setSearchWithAI}}>
      <SideNavBar />
      <div className="grid grid-cols-1
      md:grid-cols-2 px-6 md:px-10 w-full mt-10 gap-8">
      
        <div>
          {/* Search Bar  */}
          <SearchBar/>
          <p className="text-center text-[15px] text-gray-500">or</p>
          <AISearchBar/>
          
          {/* Category List  */}
          <CategoryList setSelectedCategory={(category)=>
            getNearByPlace(category)} />
          {/* Business List */}
          <BusinessList businessListData={businessList} />
        </div>

        {/* Google Map */}
        <div className="order-first md:order-last">
          <GoogleMap_/>
          <BusinessToast userLocation={userLocation} />
        </div>
      </div>
      </SearchingContext.Provider>
      </BusinessListContext.Provider>
      </SelectedBusinessContext.Provider>
    </div>
  );
}
