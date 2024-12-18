import {RawEventSchema, TRawEvent} from "@shared/models/raw-event.schema";
import MessageService from "@shared/message/message.service";
import {EQueues} from "@shared/message";
import logger from "@shared/logger";

async function handleSocketBridgeEvent(
  amount: bigint,
  token: string,
  toChainId: bigint,
  bridgeName: string,
  sender: string,
  receiver: string,
  metadata: string,
  event: any
): Promise<void> {
  try {
    const rawEvent: TRawEvent = RawEventSchema.parse({
      amount: amount.toString(),
      token,
      toChainId: Number(toChainId),
      bridgeName,
      sender,
      receiver,
      metadata,
      blockNumber: event.log.blockNumber,
      transactionHash: event.log.transactionHash,
      logIndex: event.log.index,
    });

    await MessageService.publish(EQueues.RAW_EVENTS, rawEvent);

    logger.debug(
      `[event-listener]: Block Number - ${rawEvent.blockNumber}, Transaction Hash - ${rawEvent.transactionHash}, index - ${rawEvent.logIndex}`
    );
  } catch (error: any) {
    logger.error(`Error handling SocketBridge event: ${error.message}`);
  }
}

export default handleSocketBridgeEvent;
