import { PrismaClient } from '@/lib/generated/prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a user with a post
  const user = await prisma.user.create({
    data: {
      username: 'taro_yamada',
      displayName: '山田 太郎',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      gender: 'male',
      posts: {
        create: [
          {
            content: 'こんにちは、初めての投稿です！今日はいい天気ですね。\n#はじめまして #自己紹介',
            image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&auto=format&fit=crop&q=80',
            likes: 5,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  })

  console.log('Created user and post:')
  console.log(JSON.stringify(user, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })