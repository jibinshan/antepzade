export interface Restaurant {
    name: string;
    slug: string;
    restaurantTemplate: string;
    images: string[];
    logo: string;
    printLogo: string;
    description: string;
    _idCategory: string;
    contactNumber: string;
    headerBg: string;
    menuItemNameFont: string | null;
    menuItemFontColor: string;
    menuItemFontBg: string;
    arModelBg: string;
    swiggyIcon: string;
    zomatoIcon: string;
    primaryColor: string | null;
    secondaryColor: string | null;
    modalBgColor: string | null;
    modalFontColor: string;
    fontPrimaryColor: string | null;
    fontSecondaryColor: string | null;
    userFormDataBg: string;
    userFormDataLabelColor: string;
    userFormDataFontColor: string;
    buttonBg: string;
    buttonTextBg: string;
    enabled: boolean;
    address: {
        _id: string;
        city: string;
        coords: number[];
        countryCode: string;
        firstLine: string;
        postCode: string;
        secondLine: string;
    };
    openHours: {
        _id: string;
        sunday: DaySchedule;
        monday: DaySchedule;
        tuesday: DaySchedule;
        wednesday: DaySchedule;
        thursday: DaySchedule;
        friday: DaySchedule;
        saturday: DaySchedule;
    };
    options: {
        _id: string;
        hasDineIn: boolean;
        hasTakeAway: boolean;
    };
    deliveryETA: number;
    diningETA: number | null;
    noOfTables: number | null;
    currency: string;
    currencyIcon: string | null;
    country: string;
    taxPercentage: number | null;
    tableType: string;
    appType: string;
    tableOrder: boolean;
    tipEnable: boolean;
    serviceCharge: number;
    vat: number;
    onlineOrder: boolean;
    tablePayment: boolean;
    googleReviewsLink: string | null;
    instagramLink: string | null;
    bottomMenuIcon: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    socialMedias: Array<{
        _id: string;
        name: string;
        action: string;
        icon: string;
        data: {
            url: string;
            iconHeight?: string;
            iconWidth?: string;
        };
    }>;
    themeColors: {
        headerBg: string;
        categoryUnderlineColor: string;
        itemPriceFontColor: string;
        itemPriceBgColor: string;
        arViewBgColor: string;
        nextIcon: string | null;
        prevIcon: string | null;
        menuSectionBg: string | null;
        menuListingBgColor: string | null;
        menuListingFontColor: string | null;
        menuListingCategoryFontColor: string | null;
        menuListingCategoryBgColor: string | null;
        menuListingSelectedCategoryFontColor: string | null;
        menuListingSelectedCategoryBgColor: string | null;
        menuPopupItemFontColor: string | null;
        menuPopupItemPriceFontSize: string | null;
        menuPopupItemBgColor: string | null;
        menuPopupModifierBgColor: string | null;
        menuPopupModifierFontColor: string | null;
        menuPopupModifierPriceFontSize: string | null;
        menuPopupAddToCartBtnBgColor: string | null;
        menuPopupAddToCartBtnFontColor: string | null;
        checkoutBgColor: string | null;
        checkoutPaymentBtnBgColor: string | null;
        checkoutPaymentBtnFontColor: string | null;
        checkoutCardsBgColor: string | null;
        checkoutFontColor: string | null;
        checkoutBillingPriceFontSize: string | null;
        checkoutBillingTotalPriceFontSize: string | null;
        cartBgColor: string | null;
        cartCardHeaderFontSize: string | null;
        cartCardItemNameFontSize: string | null;
        cartCardItemPriceFontSize: string | null;
    };
    takeAwayWindow: Window[];
    deliveryWindow: Window[];
    isDeliveryEnabled: boolean;
    isTakeAwayEnabled: boolean;
    minimumCollectionOrderAmount: number;
    minimumDeliveryOrderAmount: number;
    busyMode: boolean;
    busyModeTime: number;
    paymentInfo: PaymentInfo;
}

interface PaymentInfo {
    destinationAccountId: string;
    applicationFeePercent: string;
}

interface DaySchedule {
    _id: string;
    isOpen: boolean;
    timings: Array<{
        from: string;
        to: string;
    }>;
}

interface Window {
    startTime: string;
    endTime: string;
    _id: string;
}
