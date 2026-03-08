import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const adapter = new PrismaBetterSqlite3({
    url: path.join(process.cwd(), 'dev.db'),
});

const prisma = new PrismaClient({ adapter });

export default prisma;
