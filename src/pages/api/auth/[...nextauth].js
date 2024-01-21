import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/server";
import {validatePassword} from "@/server/hash";

export const authOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const {email, password} = credentials
                let user
                try {
                    user = await prisma.user.findUnique({
                        where:{
                            email:email
                        }
                    })
                } catch (e) {
                    throw e
                }

                if (user === null) {
                    throw Error("There is no user with this email")
                }

                if (email !== user.email || !validatePassword(password, user.password)){
                    throw Error ('Wrong email or password')
                }

                return user
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.userId = user.id
            }
            return token
        },
        async session({session, token}) {
            session.user.id = token.userId
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