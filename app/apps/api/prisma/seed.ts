/* eslint-disable prettier/prettier */
import { faker } from "@faker-js/faker";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";


const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!
})
const prisma = new PrismaClient({ adapter })
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

async function main() {
    console.log('🌱 Seeding database...')
    
  // Clear existing data
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});

    // Create users
    const users = Array.from({ length: 10 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        bio: faker.lorem.sentence(),
        avatar: faker.image.avatar(),
        // password: faker.internet.password(),
    }));
    
    await prisma.user.createMany({ data: users });

    // Create posts with comments
    for (let i = 0; i < 50; i++) {
        const title = faker.lorem.sentence();
        
        await prisma.post.create({
            data: {
                title: title,
                content: faker.lorem.paragraphs({ min: 3, max: 7 }),
                published: true,
                slug: generateSlug(title),
                thumbnail: faker.image.urlPicsumPhotos(),
                authorId: Math.floor(Math.random() * 10) + 1,
                comments: {
                    createMany: {
                        data: Array.from({ length: 20 }).map(() => ({
                            content: faker.lorem.sentences({ min: 1, max: 3 }),
                            authorId: Math.floor(Math.random() * 10) + 1,
                        })),
                    },
                },
            },
        });
    }
    
    console.log("Seeding completed.");
} 

main()
    .then(async () => {
        await prisma.$disconnect();
        process.exit(0);
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });