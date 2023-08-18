import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// init Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  //create dummy users
  const passwordDennis = await bcrypt.hash('supersecret', roundsOfHashing);
  const passwordElon = await bcrypt.hash('supersecret', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'dennis@gmail.com' },
    update: {
      password: passwordDennis,
    },
    create: {
      email: 'dennis@gmail.com',
      name: 'Dennis Black',
      password: passwordDennis,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'elon@tesla.com' },
    update: {
      password: passwordElon,
    },
    create: {
      email: 'elon@tesla.com',
      name: 'Elon Musk',
      password: passwordElon,
    },
  });

  // create dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {
      authorId: user1.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {
      authorId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user2.id,
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
