import { describe } from "node:test";
import request from "supertest";
import { server } from "../../src";
import { dal } from "../../src/dal/dal";
import { newHackerApplication } from "../../src/interfaces/newHackerApplication";

const mockApplicants = [
  {
    hacker_id: 1,
    event_id: 1,
    first_name: "Giancarlo",
    last_name: "Padron",
    email: "pipi@mail.com",
    discord: "vibes#0044",
    gender: "M",
    ethnicity: "Hispanic",
    phone_number: "9999999999",
    race: "white",
    dob: new Date().toISOString(),
    major: "comp sci",
    school: "fiu",
    resume_path: "giancarlopadron.pdf",
    github: "null",
    linkedin: "null",
    level_of_study: "Junior",
    interest_response: "Placeholder",
    application_status: "pending",
    email_message_status: true,
    developer_role: "Top G",
    check_in_status: false,
  },
];

const mockNewApplicants: newHackerApplication =
    {
      event_id: 1,
      first_name: 'Giancarlo',
      last_name: 'Padron',
      email: 'pipi@mail.com',
      discord: 'vibes#0044',
      gender: 'M',
      ethnicity: 'Hispanic',
      phone_number: '9999999999',
      race: 'white',
      dob: new Date(2023,1,1),
      major: 'comp sci',
      school: 'fiu',
      resume_path: 'giancarlopadron.pdf',
      github: null,
      linkedin: null,
      level_of_study: 'Junior',
      interest_response: 'Placeholder',
      email_message_status: true,
      developer_role: "Top G",
    };

//Get Applicants by Event ID (Tests)

describe("applicants.spec.ts", () => {
  beforeAll(() => {
    dal.applicants.getApplicantsByEventId = jest
      .fn()
      .mockReturnValue(mockApplicants);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("GET /applicants", () => {
    describe("/events/:eventId/applicants", () => {
      test("Valid request - return 200", async () => {
        const response = await request(server).get(
          "/api/v1/events/1/applicants"
        );
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockApplicants);
        expect(dal.applicants.getApplicantsByEventId).toHaveBeenCalled();
      });
    });

    describe("/events/:eventId/applicants", () => {
      test("Valid request - No results - return 204", async () => {
        dal.applicants.getApplicantsByEventId = jest.fn().mockReturnValue([]);
        const response = await request(server).get(
          "/api/v1/events/1/applicants"
        );
        expect(response.status).toBe(204);
        expect(response.body).toEqual({});
        expect(dal.applicants.getApplicantsByEventId).toHaveBeenCalled();
      });
    });

    describe("/events/:eventId/applicants", () => {
      test("Invalid request - Invalid eventId < 1 - return 404", async () => {
        const response = await request(server).get(
          "/api/v1/events/-1/applicants"
        );
        expect(response.status).toBe(404);
      });
    });

    describe("/events/:eventId/applicants", () => {
      test("Invalid request - Invalid eventId string - return 404", async () => {
        const response = await request(server).get(
          "/api/v1/events/notInteger/applicants"
        );
        expect(response.status).toBe(404);
      });
    });
  });
});

//Get Applicant by Application Status (Tests)

describe("GET /applicants?application_status=", () => {
  beforeAll(() => {
    dal.applicants.getApplicantsByEventIdAndFilteredByApplicationStatus = jest
      .fn()
      .mockReturnValue(mockApplicants);
  });

  describe("/events/:eventId/applicants?application_status=pending", () => {
    test("Valid request - return 200", async () => {
      const response = await request(server).get(
        "/api/v1/events/1/applicants?application_status=pending"
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockApplicants);
      expect(dal.applicants.getApplicantsByEventId).toHaveBeenCalled();
    });
  });

  describe("/events/:eventId/applicants?application_status=pending&application_status=confirmed", () => {
    test("Valid request - Multiple queries - return 200", async () => {
      const response = await request(server).get(
        "/api/v1/events/1/applicants?application_status=pending&application_status=confirmed"
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockApplicants);
      expect(dal.applicants.getApplicantsByEventId).toHaveBeenCalled();
    });
  });

  describe("/events/:eventId/applicants?application_status=pending&application_status=confirmed", () => {
    test("Valid request - Multiple queries - no result - return 204", async () => {
      dal.applicants.getApplicantsByEventIdAndFilteredByApplicationStatus = jest
        .fn()
        .mockReturnValue([]);

      const response = await request(server).get(
        "/api/v1/events/1/applicants?application_status=pending"
      );
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
      expect(dal.applicants.getApplicantsByEventId).toHaveBeenCalled();
    });
  });

  describe("/events/:eventId/applicants?application_status=pending", () => {
    test("Valid request - No results - return 204", async () => {
      dal.applicants.getApplicantsByEventIdAndFilteredByApplicationStatus = jest
        .fn()
        .mockReturnValue([]);
      const response = await request(server).get(
        "/api/v1/events/1/applicants?application_status=pending"
      );
      expect(response.status).toBe(204);
      expect(dal.applicants.getApplicantsByEventId).toHaveBeenCalled();
    });
  });

  describe("/events/:eventId/applicants?application_status=incorrectQuery", () => {
    test("Invalid request - Invalid query param - return 404", async () => {
      const response = await request(server).get(
        "/api/v1/events/1/applicants?application_status=incorrectQuery"
      );
      expect(response.status).toBe(404);
      expect(dal.applicants.getApplicantsByEventId).toHaveBeenCalled();
    });
  });

  describe("/events/:eventId/applicants?application_status=pending", () => {
    test("Invalid request - Invalid eventId - return 404", async () => {
      const response = await request(server).get(
        "/api/v1/events/notInteger/applicants?application_status=pending"
      );
      expect(response.status).toBe(404);
    });
  });

  describe("/events/:eventId/applicants?application_status=", () => {
    test("Invalid request - No query Param - return 404", async () => {
      const response = await request(server).get(
        "/api/v1/events/1/applicants?application_status="
      );
      expect(response.status).toBe(404);
    });
  });

  describe("/events/:eventId/applicants?invalid_query_param=badParam", () => {
    test("Invalid request - Not valid query param - return 404", async () => {
      const response = await request(server).get(
        "/api/v1/events/1/applicants?invalid_query_param=badParam"
      );
      expect(response.status).toBe(404);
    });
  });
});

//Create New Applicant (Tests)

describe("POST /applicants", () => {
  beforeAll(() => {
    dal.applicants.insertHackerApplication = jest
      .fn()
      .mockReturnValue(mockApplicants);
  });

  describe('POST /events/:eventId/applicants', () => {
    test('should create a new applicant for the event', async () => {
      const response = await request(server).post(
        "/api/v1/events/1/applicants"
      );
      expect(response.status).toBe(200);
      expect(dal.applicants.insertHackerApplication).toHaveBeenCalled();
    });
  });

  //Introduce more test cases
  
});