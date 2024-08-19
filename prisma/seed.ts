import { createMockFullResume } from "../test/mocks";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const emptyDb = async () => {
    await prisma.resume.deleteMany();
}

const main = async () => {
  try {
    await emptyDb();
    
    const resumeFull = createMockFullResume();
    await prisma.resume.create({ data: {
        id: resumeFull.id,
        template: resumeFull.template,
        createdAt: resumeFull.createdAt,
        updatedAt: resumeFull.updatedAt,
    }});

    await prisma.personal.create({ data: resumeFull.personal });
    await prisma.education.createMany({ data: resumeFull.educations });
    for (const employment of resumeFull.employments) {
        await prisma.employment.create({ data: {
            id: employment.id,
            resumeId: employment.resumeId,
            employer: employment.employer,
            city: employment.city,
            order: employment.order,
            createdAt: employment.createdAt,
            updatedAt: employment.updatedAt
        }});
        await prisma.employmentHistory.createMany({ data: employment.history });
    }
    await prisma.skill.createMany({ data: resumeFull.skills });
    await prisma.strength.createMany({ data: resumeFull.strengths });

    console.log(`Database has been seeded. 🌱`);
  } catch(error) {
    throw error;
  }
}

main().catch((err) => {
  console.warn("Error While generating Seed: \n", err);
});