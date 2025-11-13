import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { prisma } from "@/src/libs/db";
import bcrypt from "bcrypt";

export const authOptions = {
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
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.email = token.email;
            return session;
        },
    }
    ,
    pages: {
        signIn: '/login',
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };