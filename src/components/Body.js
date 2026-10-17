import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import { resList } from "../../utils/mockData";
import Shimmer from "./Shimmer";

const Body = () => {
  //Local State Variable -Super powerfull variable for that we use react Hooks(useState)
  const [listOfRestaurants, SetListOfRestaurant] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);
  const [searchText, SetsearchText] = useState([]);
  // console.log("body renedered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // try {
    const response = await fetch(
      "https://namastedev.com/api/v1/listRestaurants",
    );
    const json = await response.json();
    const restaurants =
      json?.data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants ?? [];
    SetListOfRestaurant(restaurants);
    setfilteredRestaurant(restaurants);
  };
  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            placeholder="Search a restaurant..."
            className="search-box"
            value={searchText}
            onChange={(e) => {
              SetsearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              console.log(searchText);
              const filtered = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase()),
              );
              setfilteredRestaurant(filtered);
            }}
          >
            {" "}
            Search
          </button>
        </div>

        <button
          className="filter-btn"
          onClick={() => {
            //Filter logic here
            const filterlist = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.4,
            );
            SetListOfRestaurant(filterlist);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
