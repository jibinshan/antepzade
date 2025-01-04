export const BetaMenuActive: boolean = process.env.NEXT_PUBLIC_BETA_MENU_ACTIVE
  ? process.env.NEXT_PUBLIC_BETA_MENU_ACTIVE === "true"
    ? true
    : false
  : true;
