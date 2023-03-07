import { Events } from "@prisma/client";
import { prisma } from "../index";

export async function getEvent(eventId: number): Promise<Events> {
  const event: Events = await prisma.events.findUnique({
    where: {
      event_id: eventId,
    },
  });
  return event;
}

export async function getAllEvents(): Promise<Events[]> {
  const events: Events[] = await prisma.events.findMany();
  return events;
}


