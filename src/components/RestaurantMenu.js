import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [error, setError] = useState("");
  const { resId } = useParams();

  useEffect(() => {
    const controller = new AbortController();

    const fetchMenu = async () => {
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

        const responseText = await response.text();
        if (!responseText.trim()) {
          throw new Error(
            "The menu API returned an empty response.",
          );
        }

        let json;
        try {
          json = JSON.parse(responseText);
        } catch {
          throw new Error("The menu request returned a non-JSON response.");
        }

        if (!json?.data) {
          throw new Error("The menu response did not contain restaurant data.");
        }

        setResInfo(json.data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(fetchError.message);
        }
      }
    };

    fetchMenu();
    return () => controller.abort();
  }, [resId]);

  if (error) return <p role="alert">Unable to load menu: {error}</p>;
  if (resInfo === null) return <Shimmer />;

  const restaurantInfo = resInfo.cards?.find(
    (card) => card?.card?.card?.info,
  )?.card?.card?.info;
  const menuSections =
    resInfo.cards?.find((card) => card?.groupedCard?.cardGroupMap)?.groupedCard
      ?.cardGroupMap?.REGULAR?.cards ?? [];
  const itemCards = menuSections.flatMap((section) => {
    const card = section?.card?.card;
    return (
      card?.itemCards ??
      card?.categories?.flatMap((category) => category.itemCards ?? []) ??
      []
    );
  });

  return (
    <div className="menu">
      <h1>{restaurantInfo?.name ?? "Restaurant menu"}</h1>
      <p>
        {restaurantInfo?.cuisines?.join(", ")}
        {restaurantInfo?.costForTwoMessage
          ? `, ${restaurantInfo.costForTwoMessage}`
          : ""}
      </p>
      <h2>Menu</h2>
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
    </div>
  );
};

export default RestaurantMenu;
