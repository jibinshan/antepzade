import { useRestaurant } from "@/context/RestaurantContext";
import type { MenuItem } from "@/types/menu-item.type";

export const GetModifiersFromItemId = (item: MenuItem) => {
  const { items } = useRestaurant();
  const modifierIds = item.modifiers[0]?.items ?? [];

  const modifiers = [];

  for (const modifierId of modifierIds) {
    const modifier = items.find((item) => item._id === modifierId);
    if (modifier) {
      modifiers.push(modifier);
    }
  }

  return modifiers;
};
