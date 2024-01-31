import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/server";
import {validatePassword} from "@/server/hash";
import * as Yup from "yup";

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const { email, password } = credentials
                const schema = Yup.string().email()
                let user

                if (!schema.isValidSync(email)){
                    throw Error("Invalid email")
                }

                try {
                    user = await prisma.user.findUnique({
                        where: {
                            email: email
                        }
                    })
                } catch (e) {
                    throw e
                }

                if (user === null) {
                    throw Error("There is no user with this email")
                }

                if (email !== user.email || !validatePassword(password, user.password)){
                    throw Error ("Wrong email or password")
                }

                return {id: user.id, email: user.email}
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {...user}
            }
            return token
        },
        async session({ session, token }) {
            if (token?.user) {
                session.user = token.user;
            }
            return session
        }
    },
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/errorPage', // Error code passed in query string as ?error=
    },
}

export default NextAuth(authOptions);