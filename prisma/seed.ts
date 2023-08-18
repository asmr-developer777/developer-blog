import { PrismaClient } from '@prisma/client';

// init Prisma Client
const prisma = new PrismaClient();

async function main() {
  //create dummy users
  const user1 = await prisma.user.upsert({
    where: { email: 'dennis@gmail.com' },
    update: {},
    create: {
      email: 'dennis@gmail.com',
      name: 'Dennis Black',
      password: 'supersecret',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'elon@tesla.com' },
    update: {},
    create: {
      email: 'elon@tesla.com',
      name: 'Elon Musk',
      password: 'supersecret',
    },
  });

  // create dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  const post3 = await prisma.article.upsert({
    where: { title: 'Prisma Client Just Became a Lot More Flexible' },
    update: {},
    create: {
      title: 'Prisma Client Just Became a Lot More Flexible',
      body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
      description:
        'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
      published: true,
    },
  });

  console.log(user1, user2, post1, post2, post3);
}

// execute main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client
    await prisma.$disconnect();
  });
