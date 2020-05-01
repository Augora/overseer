import { GetGraphQLClient } from "../faunadb/FaunaGraphQLClient";
import { gql } from "apollo-boost";

export async function GetAllGroupesParlementaires() {
  return GetGraphQLClient().query({
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
