import { getCremaCLMMPoints } from "../core/crema";

const currentPrice = 2958;
const minPrice = 1183;
const maxPrice = 7395;
const desiredAmountSrc = 16.9243;
console.log(
  getCremaCLMMPoints(currentPrice, minPrice, maxPrice, desiredAmountSrc)
);
