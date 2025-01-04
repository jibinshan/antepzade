interface Timing {
  from: string;
  to: string;
}

export interface DayHours {
  isOpen: boolean;
  timings: Timing[];
  _id: string;
}

export interface OpenHours {
  sunday: DayHours;
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  _id: string;
}

interface Address {
  _id: string;
  firstLine: string;
  secondLine: string;
  city: string;
  countryCode: string;
  postCode: string;
  coords: [number, number];
}

interface Options {
  hasDineIn: boolean;
  hasTakeAway: boolean;
  _id: string;
}

interface PaymentInfo {
  destinationAccountId: string;
  applicationFeePercent: string;
}

interface ThemeColors {
  headerBg: string | null;
  categoryUnderlineColor: string;
  itemPriceFontColor: string;
  itemPriceBgColor: string;
  arViewBgColor: string;
  nextIcon: string | null;
  prevIcon: string | null;
  menuSectionBg: string | null;
}

export interface Restaurant {
  name: string;
  slug: string;
  masterIpAddress: string | null;
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
  arModelBg: string | null;
  swiggyIcon: string | null;
  zomatoIcon: string | null;
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
  address: Address;
  openHours: OpenHours;
  options: Options;
  deliveryETA: string;
  diningETA: string;
  noOfTables: number | null;
  currecny: string; // (Backend Dev being an idiot)
  currecnyIcon: string; // (Backend Dev being an idiot)
  country: string;
  taxPercentage: number | null;
  tableType: string;
  appType: string;
  tableOrder: boolean;
  tipEnable: boolean;
  serviceCharge: number;
  vat: number;
  isAutoVatEnabled: boolean;
  isAutoServiceChargeEnabled: boolean;
  onlineOrder: boolean;
  tablePayment: boolean;
  paymentInfo: PaymentInfo;
  googleReviewsLink: string | null;
  instagramLink: string | null;
  bottomMenuIcon: string | null;
  _id: string;
  socialMedias: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  themeColors: ThemeColors;
}
