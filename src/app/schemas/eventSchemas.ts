import z from "zod";

export const EventsTrackerSchema = z.object({
  id: z.number().int().positive(),
  event_id: z.string(),
  timestamp: z.date(),
  user_id: z.string(),
});

export const EventsArraySchema = z.array(EventsTrackerSchema).nullable();

export type EventsArray = z.infer<typeof EventsTrackerSchema>;

export const CheckInPerEventSchema = z.object({
  event_id: z.string(),
  checkInCount: z.number().int().nonnegative(),
});

export const EventCheckInStatsSchema = z.object({
  totalCheckIns: z.number().int().nonnegative(),
  checkInsPerEvent: z.array(CheckInPerEventSchema),
});

export type CheckInPerEvent = z.infer<typeof CheckInPerEventSchema>;
