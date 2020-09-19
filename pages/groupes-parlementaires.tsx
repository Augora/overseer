import Head from 'next/head';
import { Box } from '@chakra-ui/core';
import { SimpleGrid } from '@chakra-ui/core';
import { useState, useEffect } from 'react';
import { IconButton } from '@chakra-ui/core';
import { useSession } from 'next-auth/client';
import sortBy from 'lodash/sortBy';

import { GetAllGroupesParlementaires } from '../lib/faunadb/groupes-parlementaires/DataResolver';
import GroupeEditable from '../components/groupes-parlementaires/GroupeEditable';

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

export default function Home() {
  const [session, loading] = useSession();
  const [GroupesParlementaires, setGroupesParlementaires] = useState([]);
  const [GroupesToAdd, setGroupesToAdd] = useState([]);
  const [GroupesToRemove, setGroupesToRemove] = useState([]);
  const [GroupesToUpdate, setGroupesToUpdate] = useState([]);

  useEffect(() => {
    console.log('loading', loading);
    if (!loading && session) {
      GetAllGroupesParlementaires(session.user.faunaDBToken)
        .then((data) => {
          setGroupesParlementaires(data.data.GroupesParlementairesDetails.data);
        })
        .catch((err) => console.error(err));
    }
  }, [loading]);

  console.log('GroupesParlementaires', GroupesParlementaires);

  if (loading) {
    return 'Loading';
  }

  if (!session) {
    return 'Please log in';
  }

  return (
    <SimpleGrid minChildWidth="300px" spacing="40px" p={5}>
      {sortBy(GroupesParlementaires, ['Ordre']).map((gp) => (
        <GroupeEditable
          key={gp._id}
          GroupeParlementaire={gp}
          UpdateFn={(gp) => {
            setGroupesToUpdate(GroupesToUpdate.concat(gp._id));
            setGroupesParlementaires(UpdateGroupeParlementaire(GroupesParlementaires, gp._id, gp));
          }}
          RemoveFn={(id) => {
            setGroupesToRemove(GroupesToRemove.concat(id));
            setGroupesParlementaires(RemoveGroupeParlementaire(GroupesParlementaires, id));
          }}
        />
      ))}
      <Box borderRadius="0.3em" minHeight="250px" width="100%" height="100%">
        <IconButton
          aria-label="Add Groupe Parlementaire"
          border="none"
          icon="add"
          width="100%"
          height="100%"
          onClick={() => {
            const newGroupe = GenerateNewGroupeParlementaire();
            setGroupesToAdd(GroupesToAdd.concat(newGroupe._id));
            setGroupesParlementaires(GroupesParlementaires.concat(newGroupe));
          }}
        />
      </Box>
    </SimpleGrid>
  );
}
