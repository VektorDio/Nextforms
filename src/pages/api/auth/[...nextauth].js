import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/server";
import {validatePassword} from "@/server/hash";

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: "69dbfac3c1242a9cecd71c8614ef6b2f",
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const {email, password} = credentials

                const user = await prisma.user.findUnique({
                    where:{
                        email:email
                    }
                })

                if (email !== user.email || !validatePassword(password, user.password)){
                    throw Error ('Wrong email or password')
                }

                return user
            }
        })
    ],
    callbacks: {
        async session({session, token}) {
            session.accessToken = token.accessToken
            session.user.id = token.id
            session.email = token.email
            // session.user.firstName = token.firstName
            // session.user.lastName = token.lastName
            // session.user.phoneNumber = token.phoneNumber
            session.user.organisation = token.organisation
            return session
        },
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user.id
                token.email = user.email
                // token.firstName = user.firstName
                // token.lastName = user.lastName
                // token.phoneNumber = user.phoneNumber
                token.organisation = user.organisation
            }
            return token
        }
    },
    pages: {
        signIn: '/login',
        error: '/error', // Error code passed in query string as ?error=
    },
}
export default NextAuth(authOptions);