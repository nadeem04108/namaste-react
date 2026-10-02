import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import { resList } from "../../utils/mockData";
import Shimmer from "./Shimmer";

const Body = () => {
  //Local State Variable -Super powerfull variable for that we use react Hooks(useState)
  const [listOfRestaurants, SetListOfRestaurant] = useState(resList);
  const [filteredRestaurant ,setfilteredRestaurant] = useState([])
  const [searchText, SetsearchText] = useState([]);
  // console.log("body renedered");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        " https://namastedev.com/api/v1/listRestaurants",
      );
      const json = await response.json();

      // console.log("Full JSON response check:", json);

      let restaurantsArray = null;

      // FIX: Drill into json.data.data instead of just json.data
      if (json?.data?.data?.cards) {
        const cards = json.data.data.cards;

        for (let i = 0; i < cards.length; i++) {
          const potentialRestaurants =
            cards[i]?.card?.card?.gridElements?.infoWithStyle?.restaurants;

          if (potentialRestaurants) {
            restaurantsArray = potentialRestaurants;
            console.log(restaurantsArray);
            
            // console.log(`Found restaurants grid at cards index [${i}]!`);
            break;
          }
        }
      }

      // console.log("Extracted Restaurants Array:", restaurantsArray);

      if (restaurantsArray) {
        SetListOfRestaurant(restaurantsArray);
        setfilteredRestaurant(restaurantsArray);
      } else {
        console.warn(
          "Could not find the restaurant array path anywhere in the cards layout.",
        );
      }
    } catch (error) {
      console.error("API reading error details:", error);
    }
  };

  //Normal JS variable
  //   let listOfRestaurantsJS = [
  //     {
  //       type: "restaurant",
  //       data: {
  //         id: "334475",
  //         name: "KFC",
  //         cloudinaryImageId: "bdcd233971bfe5b4d354dcf68bb974db",
  //         cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
  //         avgRating: 3.8,
  //         costForTwo: "₹400 for two",
  //         deliveryTime: 36,
  //       },
  //     },
  //     {
  //       type: "restaurant",
  //       data: {
  //         id: "33448875",
  //         name: "MCD",
  //         cloudinaryImageId: "bdcd233971bfe5b4d354dcf68bb974db",
  //         cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
  //         avgRating: 4.8,
  //         costForTwo: "₹400 for two",
  //         deliveryTime: 36,
  //       },
  //     },
  //     {
  //       type: "restaurant",
  //       data: {
  //         id: "3344757",
  //         name: "DOMINOS",
  //         cloudinaryImageId: "bdcd233971bfe5b4d354dcf68bb974db",
  //         cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
  //         avgRating: 4.5,
  //         costForTwo: "₹400 for two",
  //         deliveryTime: 36,
  //       },
  //     },

  //   ];
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
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
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
