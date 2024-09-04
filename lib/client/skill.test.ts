import { createMockSkill, createMultipleMockItems } from '@/test/mocks'
import { prismaMock } from '@/test/prisma'
import { faker } from '@faker-js/faker'
import { response, ResponseStatus } from '../response'
import { addSkill, deleteSkill, getSkills, setSkillSortOrders, updateSkill } from './skill'

jest.mock('@/lib/prisma')

console.error = jest.fn()

describe('SkillClient', () => {
  it('Should get skills by resume', async () => {
    const skills = createMultipleMockItems(createMockSkill, 5)
    const resumeId = skills[0].resumeId

    prismaMock.skill.findMany.mockResolvedValueOnce(skills)

    await expect(getSkills(resumeId)).resolves.toEqual(skills)
    expect(prismaMock.skill.findMany).toHaveBeenCalledWith({ where: { resumeId } })
  })
  it('Should handle errors when getting skills', async () => {
    const resumeId = faker.string.alphanumeric({ length: 5 })
    const error = new Error(faker.lorem.sentence())

    prismaMock.skill.findMany.mockRejectedValueOnce(error)

    await expect(getSkills(resumeId)).resolves.toEqual([])
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should add a skill to a resume', async () => {
    const skill = createMockSkill()

    prismaMock.skill.create.mockResolvedValueOnce(skill)

    const res = response(ResponseStatus.success, { payload: { skill } })
    await expect(addSkill(skill.resumeId, { name: skill.name })).resolves.toEqual(res)
    expect(prismaMock.skill.create).toHaveBeenCalledWith({
      data: { resumeId: skill.resumeId, name: skill.name },
    })
  })
  it('Should handle errors when adding a skill', async () => {
    const skill = createMockSkill()
    const error = new Error(faker.lorem.sentence())

    prismaMock.skill.create.mockRejectedValueOnce(error)

    const res = response(ResponseStatus.error, { error })
    await expect(addSkill(skill.resumeId, { name: skill.name })).resolves.toEqual(res)
  })
  it('Should update a skill', async () => {
    const skill = createMockSkill()

    prismaMock.skill.update.mockResolvedValueOnce(skill)

    const res = response(ResponseStatus.success, { payload: { skill } })
    await expect(updateSkill(skill.id, skill.resumeId, { name: skill.name })).resolves.toEqual(res)
    expect(prismaMock.skill.update).toHaveBeenCalledWith({
      where: { id: skill.id },
      data: { resumeId: skill.resumeId, name: skill.name },
    })
  })
  it('Should handle errors when updating a skill', async () => {
    const skill = createMockSkill()
    const error = new Error(faker.lorem.sentence())

    prismaMock.skill.update.mockRejectedValueOnce(error)

    const res = response(ResponseStatus.error, { error })
    await expect(updateSkill(skill.id, skill.resumeId, { name: skill.name })).resolves.toEqual(res)
  })
  it('Should set order of skills', async () => {
    const skills = createMultipleMockItems(createMockSkill, 5)

    skills[1] = { ...skills[1], order: 5 }
    skills[4] = { ...skills[4], order: 2 }

    await setSkillSortOrders(skills)

    expect(prismaMock.skill.update).toHaveBeenNthCalledWith(2, {
      where: { id: skills[1].id },
      data: { order: 5 },
    })
    expect(prismaMock.skill.update).toHaveBeenNthCalledWith(5, {
      where: { id: skills[4].id },
      data: { order: 2 },
    })
  })
  it('Should handle errors when setting order', async () => {
    const skills = createMultipleMockItems(createMockSkill, 5)
    const error = new Error(faker.lorem.sentence())

    prismaMock.skill.update.mockRejectedValueOnce(error)

    await setSkillSortOrders(skills)
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should delete a skill', async () => {
    const skill = createMockSkill()

    prismaMock.skill.delete.mockResolvedValueOnce(skill)

    await expect(deleteSkill(skill.id)).resolves.toEqual(skill)
    expect(prismaMock.skill.delete).toHaveBeenCalledWith({ where: { id: skill.id } })
  })
  it('Should handle errors when deleting skills', async () => {
    const skillId = faker.string.alphanumeric({ length: 5 })
    const error = new Error(faker.lorem.sentence())

    prismaMock.skill.delete.mockRejectedValueOnce(error)

    await deleteSkill(skillId)
    expect(console.error).toHaveBeenCalledWith(error)
  })
})
