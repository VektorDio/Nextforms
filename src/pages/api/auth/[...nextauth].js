import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: "69dbfac3c1242a9cecd71c8614ef6b2f",
    providers: [
        CredentialsProvider({
            async authorize(credentials) {

                const user = {
                    id: "1",
                    email: "test@test.com",
                    password: "testTTTT1",
                    firstName: "firstName",
                    lastName: "testLastName",
                    phoneNumber: "380 000 00 00 00",
                    organisation: "testOrganization"
                }

                const {email, password} = credentials

                if (email !== user.email || password !== user.password){
                    throw Error ('Wrong email or password')
                }
                return Promise.resolve(user)
            }
        })
    ],
    callbacks: {
        async session({session, token}) {
            session.accessToken = token.accessToken
            session.user.id = token.id
            session.user.firstName = token.firstName
            session.user.lastName = token.lastName
            session.user.phoneNumber = token.phoneNumber
            session.user.organisation = token.organisation
            return session
        },
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token
                token.id = user.id
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.phoneNumber = user.phoneNumber
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