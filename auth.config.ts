import type { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub],
  callbacks: {
    // signIn: async data => {
    //   console.log(data)
    //   return true
    // },
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
    // async session({ session, token }) {
    //   // Add custom properties to the session object
    //   console.log(session, token)
    //   session.user.id = token.sub
    //   return session
    // },
  },
} satisfies NextAuthConfig
