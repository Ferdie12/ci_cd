const prisma = require('./prismaConnect');

module.exports = {
    user: async () => {
        await prisma.user.deleteMany({});
    }
};