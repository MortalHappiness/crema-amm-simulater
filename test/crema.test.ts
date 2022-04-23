import { Decimal } from "decimal.js";
import { price2Tick, calculateLiquity, calculateTokenAmount } from "@cremafinance/crema-sdk";

const minPriceNumber = 1183
const maxPriceNumber = 7395
const minPrice = new Decimal(minPriceNumber);
const maxPrice = new Decimal(maxPriceNumber);
const amountETH = 20;
const amountUSDC = 42613.9;
const plotRangeLower = 256;
const plotRangeUpper = 28500;


console.log(minPrice);

const tickLower = price2Tick(minPrice);
const tickUpper = price2Tick(maxPrice);
let currentTokenAPrice = 2958;
let currentTokenBPrice = 50000/50061.2;
let currentSqrtPrice = new Decimal(currentTokenAPrice).sqrt();
const desiredAmountSrc = new Decimal(16.9243);
const direct = 0;

const {desiredAmountDst, deltaLiquity} = calculateLiquity(tickLower, tickUpper, desiredAmountSrc, currentSqrtPrice, direct);

console.log(desiredAmountDst)

const range = (start: number, end: number) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

const priceTokenA = [];
const assetValue = [];

for (let price of range(minPriceNumber, maxPriceNumber)) {
    currentTokenAPrice = price
    // console.log("Current TokenA Price: ", currentTokenAPrice)
    currentSqrtPrice = new Decimal(currentTokenAPrice).sqrt();

    const {amountA, amountB} = calculateTokenAmount(tickLower, tickUpper, deltaLiquity, currentSqrtPrice);

    // console.log("Amount:")
    // console.log(amountA)
    // console.log(amountB)

    const assetValueA = amountA.mul(currentTokenAPrice);
    const assetValueB = amountB.mul(currentTokenBPrice);

    const currentAssetValue = assetValueA.add(assetValueB);

    priceTokenA.push(currentTokenAPrice);
    assetValue.push(currentAssetValue.toNumber())
    // console.log("Asset Value:")

    // console.log(assetValue);
}

const fs = require('fs')

try {
  fs.writeFileSync('./test1.txt', JSON.stringify(priceTokenA))
  fs.writeFileSync('./test2.txt', JSON.stringify(assetValue))
  //file written successfully
} catch (err) {
  console.error(err)
}
