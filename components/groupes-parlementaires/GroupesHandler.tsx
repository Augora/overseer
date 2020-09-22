import { Spinner } from '@chakra-ui/core';
import React, { useState, useEffect } from 'react';
import { GetAllGroupesParlementaires } from '../../lib/faunadb/groupes-parlementaires/DataResolver';
import GroupeGrid from './GroupeGrid';

function UpdateGroupeParlementaire(groupes, id, updatedGroupe) {
  const newGroupes = groupes.map((gp) => {
    if (gp._id === id) {
      return updatedGroupe;
    } else {
      return gp;
    }
  });
  return newGroupes;
}

function RemoveGroupeParlementaire(groupes, id) {
  return groupes.filter((gp) => gp._id !== id);
}

function GenerateNewGroupeParlementaire() {
  return {
    _id: `CUSTOM_${Math.random()}`,
    Sigle: '',
    NomComplet: '',
    Couleur: 'hsla(0, 0%, 0%, 1)',
    URLImage: '',
    Order: 10,
    Actif: true,
  };
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
  return IsLoading ? (
    <Spinner />
  ) : (
    <GroupeGrid
      GroupesParlementaires={GroupesParlementaires}
      CreateFn={() => {
        const newGroupe = GenerateNewGroupeParlementaire();
        setGroupesParlementaires(GroupesParlementaires.concat(newGroupe));
      }}
      UpdateFn={(gp) => {
        setGroupesParlementaires(UpdateGroupeParlementaire(GroupesParlementaires, gp._id, gp));
      }}
      RemoveFn={(id) => {
        setGroupesParlementaires(RemoveGroupeParlementaire(GroupesParlementaires, id));
      }}
    />
  );
}
