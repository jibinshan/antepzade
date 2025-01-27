"use client";
import { organizeMenu, type OrganizedMenu } from "@/lib/organize-menu";
import type { MenuCategory, MenuItem } from "@/types/menu";
import type { ModelData } from "@/types/model-data.type";
import type { Restaurant } from "@/types/restaurant";
import type { Review } from "@/types/review.type";
import { useQuery } from "@tanstack/react-query";
import axios, { type AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

type MenuContextType = {
  organizedMenu: OrganizedMenu[];
  isLoading: boolean;
  isFetching: boolean;
  apiUrl: string;
  items: MenuItem[];
  restaurantID: string;
  restaurant: Restaurant | undefined;
  stripePublishableKey: string;
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

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("Missing API URL in environment variables");
  }

  if (!process.env.NEXT_PUBLIC_RESTAURANT_ID) {
    throw new Error("Missing restaurant ID in environment variables");
  }

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Missing Stripe Publishable Key in environment variables");
  }

  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const restaurantID = process.env.NEXT_PUBLIC_RESTAURANT_ID;

  const [organizedMenu, setOrganizedMenu] = useState<OrganizedMenu[]>([]);

  const {
    data: restaurant,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["restaurant", restaurantID],
    queryFn: async () => {
      const res: AxiosResponse<{
        data: Restaurant;
      }> = await axios.get(`${apiUrl}/restaurant/${restaurantID}`);
      return res.data.data;
    },
  });

  const { data: rawMenuCategory } = useQuery({
    queryKey: ["restaurant", restaurantID, "category"],
    queryFn: async () => {
      const res: AxiosResponse<{
        data: {
          rows: MenuCategory[];
        };
      }> = await axios.get(`${apiUrl}/restaurant/${restaurantID}/category?pageSize=30000&pageNum=1&filter_enabled=true`);
      const data = res.data.data.rows;
      const sortedData = data
        .filter((item) => item.name.toLowerCase() !== "modifier" && item.name.toLowerCase() !== "modifiers" && item.name.toLowerCase() !== "extras")
        .filter((item) => item.order)
        .sort((a, b) => a.order - b.order);
      return sortedData;
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


  const { data: items } = useQuery({
    queryKey: ["menu", restaurantID],
    queryFn: async () => {
      const res: AxiosResponse<{
        data: {
          rows: MenuItem[];
        };
      }> = await axios.get(`${apiUrl}/menu?pageSize=30000&pageNum=1&orderBy=order&orderByDir=asc&filter__idRestaurant=${restaurantID}&filter_enabled=true`);

      const data = res.data.data.rows;
      return data;
    },
  });

  useEffect(() => {
    if (items && rawMenuCategory) {
      const organized = organizeMenu(items, rawMenuCategory);
      setOrganizedMenu(organized);
    }
  }, [items, rawMenuCategory]);

  return (
    <RestaurantContext.Provider
      value={{
        items: items ?? [],
        organizedMenu,
        isLoading,
        isFetching,
        apiUrl,
        restaurantID,
        restaurant,
        stripePublishableKey,
        reviews,
        modelData,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
