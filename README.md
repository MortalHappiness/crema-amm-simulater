# crema-amm-simulater

## Description
This project aims to leverage crema-sdk to simulate static AMM algorithms. We've tried to visualize UniswapV2, Balancer, and Curve Finance AMM curves and their liquidity distribution curve.

## Liquidity distribution curve derivation steps
1. Calculate the parameter `s` in the curve equation first. Take Balancer curve for example,
2. Call the "calculateLiquity" function in crema-sdk, then we get the `desiredAmountSrc` and `desiredAmountDst` pair, which forms a point on the curve.
3. Plug the point value into the AMM equation to get the s parameter.
4. After we have all the required parameters in L(ti) equation: `s`, `wx`, `wy`, we can get the curve of Liquidity.