import { Decimal } from "decimal.js";
import { price2Tick } from "@cremafinance/crema-sdk";

const minPrice = new Decimal(29);
const maxPrice = new Decimal(40000);
const eth = 20;
const usdc = 42613.9;
const plotRangeLower = 256;
const plotRangeUpper = 28500;

const tickLower = price2Tick(minPrice);
// const tickUpper = price2Tick(maxPrice);

console.log(tickLower);
