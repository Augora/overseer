import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import {
  CreateUser,
  UpdateUserPassword,
  DoesUserExists,
  GetUserPassword,
  IsUserAdmin,
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
      console.log('profile.login :>> ', profile.login);
      console.log('account.accessToken :>> ', account.accessToken);
      if (
        profile.login !== null &&
        profile.login.length > 0 &&
        account.accessToken !== null &&
        account.accessToken.length > 0
      ) {
        const userExists = await DoesUserExists(profile.login);
        console.log('userExists :>> ', userExists);
        if (userExists) {
          const isAdmin = await IsUserAdmin(profile.login);
          console.log('isAdmin :>> ', isAdmin);
          if (isAdmin) {
            return UpdateUserPassword(profile.login, account.accessToken)
              .then(true)
              .catch((e) => {
                console.error(e);
                throw new e();
              });
          }
        } else {
          console.log('profile :>> ', profile);
          try {
            await CreateUser(profile.login);
          } catch (e) {
            console.error(e);
          }
        }
      }
      return Promise.resolve(false);
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
        profile.login !== null &&
        profile.login.length > 0 &&
        account.accessToken !== null &&
        account.accessToken.length > 0
      ) {
        const userPassword = await GetUserPassword(profile.login, account.accessToken);
        userToken = userPassword.secret;
      }
      return Promise.resolve(Object.assign({}, token, account, { faunaDBToken: userToken }));
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
