import { CDN_URL } from "../../utils/constant";
import { Link } from "react-router-dom";

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
    <Link
      to={`/restaurants/${resData.info.id}`}
      className="res-card"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      <img
        className="res-logo"
        alt={name}
        src={CDN_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      <h4 className="cuisines-text">{cuisines.join(", ")}</h4>
      <h4>{avgRating} Stars</h4>
      <h4>{costForTwo}</h4>
    </Link>
  );
};

export default RestaurantCard;
