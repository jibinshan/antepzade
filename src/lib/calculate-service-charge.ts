export const calculateServiceCharge = (
  totalAmount: number,
  servicePercentage: number,
) => {
  return parseFloat((totalAmount * (servicePercentage / 100)).toFixed(2));
};
