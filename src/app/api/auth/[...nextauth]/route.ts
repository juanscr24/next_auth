import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

if (!process.env.NEXTAUTH_SECRET) {
    throw new Error("NEXTAUTH_SECRET is not defined");
}

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    useSecureCookies: process.env.NODE_ENV === "production",
    session: {
        strategy: "jwt" as const,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
        secret: process.env.NEXTAUTH_SECRET,
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === "production",
            },
        },
    },
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "*******" }
            },

            async authorize(credentials, req) {
                const userFound = await prisma.user.findUnique({
                    where: { email: credentials?.email }
                })
                if (!userFound) throw new Error(JSON.stringify({
                    message: "User not found",
                    code: "USER_NOT_FOUND"
                }));

                const matchPassword = await bcrypt.compare(credentials!.password, userFound.password);
                if (!matchPassword) throw new Error("Incorrect password");

                return {
                    id: String(userFound.id),
                    username: userFound.username,
                    email: userFound.email
                }
            }
        })
    ],
    callbacks: {
        async jwt({
            token,
            user,
        }: {
            token: import("next-auth/jwt").JWT;
            user?: { id: string; username: string; email: string };
        }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.email = user.email;
            }
            return token;
        },

        async session({
            session,
            token,
        }: {
            session: import("next-auth").Session;
            token: import("next-auth/jwt").JWT;
        }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.email = token.email as string;
            }
            return session;
        },
    }
    ,
    pages: {
        signIn: '/login',
        error: '/auth/error',
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };