import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import {
  UpdateUserPassword,
  DoesUserExists,
  GetUserPassword,
} from '../../../lib/faunadb/users/DataResolver';

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.OVERSEER_APP_CLIENTID,
      clientSecret: process.env.OVERSEER_APP_CLIENTSECRET,
      scope: ['user:email'],
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      console.log('user, account, profile', user, account, profile);
      if (
        user.email !== null &&
        user.email.length > 0 &&
        account.accessToken !== null &&
        account.accessToken.length > 0
      ) {
        const userExists = await DoesUserExists(user.email);
        if (userExists) {
          return UpdateUserPassword(user.email, account.accessToken)
            .then(true)
            .catch((e) => {
              console.error(e);
              throw new e();
            });
        } else {
          return Promise.resolve(false);
        }
      } else {
        return Promise.resolve(false);
      }
    },
    redirect: async (url, baseUrl) => {
      console.log('url, baseUrl', url, baseUrl);
      return Promise.resolve(baseUrl);
    },
    session: async (session, user) => {
      console.log('session, user', session, user);
      return Promise.resolve(Object.assign({}, session, { user }));
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      console.log(
        'token, user, account, profile, isNewUser',
        token,
        user,
        account,
        profile,
        isNewUser
      );
      if (token && token.faunaDBToken && !user && !account && !profile) {
        return Promise.resolve(token);
      }
      var userToken = null;
      if (
        user &&
        account &&
        user.email !== null &&
        user.email.length > 0 &&
        account.accessToken !== null &&
        account.accessToken.length > 0
      ) {
        const userPassword = await GetUserPassword(user.email, account.accessToken);
        userToken = userPassword.secret;
      }
      return Promise.resolve(Object.assign({}, token, account, { faunaDBToken: userToken }));
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
