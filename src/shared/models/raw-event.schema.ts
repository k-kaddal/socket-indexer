import {z} from "zod";

export const RawEventSchema = z.object({
  amount: z.string(),
  token: z.string(),
  toChainId: z.number(),
  bridgeName: z.string(),
  sender: z.string(),
  receiver: z.string(),
  metadata: z.string(),
  // block fields
  blockNumber: z.number(),
  transactionHash: z.string(),
  logIndex: z.number(),
});

export type TRawEvent = z.infer<typeof RawEventSchema>;
