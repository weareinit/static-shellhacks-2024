import request from "supertest";
import { server } from "../../src";
import { dal } from "../../src/dal/dal";

describe("events.spec.ts", () => {
  const mockEvents = [
    {
      event_id: 1,
      event_name: "event1",
      description: "desc1",
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
    },
    {
      event_id: 2,
      event_name: "event2",
      description: "desc2",
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      start_time: new Date().toISOString(),
      end_time: new Date().toISOString(),
    },
  ];

  afterAll((done) => {
    server.close(done);
  });

  beforeAll(() => {
    dal.events.getAllEvents = jest.fn().mockReturnValue(mockEvents);
  });

  describe("GET /events", () => {
    describe("/events", () => {
      test("Results found - return 200", async () => {
        const response = await request(server).get("/api/v1/events");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockEvents);
        expect(dal.events.getAllEvents).toHaveBeenCalled();
      });
    });
    describe("/events", () => {
      test("No results found - return 204", async () => {
        dal.events.getAllEvents = jest.fn().mockResolvedValue([]);
        const response = await request(server).get("/api/v1/events");
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
        expect(dal.events.getAllEvents).toHaveBeenCalled();
      });
    });
  });

  describe("GET /events/:eventId", () => {
    beforeAll(() => {
      dal.events.getEvent = jest.fn().mockReturnValueOnce(mockEvents[0]);
    });

    describe("/events/1", () => {
      test("Valid Request - Results found - return 200", async () => {
        const response = await request(server).get("/api/v1/events/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockEvents[0]);
        expect(dal.events.getEvent).toHaveBeenCalled();
      });
    });

    describe("/events/10000", () => {
      test("Valid Request - No Result - return 204", async () => {
        dal.events.getEvent = jest.fn().mockReturnValueOnce(null);
        const response = await request(server).get("/api/v1/events/10000");
        expect(response.status).toBe(204);
        expect(dal.events.getEvent).toHaveBeenCalled();
      });
    });

    describe("/events/-1", () => {
      test("Invalid request - Below 1 - return 404", async () => {
        const response = await request(server).get("/api/v1/events/-1");
        expect(response.status).toBe(404);
        expect(dal.events.getEvent).toHaveBeenCalled();
      });
    });

    describe("/events/notInteger", () => {
      test("Invalid Request - Not an Integer - return 404", async () => {
        const response = await request(server).get("/api/v1/events/notInteger");
        expect(response.status).toBe(404);
        expect(dal.events.getEvent).toHaveBeenCalled();
      });
    });
  });
});
