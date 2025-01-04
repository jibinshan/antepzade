import type { MenuCategory } from "@/types/menu-category.type";
import type { MenuItem } from "@/types/menu-item.type";

export type OrganizedMenu = {
  _id: string;
  categoryName: string;
  items: MenuItem[];
}[];

export function organizeMenuByCategory(
  menuItems: MenuItem[],
  categories: MenuCategory[],
): OrganizedMenu {
  const categoryMap = new Map<string, { _id: string; name: string }>();

  categories.forEach((category) => {
    categoryMap.set(category._id, { _id: category._id, name: category.name });
  });

  const organizedMenu: OrganizedMenu = categories.map((category) => ({
    _id: category._id,
    categoryName: category.name,
    items: [],
  }));

  menuItems.forEach((item) => {
    const category = categoryMap.get(item._idCategory!);
    if (category) {
      const organizedCategory = organizedMenu.find(
        (cat) => cat._id === category._id,
      );
      if (organizedCategory) {
        organizedCategory.items.push(item);
      }
    }
  });

  return organizedMenu.filter((category) => category.items.length > 0);
}
