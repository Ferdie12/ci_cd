const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    errorFormat: "pretty",
    log: ["info", "warn", "error", "query"]
});

module.exports = prisma;