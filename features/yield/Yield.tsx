import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";

import Connection from "../../containers/Connection";
import Token from "../../containers/Token";
import Balancer from "../../containers/Balancer";

const Important = styled(Typography)`
  color: red;
  background: black;
  display: inline-block;
`;

import { YIELD_TOKENS } from "../../constants/yieldTokens";

const OutlinedContainer = styled.div`
  padding: 1rem;
  border: 1px solid #434343;
`;

const Link = styled.a`
  font-size: 14px;
`;

const Yield = () => {
  const { network } = Connection.useContainer();
  const { address: tokenAddress } = Token.useContainer();
  const { symbol: tokenSymbol } = Token.useContainer();
  const { poolAddress } = Balancer.useContainer();

  const isYieldToken =
    tokenAddress &&
    Object.keys(YIELD_TOKENS).includes(tokenAddress.toLowerCase());

  const balancerPoolUrl = `https://pools.balancer.exchange/#/pool/${poolAddress}`;

  if (network === null || network.chainId !== 1 || !isYieldToken) {
    return (
      <Box py={2}>
        <Typography>
          <i>
            Please first connect and set your network to Mainnet, and then
            select a yield token (i.e. yUSD-OCT20).
          </i>
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box>
        <Box pb={4}>
          <Typography>
            <a
              href="https://twitter.com/danrobinson/status/1169689525536215040"
              target="_blank"
              rel="noopener noreferrer"
            >
              yTokens
            </a>
            , like {tokenSymbol}, are expiring tokens with a fixed-rate return
            and are redeemable for exactly 1 USD worth of collateral at expiry.
            To learn more about {tokenSymbol} see the UMA Medium post{" "}
            <a
              href="https://medium.com/uma-project/the-yield-dollar-on-uma-3a492e79069f"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            , and to learn about rolling between expiries see the article{" "}
            <a
              href="https://medium.com/uma-project/umas-liquidity-mining-pilot-retro-and-rollover-e1ba8614339"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </Typography>
        </Box>
        <Box pb={2}>
          <OutlinedContainer>
            <Important>Update 09/27/20</Important>
            <br></br>
            <br></br>
            <Typography>
              We fetch Balancer pool data from the Balancer subgraph API, which
              is currently returning inaccurate information. Instead of
              displaying inaccurate data, we redirect you to the Balancer pool
              interface where you can access accurate on-chain information. This
              fix has no ETA yet, but we will revert back to the old display as
              soon as the data is accurate. Apologies for the inconvenience!
            </Typography>
            <br></br>
            <Typography>
              After 09/27/20 @ 23:00:00 UTC, only the uUSDwBTC and uUSDwETH
              contracts will be eligible for liquidity mining. 10,000 UMA and
              25,000 UMA, respectively, are granted pro-rata (based on
              continuous snapshots) to LP's in the uUSDwBTC-USDC and uUSDwETH
              Balancer pools.
            </Typography>
            <br></br>
            <br></br>
            <Link
              href={balancerPoolUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Balancer Pool Link
            </Link>
          </OutlinedContainer>
        </Box>
      </Box>
    );
  }
};

export default Yield;
