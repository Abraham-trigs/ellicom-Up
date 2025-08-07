import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

// Define JobStatus enum manually (safer than runtime import)
const jobStatuses = ['DRAFT', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const
type JobStatus = (typeof jobStatuses)[number]

async function main() {
  console.log('🌱 Starting seed...')

  // Create 5 users (one for each role)
  const roles = ['SUPERADMIN', 'ADMIN', 'SECRETARY', 'STAFF', 'CLIENT'] as const

  const users = await Promise.all(
    roles.map(role =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          role,
          password: faker.internet.password(),
        },
      })
    )
  )

  console.log(`✅ Created ${users.length} users`)

  // Create 10 jobs
  const jobs = await Promise.all(
    Array.from({ length: 10 }).map(() => {
      const creator = faker.helpers.arrayElement(users)
      const maybeHandler = faker.helpers.maybe(() => faker.helpers.arrayElement(users), { probability: 0.7 })

      return prisma.job.create({
        data: {
          title: faker.word.words({ count: { min: 2, max: 5 } }),
          details: faker.lorem.paragraph(),
          type: faker.helpers.arrayElement(['Bug', 'Feature', 'Support']),
          status: faker.helpers.arrayElement(jobStatuses),
          createdBy: { connect: { id: creator.id } },
          ...(maybeHandler ? { handledBy: { connect: { id: maybeHandler.id } } } : {}),
        },
      })
    })
  )

  console.log(`✅ Created ${jobs.length} jobs`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('🌱 Seed complete')
  })
