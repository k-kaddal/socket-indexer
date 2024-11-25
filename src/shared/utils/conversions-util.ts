import {ethers} from "ethers";

export function amountToReadable(amount: string, decimals: number): number {
  return parseInt(amount) / Math.pow(10, decimals);
}

export function bridgeToReadable(bridgeNameHash: string): string {
  return routeIdentifiers[bridgeNameHash] || "Unknown";
}

const routeIdentifiers = {
  [ethers.keccak256(ethers.toUtf8Bytes("Across"))]: "Across",
  [ethers.keccak256(ethers.toUtf8Bytes("Anyswap"))]: "Anyswap",
  [ethers.keccak256(ethers.toUtf8Bytes("CBridge"))]: "CBridge",
  [ethers.keccak256(ethers.toUtf8Bytes("Hop"))]: "Hop",
  [ethers.keccak256(ethers.toUtf8Bytes("Hyphen"))]: "Hyphen",
  [ethers.keccak256(ethers.toUtf8Bytes("NativeOptimism"))]: "NativeOptimism",
  [ethers.keccak256(ethers.toUtf8Bytes("NativeArbitrum"))]: "NativeArbitrum",
  [ethers.keccak256(ethers.toUtf8Bytes("NativePolygon"))]: "NativePolygon",
  [ethers.keccak256(ethers.toUtf8Bytes("Refuel"))]: "Refuel",
  [ethers.keccak256(ethers.toUtf8Bytes("Stargate"))]: "Stargate",
  [ethers.keccak256(ethers.toUtf8Bytes("OneInch"))]: "OneInch",
  [ethers.keccak256(ethers.toUtf8Bytes("Zerox"))]: "Zerox",
  [ethers.keccak256(ethers.toUtf8Bytes("Rainbow"))]: "Rainbow",
};
