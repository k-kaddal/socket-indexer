import {TRawEvent, TEvent, RawEventSchema} from "@shared/models";
import logger from "@shared/logger";
import {fetchTokenMetadata} from "./fetch-token-metadata.service";
import {
  amountToReadable,
  bridgeToReadable,
} from "@shared/utils/conversions-util";

async function enrichEvent(rawEvent: TRawEvent): Promise<TEvent> {
  try {
    const validatedRawEvent = RawEventSchema.parse(rawEvent);

    // Get Enrich event with token metadata
    const tokenMetadata = await fetchTokenMetadata(rawEvent.token);

    // convert amount to readable format
    const readableAmount = tokenMetadata?.decimals
      ? amountToReadable(validatedRawEvent.amount, tokenMetadata.decimals)
      : validatedRawEvent.amount;

    // convert bridge name to readable format using route identifier
    const readableBridgeName = bridgeToReadable(rawEvent.bridgeName);

    const enrichedEvent: TEvent = {
      ...validatedRawEvent,
      id: `${validatedRawEvent.transactionHash}-${validatedRawEvent.logIndex}`,
      readableAmount: readableAmount.toString(),
      tokenName: tokenMetadata?.name,
      tokenSymbol: tokenMetadata?.symbol,
      decimals: tokenMetadata?.decimals,
      bridgeName: readableBridgeName,
    };

    return enrichedEvent;
  } catch (error: any) {
    logger.error(`Error enriching event: ${error.message}`);
    throw error;
  }
}

export default enrichEvent;
