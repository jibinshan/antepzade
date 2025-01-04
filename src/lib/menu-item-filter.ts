import type { OrganizedMenu } from "@/lib/organize-menu-by-category";

export const getFilteredMenuItems = ({
  data,
  query,
}: {
  data: OrganizedMenu;
  query: string;
}) => {
  let filteredMenuItems = data;

  if (query) {
    console.log(query);
    filteredMenuItems = data.map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      ),
    }));
  }

  // // Filter out MODIFIERS from the menu
  // filteredMenuItems = data.filter(
  //   (item) => item.categoryName.toLowerCase() !== "modifier",
  // );

  // // Filter out MISC from the menu
  // filteredMenuItems = filteredMenuItems.filter(
  //   (item) => item.categoryName.toLowerCase() !== "misc",
  // );

  filteredMenuItems = filteredMenuItems.filter(
    (category) => category.items.length > 0,
  );

  return filteredMenuItems;
};
