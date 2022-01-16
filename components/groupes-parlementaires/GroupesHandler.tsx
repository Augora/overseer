import { Spinner, Button, Box, Switch, FormLabel, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

import {
  GetGroupesFromSupabase,
  CreateGroupeParlementaireToSupabase,
  UpdateGroupeParlementaireToSupabase,
} from '../../lib/supabase/groupes-parlementaires/DataResolver';
import GroupeGrid from './GroupeGrid';

function UpdateGroupeParlementaireFromArray(
  groupes: Types.Canonical.GroupeParlementaire[],
  sigle: string,
  updatedGroupe: Types.Canonical.GroupeParlementaire
) {
  const newGroupes = groupes.map((gp) => {
    if (gp.Sigle === sigle) {
      return updatedGroupe;
    } else {
      return gp;
    }
  });
  return newGroupes;
}

function RemoveGroupeParlementaireFromArray(
  groupes: Types.Canonical.GroupeParlementaire[],
  sigle: string
) {
  return groupes.filter((gp) => gp.Sigle !== sigle);
}

function GenerateNewGroupeParlementaire() {
  return {
    Sigle: '',
    NomComplet: '',
    Couleur: 'hsla(0, 0%, 0%, 1)',
    URLImage: '',
    Ordre: 9000,
    Actif: true,
  };
}

async function UpdateRemoteGroupes(localGroupes) {
  const remoteGroupes = await GetGroupesFromSupabase();
  return localGroupes.map(async (gp) => {
    const foundGroupe = remoteGroupes.find((rgp) => gp.Sigle === rgp.Sigle);
    if (foundGroupe) {
      return await UpdateGroupeParlementaireToSupabase(gp);
    }
    return gp;
  });
}

export default function GroupesHandler() {
  const [IsLoading, setIsLoading] = useState(true);
  const [GroupesParlementaires, setGroupesParlementaires] = useState<
    Types.Canonical.GroupeParlementaire[]
  >([]);
  const [DisplayInactiveGroupes, setDisplayInactiveGroupes] = useState(false);

  useEffect(() => {
    GetGroupesFromSupabase().then((data) => {
      setGroupesParlementaires(data);
      setIsLoading(false);
    });
  }, []);

  const updateRemoteFunction = () => {
    setIsLoading(true);
    UpdateRemoteGroupes(GroupesParlementaires)
      .then((promises) => Promise.all(promises))
      .then((data) => {
        setIsLoading(false);
        return data;
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
            UpdateGroupeParlementaireFromArray(GroupesParlementaires, gp.Sigle, gp)
          );
        }}
        RemoveFn={(id) => {
          setGroupesParlementaires(RemoveGroupeParlementaireFromArray(GroupesParlementaires, id));
        }}
      />
    </>
  );
}
