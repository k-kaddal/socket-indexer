import Config from "@shared/config";
import {ethers} from "ethers";
import logger from "@shared/logger";

export const fetchTokenMetadata = async (
  tokenAddress: string
): Promise<{name: string; symbol: string; decimals: number} | null> => {
  if (
    tokenAddress.toLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  ) {
    return {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    };
  }

  const provider = new ethers.JsonRpcProvider(Config.HTTP_RPC_URL);
  const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)",
  ];
  try {
    const contract = new ethers.Contract(tokenAddress, abi, provider);

    const [name, symbol, decimals] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
    ]);

    return {
      name,
      symbol,
      decimals: Number(decimals),
    };
  } catch (error) {
    // not allways available
    logger.debug(`bypass fetching token metadata for address ${tokenAddress}`);
    return null;
  }
};
