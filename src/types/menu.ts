/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MenuItem {
    description: string;
    allergies: string;
    nutritions: string;
    calories: number;
    dishnote: string;
    images: string[];
    modelOrder: number;
    tags: string[];
    _idModifiers: string[];
    _idCategory: string;
    modelId: string | null;
    isVeg: boolean;
    price: {
        value: number;
        currency: string;
        _id: string;
    };
    takeawayPrice: {
        value: number;
        currency: string;
        _id: string;
    };
    enabled: boolean;
    _id: string;
    name: string;
    _idRestaurant: string;
    extras: {
        menuType: string;
        menuItemOrderType: string;
        availability: {
            days: string[];
        };
        hideMenuThumbNailImages: boolean;
    };
    modifiers: Modifier[];
    options: any[]; // TODO: Define options type if needed
    order: number;
    combo: any[]; // TODO: Define combo type if needed
    createdAt: string;
    updatedAt: string;
    __v: number;
    printName: string;
}

export interface MenuCategory {
    images: string[];
    type: string;
    enabled: boolean;
    _id: string;
    name: string;
    description: string;
    _idRestaurant: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Modifier {
    price: {
        value: number;
        currency: string;
        _id: string;
    };
    header: string;
    required: boolean;
    items: string[];
    multiSelection: boolean;
    extraAllowed: boolean;
    addUpPrices: boolean;
    defaultSelection: string | null;
    _id: string;
    modifierOrder: number;
    modifierItemOrder: number;
}
