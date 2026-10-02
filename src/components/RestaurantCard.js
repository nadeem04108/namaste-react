import { CDN_URL } from "../../utils/constant";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    name,
    cuisines,
    avgRating,
    costForTwo,
    cloudinaryImageId,
  } = resData?.info;

  return (
    <div className="res-card">
      <img 
        className="res-logo" 
        alt="restaurant" 
        src={CDN_URL + cloudinaryImageId} 
      />
      <h3>{name}</h3>
      <h4 className="cuisines-text">{cuisines.join(", ")}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{costForTwo}</h4>
    </div>
  );
};

export default RestaurantCard;
