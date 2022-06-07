import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getRestaurantById } from "./databaseReadCall";
import { Restaurant } from "./Restaurant";

interface TestProps {}

export class TestClass extends React.Component {
  render() {
    return <Test />;
  }
}

export const Test: React.FC = (): any => {
  const [restaurant, setRestaurant] = useState<Restaurant>({
    description: "Empty",
    id: "Empty",
    restaurantName: "Empty",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRestaurantById("A", setRestaurant, setIsLoading);
  }, []);

  return (
    <>
      {isLoading && <Typography>Loading</Typography>}{" "}
      {!isLoading && (
        <>
          <Typography>{restaurant.description}</Typography>
          <Typography>{restaurant.id}</Typography>
          <Typography>{restaurant.restaurantName}</Typography>
        </>
      )}
    </>
  );
};
