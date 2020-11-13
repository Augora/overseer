import { Spinner, Button, Box, Switch, FormLabel, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

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
      const res = await UpdateGroupeParlementaire(token, gp);
      return Promise.resolve({
        Action: 'Update',
        Data: {
          Sigle: res.data.updateGroupeParlementaire.Sigle,
        },
      });
    }
    return Promise.resolve({
      Action: 'Nothing',
      Data: {
        Sigle: res.data.updateGroupeParlementaire.Sigle,
      },
    });
  });
}

interface IGroupesHandler {
  faunaToken: string;
}

export default function GroupesHandler(props: IGroupesHandler) {
  const [IsLoading, setIsLoading] = useState(true);
  const [GroupesParlementaires, setGroupesParlementaires] = useState([]);
  const [DisplayInactiveGroupes, setDisplayInactiveGroupes] = useState(false);

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
        GetAllGroupesParlementaires(props.faunaToken).then((data) => {
          setGroupesParlementaires(data.data.GroupesParlementairesDetails.data);
          setIsLoading(false);
        });
      });
  };

  return IsLoading ? (
    <Box minHeight="250px" display="flex" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  ) : (
    <>
      <Flex justifyContent="space-between" flexDirection={{ base: 'column', md: 'row' }}>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Button
            aria-label="Update staging"
            rightIcon={<FaArrowUp />}
            onClick={updateRemoteFunction}
            mr={{ base: 0, md: 10 }}
            mb={{ base: 5, md: 10 }}
          >
            Update staging
          </Button>
          <Button
            aria-label="Update staging"
            rightIcon={<FaArrowUp />}
            mr={{ base: 0, md: 10 }}
            mb={{ base: 5, md: 10 }}
            isDisabled
          >
            Update production
          </Button>
        </Flex>
        <Flex mb={{ base: 5, md: 10 }}>
          <FormLabel htmlFor="active-groupes">Display inactive groupes</FormLabel>
          <Switch
            id="active-groupes"
            size="lg"
            isChecked={DisplayInactiveGroupes}
            onChange={() => setDisplayInactiveGroupes(!DisplayInactiveGroupes)}
          />
        </Flex>
      </Flex>
      <GroupeGrid
        GroupesParlementaires={GroupesParlementaires.filter(
          (gp) => gp.Actif || (DisplayInactiveGroupes && !gp.Actif)
        )}
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
