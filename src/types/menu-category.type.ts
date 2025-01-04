export interface MenuCategory {
  images: string[]; // An array of image URLs
  type: string; // Type of the row (e.g., "category")
  enabled: boolean; // Boolean indicating if the row is enabled
  _id: string; // Unique identifier for the row
  name: string; // Name of the row (e.g., "COFFEE", "TEA")
  description: string; // Description of the row (e.g., "Drinks")
  _idRestaurant: string; // Identifier for the associated restaurant
  order: number; // A numerical value representing the order
  createdAt: string; // Timestamp when the row was created
  updatedAt: string; // Timestamp when the row was last updated
  __v: number; // Versioning key
}
