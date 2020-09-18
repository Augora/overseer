import { GetGraphQLClient } from '../FaunaGraphQLClient';
import { gql } from 'apollo-boost';

export function GetAllGroupesParlementaires(token) {
  return async () =>
    GetGraphQLClient(token).query({
      query: gql`
        query GetGroupesParlemetaires {
          GroupesParlementairesDetails {
            data {
              _id
              Sigle
              URLImage
              NomComplet
              Ordre
              Couleur
              Actif
            }
          }
        }
      `,
    });
}
