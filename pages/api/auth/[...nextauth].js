import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.OVERSEER_APP_CLIENTID,
      clientSecret: process.env.OVERSEER_APP_CLIENTSECRET,
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
      console.log("session:", session, user);
      return Promise.resolve(Object.assign({}, session, { user }));
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      // console.log("jwt:", token, user, account, profile, isNewUser);
      console.log("jwt:", token, account);
      return Promise.resolve(Object.assign({}, token, account));
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
