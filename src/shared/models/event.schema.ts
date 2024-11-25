import {z} from "zod";
import {RawEventSchema} from "./raw-event.schema";

export const EventSchema = RawEventSchema.extend({
  id: z.string(),
  tokenName: z.string().optional(),
  tokenSymbol: z.string().optional(),
  decimals: z.number().optional(),
  readableAmount: z.string().optional(),
});

export type TEvent = z.infer<typeof EventSchema>;
