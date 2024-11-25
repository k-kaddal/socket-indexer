import SocketGateContract from "./contract/socket-gate.contract";
import logger from "@shared/logger";
import handleSocketBridgeEvent from "./handlers/listen-event.handle";

async function startEventListener(): Promise<void> {
  try {
    logger.info("Event Listener is running...");

    const socketGateContract = SocketGateContract.getContract();
    socketGateContract.on("SocketBridge", handleSocketBridgeEvent);
  } catch (error: any) {
    logger.error(`Error starting Event Listener: ${error.message}`);
    process.exit(1);
  }
}

export default startEventListener;
