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

                const user = { id: "1", email: "test@test.com", password: "testTTTT1" }

                const {email, password} = credentials

                if (email !== user.email || password !== user.password){
                    throw Error ('Wrong email or password')
                }

                return {id: "test", email: "test@test.com"}
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/error', // Error code passed in query string as ?error=
    },
}
export default NextAuth(authOptions);