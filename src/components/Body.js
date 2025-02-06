// import React from "react";
// import { CiSearch } from "react-icons/ci";
// import RestaurantCard from "./RestaurantCard";
// import { useState, useEffect } from "react";
// import Shimmer from "./Shimmer";

// const Body = () => {
//     //Local State Variable  - Super Powerful Variable
//     const [listOfRestaurants, setlistOfRestaurants] = useState([]);
//     const [searchText, setSearchText] = useState("");
//     const [filterRestaurant, setFilterRestaurant] = useState([]);

//     useEffect(() => {
//         fetchData();
//     }, [])
    
//     const fetchData = async () => {

//             const data = await fetch(
//                 "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9046136&lng=77.614948&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
            
//             const json = await data.json();
//             console.log(json);
//             function checkJsonData(jsonData) {
//                 for (let i = 0; i < jsonData?.data?.cards.length; i++) {
//                   // initialize checkData for Swiggy Restaurant data
//                   let checkData =
//                     json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
//                       ?.restaurants;
        
//                   // if checkData is not undefined then return it
//                   if (checkData !== undefined) {
//                     return checkData;
//                   }
//                 }
//               }
//             const resData = checkJsonData(json);

//             setlistOfRestaurants(resData);
//             setFilterRestaurant(resData);
//         }

//     // console.log('Body Rendered');

//     // const filterData = (searchText, listOfRestaurants) =>{
//     //     const filterData = listOfRestaurants.filter((restaurant) => restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase()));
//     //     return filterData;
//     // }

//     // if(listOfRestaurants.length === 0){
//     //     return <Shimmer/>
//     // }
//     return listOfRestaurants.length === 0 ? (
//     <Shimmer/> 
//     ) : (
//         <>
//         <div className="body">
//             <div className="search-box">
//                 <input 
//                     placeholder="search" 
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                 />
//                 <button 
//                     className="search-btn"
//                     onClick={() =>{
//                         const filteredData = listOfRestaurants.filter(
//                             (res) => res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
//                     )
//                     setFilterRestaurant(filteredData)
//                     }}
//                 >Search
//                 </button>
//             </div>
//             {/* <button 
//                 className="filter-btn" 
//                 onClick={() => {
//                     const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 4);
//                     setlistOfRestaurants(filteredList)
//                 }}
//                 >Top Rated Restaurants
//             </button> */}
//             <div className="restaurant-container">
//                 {filterRestaurant.map((restaurant) =>(
//                  <RestaurantCard key={restaurant.info.id} restaurantData={restaurant}/>
//                 ))}

//             </div>
//         </div>
//         </>
//     )
// }

// export default Body;


import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { RestaurantShimmer } from "./Shimmer";
import {
  SWIGGY_API_URL,
  SWIGGY_REST_API_PATH,
} from "../public/constants";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchRestaurant, setSearchRestaurant] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  const fetchRestaurantsData = async () => {
    try {
      const data = await fetch(SWIGGY_API_URL);
      const json = await data.json();
      const restaurants = eval("json?." + SWIGGY_REST_API_PATH) || [];

      setListOfRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRestaurantsData();
  }, []);

  const handleSearch = () => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchRestaurant.toLowerCase())
    );

    setFilteredRestaurants(filtered);
    setSearchRestaurant(""); // Clear the search input box after search
    setRestaurantName(searchRestaurant);
  };

  // Conditional rendering using ternary operator
  return listOfRestaurants.length === 0 ? (
    <RestaurantShimmer />
  ) : (
    <div className="body">
      <div className="search-box">
        <input
          type="text"
          value={searchRestaurant}
          onChange={(e) => setSearchRestaurant(e.target.value)}
          placeholder="search a restaurant you want..."
        />
        <button className="search" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="restaurant-container">
        {filteredRestaurants.length !== 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant?.info?.id} {...restaurant?.info} />
          ))
        ) : (
          <h2>Sorry, we couldn't find any restaurant for "{restaurantName}"</h2>
        )}
      </div>
    </div>
  );
};

export default Body;