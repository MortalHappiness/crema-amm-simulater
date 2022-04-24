# crema-amm-simulater

## Description
This project aims to leverage crema-sdk to simulate static AMM algorithms. We've tried to solve UniswapV2, Balancer, Curve Finance AMM to get close form solutions.

## Steps
1. Calculate the parameter `s` in the curve first. 
Take Balancer curve for example,
2. Call the "calculateLiquity" function in crema-sdk, then we get the `desiredAmountSrc` and `desiredAmountDst` pair, which forms a point on the curve.
3. Plug the point into the AMM equation to get the s parameter.
4. Since we have all the required parameters in L(ti) equation: `s`, `wx`, `wy`, we can get the curve of L.