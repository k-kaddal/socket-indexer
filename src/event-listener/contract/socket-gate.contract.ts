import {ethers} from "ethers";
import Config from "@shared/config";

class SocketGateContract {
  private provider: ethers.WebSocketProvider;
  private contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.WebSocketProvider(Config.WS_RPC_URL);

    const socketGateAbi = [
      "event SocketBridge(uint256 amount, address token, uint256 toChainId, bytes32 bridgeName, address sender, address receiver, bytes32 metadata)",
    ];

    this.contract = new ethers.Contract(
      Config.SOCKET_GATE_ADDRESS,
      socketGateAbi,
      this.provider
    );
  }

  public getContract(): ethers.Contract {
    return this.contract;
  }
}

export default new SocketGateContract();
