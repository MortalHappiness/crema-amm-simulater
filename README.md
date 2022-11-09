# crema-amm-simulater

## Description
This project is [the winner](https://twitter.com/EpochsStudio/status/1523702711853907968?s=20&t=pKZUhDmPfXE67_TFyuYwiA) of Hackathon 3.0 in Taiwan. It is built within 30 hours so it's not recommended to use in production. User who intends to use this project should take their own risks. 

This project aims to leverage crema-sdk to simulate static AMM algorithms. We've tried to visualize UniswapV2, Balancer, and Curve Finance AMM curves and their liquidity distribution curve.

Demo can be found [here](https://crema-amm-simulater.vercel.app)

## QuickStart

```bash
yarn
yarn dev
```

Go to [http://localhost:3000](http://localhost:3000) in your browser to see the webpage.

## Liquidity distribution curve derivation steps
1. Calculate the parameter `s` in the curve equation first. Take Balancer curve for example,
2. Call the "calculateLiquity" function in crema-sdk, then we get the `desiredAmountSrc` and `desiredAmountDst` pair, which forms a point on the curve.
3. Plug the point value into the AMM equation to get the s parameter.
4. After we have all the required parameters in L(ti) equation: `s`, `wx`, `wy`, we can get the curve of Liquidity.