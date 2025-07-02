"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const expo_1 = require("@better-auth/expo");
const prisma_1 = require("better-auth/adapters/prisma");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.auth = (0, better_auth_1.betterAuth)({
    socialProviders: {
        google: {
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
        },
    },
    plugins: [(0, expo_1.expo)()],
    emailAndPassword: {
        enabled: true,
    },
    database: (0, prisma_1.prismaAdapter)(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: ["mirror://*"],
});
