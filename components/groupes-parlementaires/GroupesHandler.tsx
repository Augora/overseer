import { Spinner, IconButton, Box } from '@chakra-ui/core';
import React, { useState, useEffect } from 'react';
import {
  GetAllGroupesParlementaires,
  CreateGroupeParlementaire,
  UpdateGroupeParlementaire,
} from '../../lib/faunadb/groupes-parlementaires/DataResolver';
import GroupeGrid from './GroupeGrid';

function UpdateGroupeParlementaireFromArray(groupes, id, updatedGroupe) {
  const newGroupes = groupes.map((gp) => {
    if (gp._id === id) {
      return updatedGroupe;
    } else {
      return gp;
    }
  });
  return newGroupes;
}

function RemoveGroupeParlementaireFromArray(groupes, id) {
  return groupes.filter((gp) => gp._id !== id);
}

function GenerateNewGroupeParlementaire() {
  return {
    _id: `CUSTOM_${Math.random()}`,
    Sigle: '',
    NomComplet: '',
    Couleur: 'hsla(0, 0%, 0%, 1)',
    URLImage: '',
    Ordre: 9000,
    Actif: true,
  };
}

async function UpdateRemoteGroupes(token, groupes) {
  const res = await GetAllGroupesParlementaires(token);
  return groupes.map(async (gp) => {
    const foundGroupe = res.data.GroupesParlementairesDetails.data.find(
      (rgp) => gp._id === rgp._id
    );
    if (foundGroupe) {
      console.log(`Updating ${gp.Sigle}...`);
      const res = await UpdateGroupeParlementaire(token, gp);
      console.log(`Updated ${res.data.updateGroupeParlementaire.Sigle}!`);
      return Promise.resolve({
        Action: 'Update',
        Data: {
          Sigle: res.data.updateGroupeParlementaire.Sigle,
        },
      });
    } else {
      console.log(`Creating ${gp.Sigle}...`);
      const res = await CreateGroupeParlementaire(token, gp);
      console.log(`Created ${res.data.createGroupeParlementaire.Sigle}!`);
      return Promise.resolve({
        Action: 'Create',
        Data: {
          Sigle: res.data.createGroupeParlementaire.Sigle,
        },
      });
    }
  });
}

interface IGroupesHandler {
  faunaToken: string;
}

export default function GroupesHandler(props: IGroupesHandler) {
  const [IsLoading, setIsLoading] = useState(true);
  const [GroupesParlementaires, setGroupesParlementaires] = useState([]);

  useEffect(() => {
    GetAllGroupesParlementaires(props.faunaToken).then((data) => {
      setGroupesParlementaires(data.data.GroupesParlementairesDetails.data);
      setIsLoading(false);
    });
  }, []);

  const updateRemoteFunction = () => {
    setIsLoading(true);
    UpdateRemoteGroupes(props.faunaToken, GroupesParlementaires)
      .then((promises) => Promise.all(promises))
      .then((data) => {
        console.log('updates', data);
        GetAllGroupesParlementaires(props.faunaToken).then((data) => {
          setGroupesParlementaires(data.data.GroupesParlementairesDetails.data);
          setIsLoading(false);
        });
      });
  };

  return IsLoading ? (
    <Spinner />
  ) : (
    <>
      <Box>
        <IconButton aria-label="Update staging" icon="arrow-up" onClick={updateRemoteFunction} />
      </Box>
      <GroupeGrid
        GroupesParlementaires={GroupesParlementaires}
        CreateFn={() => {
          const newGroupe = GenerateNewGroupeParlementaire();
          setGroupesParlementaires(GroupesParlementaires.concat(newGroupe));
        }}
        UpdateFn={(gp) => {
          setGroupesParlementaires(
            UpdateGroupeParlementaireFromArray(GroupesParlementaires, gp._id, gp)
          );
        }}
        RemoveFn={(id) => {
          setGroupesParlementaires(RemoveGroupeParlementaireFromArray(GroupesParlementaires, id));
        }}
      />
    </>
  );
}
