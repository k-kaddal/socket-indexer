import {TRawEvent, TEvent, RawEventSchema} from "@shared/models";
import logger from "@shared/logger";
import {fetchTokenMetadata} from "./fetch-token-metadata.service";

async function enrichEvent(rawEvent: TRawEvent): Promise<TEvent> {
  try {
    const validatedRawEvent = RawEventSchema.parse(rawEvent);

    // Get Enrich event with token metadata
    const tokenMetadata = await fetchTokenMetadata(rawEvent.token);

    const enrichedEvent: TEvent = {
      ...validatedRawEvent,
      id: `${validatedRawEvent.transactionHash}-${validatedRawEvent.logIndex}`,
      tokenName: tokenMetadata?.name,
      tokenSymbol: tokenMetadata?.symbol,
      decimals: tokenMetadata?.decimals,
    };

    return enrichedEvent;
  } catch (error: any) {
    logger.error(`Error enriching event: ${error.message}`);
    throw error;
  }
}

export default enrichEvent;