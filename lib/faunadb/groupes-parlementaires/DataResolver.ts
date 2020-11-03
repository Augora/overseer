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
            CouleurDetail {
              HEX
              HSL {
                Full
                H
                S
                L
              }
              RGB {
                Full
                R
                G
                B
              }
            }
            Actif
          }
        }
      }
    `,
  });
}

export async function CreateGroupeParlementaire(token, groupe) {
  return GetGraphQLClient(token).mutate({
    mutation: gql`
      mutation CreateGroupeParlementaire {
        createGroupeParlementaire(data: {
          Actif: ${groupe.Actif}
          Couleur: "${groupe.Couleur}"
          NomComplet: "${groupe.NomComplet}"
          Ordre: ${groupe.Ordre}
          Sigle: "${groupe.Sigle}"
          URLImage: "${groupe.URLImage}"
        }) {
          Sigle
        }
      }
    `,
  });
}

export async function UpdateGroupeParlementaire(token, groupe) {
  return GetGraphQLClient(token).mutate({
    mutation: gql`
      mutation UpdateGroupeParlementaire {
        updateGroupeParlementaire(id: "${groupe._id}", data: {
          Actif: ${groupe.Actif}
          Couleur: "${groupe.Couleur}"
          CouleurDetail: {
            HEX: "${groupe.CouleurDetail.HEX}"
            HSL: {
              Full: "${groupe.CouleurDetail.HSL.Full}"
              H: ${groupe.CouleurDetail.HSL.H}
              S: ${groupe.CouleurDetail.HSL.S}
              L: ${groupe.CouleurDetail.HSL.L}
            }
            RGB: {
              Full: "${groupe.CouleurDetail.RGB.Full}"
              R: ${groupe.CouleurDetail.RGB.R}
              G: ${groupe.CouleurDetail.RGB.G}
              B: ${groupe.CouleurDetail.RGB.B}
            },
          }
          NomComplet: "${groupe.NomComplet}"
          Ordre: ${groupe.Ordre}
          Sigle: "${groupe.Sigle}"
          URLImage: "${groupe.URLImage}"
        }) {
          Sigle
        }
      }
    `,
  });
}

export async function RemoveGroupeParlementaire(token, groupe) {
  return GetGraphQLClient(token).mutate({
    mutation: gql`
      mutation UpdateGroupeParlementaire {
        updateGroupeParlementaire(id: "${groupe._id}") {
          Sigle
        }
      }
    `,
  });
}
