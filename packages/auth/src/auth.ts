import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@sec-design-swarm/db"
import { truncate } from "node:fs";

export const auth = betterAuth({

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),


    //email + pass enabled by default.
    emailAndPassword: {
        enabled: true
    },

    //session config
    session: {
        //cookie-based sessions by default, 7-day expiry
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24
    },

    experimental: {
        joins: true
    }
})