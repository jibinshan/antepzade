"use client";
import {
  type OrganizedMenu,
  organizeMenuByCategory,
} from "@/lib/organize-menu-by-category";
import type { MenuCategory } from "@/types/menu-category.type";
import type { MenuItem } from "@/types/menu-item.type";
import type { ModelData } from "@/types/model-data.type";
import type { Restaurant } from "@/types/restaurant.type";
import type { Review } from "@/types/review.type";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect } from "react";

type MenuContextType = {
  items: MenuItem[];
  isLoading: boolean;
  isFetching: boolean;
  sortedMenu: OrganizedMenu | null;
  menuCategory: MenuCategory[] | undefined;
  apiUrl: string;
  restaurantID: string;
  stripePublishableKey: string;
  restaurant: Restaurant | undefined;
  reviews: Review[] | undefined;
  modelData: ModelData[] | undefined;
};

const RestaurantContext = createContext<MenuContextType | undefined>(undefined);

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a MenuProvider");
  }
  return context;
};

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sortedMenu, setSortedMenu] = React.useState<OrganizedMenu | null>(
    null,
  );

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("Missing API URL in environment variables");
  }

  if (!process.env.NEXT_PUBLIC_RESTAURANT_ID) {
    throw new Error("Missing restaurant ID in environment variables");
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Missing Stripe Publishable Key in environment variables");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const restaurantID = process.env.NEXT_PUBLIC_RESTAURANT_ID;

  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const { data: restaurant } = useQuery({
    queryKey: ["restaurant", restaurantID],
    queryFn: async () => {
      const res: AxiosResponse<{
        data: Restaurant;
      }> = await axios.get(`${apiUrl}/restaurant/${restaurantID}`);
      return res.data.data;
    },
  });

  const {
    data: items,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["menu", restaurantID],
    queryFn: async () => {
      const res: AxiosResponse<{
        data: {
          rows: MenuItem[];
        };
      }> = await axios.get(
        `${apiUrl}/menu?pageSize=30000&pageNum=1&orderBy=order&orderByDir=asc&filter__idRestaurant=${restaurantID}`,
      );

      return res.data.data.rows;
    },
  });

  const { data: menuCategory } = useQuery({
    queryKey: ["restaurant", restaurantID, "category"],
    queryFn: async () => {
      const res: AxiosResponse<{
        data: {
          rows: MenuCategory[];
        };
      }> = await axios.get(
        `${apiUrl}/restaurant/${restaurantID}/category?pageSize=30000&pageNum=1&filter_enabled=true`,
      );
      const data = res.data.data.rows;
      const filteredData = data
        .filter((item) => item.name.toLowerCase() !== "modifiers")
        .filter((item) => item.order)
        .sort((a, b) => a.order - b.order);
      return filteredData
    },
  });

  const { data: modelData } = useQuery({
    queryKey: ["mddel", "all"],
    queryFn: async () => {
      const res: AxiosResponse<{
        data: {
          rows: ModelData[];
        };
      }> = await axios.get(`https://api.prod.sdk.thefoodo.com/model/all`, {
        headers: {
          "x-api-key": "2M4QMv8O5JTzSXBOR1H27EU8POBV1JJ7LZSHQO9O3O",
        },
      });
      const data = res.data.data.rows;
      return data.filter((item) => item.meta.restaurantID === restaurantID);
    },
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res: AxiosResponse<Review[]> = await axios.get(`/api/reviews`);
      return res.data;
    },
  });

  useEffect(() => {
    if (items && menuCategory) {
      setSortedMenu(organizeMenuByCategory(items, menuCategory));
    }
  }, [items, menuCategory]);

  return (
    <RestaurantContext.Provider
      value={{
        items: items ?? [],
        isLoading,
        isFetching,
        sortedMenu,
        menuCategory,
        apiUrl,
        restaurantID,
        stripePublishableKey,
        restaurant,
        reviews,
        modelData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
