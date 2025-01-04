export interface RefreshPayment {
  _idRestaurant: string;
  _idRestaurantTable: (string | null)[];
  _idRestaurantUser: string | null;
  restaurantUserName: string;
  _idRestaurantDevice: string | null;
  restaurantDeviceName: string;
  orderType: number;
  deliveryTime: string | null;
  totalAmount: number;
  courseAway: string | null;
  orderStatus: string;
  totalDiscount: number;
  transactionId: string;
  transactionStatus: string;
  transactionMessage: string | null;
  tip: number;
  serviceCharge: number;
  vat: number;
  _id: string;
  deviceName: string;
  description: string;
  userDetails: {
    name: string;
    email: string;
    phone: {
      number: string;
    };
    address: {
      shipping: {
        address: string;
        pincode: string;
        city: string;
      };
      billing: {
        address: string;
        pincode: string;
        city: string;
      };
    };
  };
  cart: {
    menuItemName: string;
    _idRestaurantCourse: string | null;
    restaurantCourseName: string;
    price: {
      value: number;
      currency: string;
      _id: string;
    };
    quantity: number;
    notes: string;
    options: string;
    _id: string;
    _idMenuItem: string;
  }[];
  discountType: number;
  totalpayment: number;
  paymentType: number;
  onlinePayemtInfo: {
    status: string;
    transactionId: string;
    updatedAt: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
