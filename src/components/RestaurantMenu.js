import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMenu = async () => {
      setResInfo(null);
      setError("");

      try {
        const response = await fetch(
          `https://namastedev.com/api/v1/listRestaurantMenu/${encodeURIComponent(resId)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(
            `Menu request failed (${response.status} ${response.statusText}).`,
          );
        }

        const menuResponse = await response.json();
        if (!menuResponse?.status || !menuResponse?.data?.cards) {
          throw new Error(
            menuResponse?.message || "Restaurant menu data was not found.",
          );
        }

        setResInfo(menuResponse.data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message);
        }
      }
    };

    fetchMenu();
    return () => controller.abort();
  }, [resId]);

  if (error) {
    return <p role="alert">Unable to load menu: {error}</p>;
  }

  if (resInfo === null) {
    return <Shimmer />;
  }

  const restaurantInfo = resInfo.cards[2]?.card?.card?.info;
  const menuCards =
    resInfo.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? [];
  const itemCards = menuCards.flatMap((menuCard) => {
    const card = menuCard.card?.card;
    return (
      card?.itemCards ??
      card?.categories?.flatMap((category) => category.itemCards ?? []) ??
      []
    );
  });

  return (
    <div className="menu">
      <h1>{restaurantInfo?.name}</h1>
      <p>
        {restaurantInfo?.cuisines?.join(", ")}
        {restaurantInfo?.costForTwoMessage
          ? `, ${restaurantInfo.costForTwoMessage}`
          : ""}
      </p>
      <h2>Menu</h2>
      {itemCards.length > 0 ? (
        <ul>
          {itemCards.map((item) => {
            const info = item.card.info;
            const price = info.price ?? info.defaultPrice;

            return (
              <li key={info.id}>
                {info.name}
                {price != null ? ` - ₹${price / 100}` : ""}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Menu items are not available.</p>
      )}
    </div>
  );
};

export default RestaurantMenu;
