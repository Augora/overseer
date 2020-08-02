import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      // console.log("signIn:", user, account, profile);
      return Promise.resolve(true);
    },
    redirect: async (url, baseUrl) => {
      // console.log("redirect:", url, baseUrl);
      return Promise.resolve(baseUrl);
    },
    session: async (session, user) => {
      // console.log("session:", session, user);
      return Promise.resolve(Object.assign({}, session, { user }));
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      // console.log("jwt:", token, user, account, profile, isNewUser);
      return Promise.resolve(Object.assign({}, token, account));
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
