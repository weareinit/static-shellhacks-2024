import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function main() {
    const data = [];

    for (let i = 0; i < 500; i++) {
        data.push({
          userId: String(randomUUID()),
          event_id: i,
          first_name: "John",
          last_name: "Doe",
          age: 1 + ~~(Math.random() * 40),
          school: "Example School",
          major: "Computer Science",
          grad_year: 2024,
          level_of_study: "Undergraduate",
          country: "USA",
          email: String(randomUUID()),
          phone_number: "1234567890",
          resume_path: "/path/to/resume",
          discord: "example_discord",
          discord_id: "123456789",
          discord_verification_code: "12345",
          github: "example_github",
          linkedin: "example_linkedin",
          is_international: false,
          gender: "Male",
          pronouns: "He/Him",
          ethnicity: "Caucasian",
          agreed_mlh_news: true,
          application_status: "waitlisted",
          check_in_status: false,
          created_at: new Date(),
        });
    }

  await prisma.hacker_Applications.createMany({ data })

  console.log("Seed successful");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });