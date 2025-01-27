import type { MenuCategory, MenuItem } from "@/types/menu";

export interface OrganizedMenu {
    _id: string;
    name: string;
    items: MenuItem[];
}

export const organizeMenu = (items: MenuItem[], categories: MenuCategory[]): OrganizedMenu[] => {
    const organizedMenu: OrganizedMenu[] = [];

    categories.forEach((category) => {
        const organizedCategory: OrganizedMenu = {
            _id: category._id,
            name: category.name,
            items: [],
        };

        items.forEach((item) => {
            if (item._idCategory === category._id) {
                organizedCategory.items.push(item);
            }
        });

        organizedMenu.push(organizedCategory);
    });

    return organizedMenu;
};
