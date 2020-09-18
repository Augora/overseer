import { GetGraphQLClient } from '../FaunaGraphQLClient';
import { gql } from '@apollo/client';

export async function GetAllGroupesParlementaires(token) {
  return GetGraphQLClient(token).query({
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
