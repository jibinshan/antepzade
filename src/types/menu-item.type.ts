import type { Price } from "@/types/price.type";

export interface MenuItem {
  createdAt: string;
  updatedAt: string;
  __v: number;
  printName: string;
  description?: string;
  allergies?: string;
  calories?: number;
  dishnote?: string;
  images: string[];
  modelOrder: number;
  _idCategory?: string;
  isVeg: boolean;
  price: Price;
  takeawayPrice: Price;
  enabled: boolean;
  _id: string;
  name: string;
  _idRestaurant: string; // This assumes that the restaurant ID is a string, but in your data it seems to be an object. Adjust as needed.
  extras?: Extras; // If you don't need this, remove it. It seems not used in your example.
  modifiers: Modifier[];
  options?: string[]; // If you don't need this, remove it. It seems not used in your example.
  order: number;
  _idModifier?: string; // Same as above, but for the '_idModifier' property.
}

interface Extras {
  menuType: string; // This assumes that the extra type is always 'menuType'. If it isn't, adjust accordingly.
  menuItemOrderType: string;
  availability: availability;
}
interface availability {
  days: string[];
}
export interface Modifier {
  price: Price; // Assuming all modifiers have a price object with value and currency properties. Adjust as needed if this assumption is incorrect.
  header: string;
  required?: boolean | null; // This property seems to be always present in your data, but its type isn't explicitly defined. Add the '| null' part if it can also be undefined or null.
  items: ModifierItem[]; // Assuming that modifier items can either be strings or other modifiers with an _id field. Adjust as needed if this assumption is incorrect.
  multiSelection?: boolean; // This property seems to be optional in your data, so I added '?'. Remove the question mark if it's always present.
  extraAllowed?: boolean | null; // Same as above for 'extraAllowed'.
  addUpPrices?: boolean; // Same as above for 'addUpPrices'.
  _id?: string; // This assumes that modifiers may have an ID, but it's not always present in your data. Remove it if this isn't the case.
  modifierOrder: number;
  modifierItemOrder: number;
  defaultSelection: string
}

interface ModifierItem {
  _id?: string; // This assumes that modifier items may have an ID, but it's not always present in your data. Remove it if this isn't the case.
}
