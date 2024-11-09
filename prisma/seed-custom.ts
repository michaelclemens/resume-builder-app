import { PrismaClient } from '@prisma/client'
import { resume, personal, educations, employments, skills, strengths } from './private'

const prisma = new PrismaClient()

const emptyDb = async () => {
  await prisma.resume.deleteMany()
}

export const customSeed = async () => {
  try {
    await emptyDb()

    const { id: resumeId } = await prisma.resume.create({ data: { ...resume } })

    await prisma.personal.create({
      data: {
        resumeId,
        ...personal,
      },
    })

    await prisma.education.createMany({
      data: educations.map(education => ({
        resumeId,
        ...education,
        startDate: new Date(education.startDate),
        endDate: new Date(education.endDate),
      })),
    })

    for (const employment of employments) {
      const { id } = await prisma.employment.create({
        data: {
          resumeId,
          employer: employment.employer,
          city: employment.city,
        },
      })

      await prisma.employmentHistory.createMany({
        data: employment.histories.map(history => ({
          employmentId: id,
          title: history.title,
          startDate: new Date(history.startDate),
          endDate: new Date(history.endDate),
          description: `<ul>${history.description.map(desc => `<li><p>${desc}</p></li>`).join('')}</ul>`,
        })),
      })
    }

    await prisma.skill.createMany({ data: skills.map(skill => ({ resumeId, name: skill })) })
    await prisma.strength.createMany({ data: strengths.map(strength => ({ resumeId, name: strength })) })

    console.log(`Database has been seeded. 🌱`)
  } catch (error) {
    throw error
  }
}
