import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../public/constants";
import { MdStarRate } from "react-icons/md";

const RestaurantCard = ({
  id,
  cloudinaryImageId,
  name,
  areaName,
  sla,
  cuisines,
  costForTwo,
  avgRatingString,
}) => {
  return (
    <Link to={"/restaurants/" + id} className="restaurant-card">
      <img
        src={IMG_CDN_URL + cloudinaryImageId}
        alt={name}
        className="restaurant-image"
      />
      <div className="restaurant-details">
        <h3 className="restaurant-name">
          {name.length > 20 ? name.slice(0, 15) + "..." : name.slice(0, 18)}
        </h3>
        <div className="esa-rating">
          <h4 className="rating">
            <MdStarRate
              className="rating-logo"
              style={
                avgRatingString > 4.0
                  ? { backgroundColor: "var(--green)" }
                  : { backgroundColor: "var(--red)" }
              }
            />
            <span>{avgRatingString}</span>
          </h4>
          <h4>{costForTwo}</h4>
          <h4>{sla.deliveryTime} mins</h4>
        </div>
        <p className="cousine">
          {cuisines.join(", ").length > 20
            ? cuisines.join(", ").slice(0, 15) + "..."
            : cuisines.join(", ").slice(0, 20)}
        </p>
        <p className="location">{areaName}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;