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

async function UpdateRemoteGroupes(token, groupes) {
  // const res = await GetAllGroupesParlementaires(token);
  // return groupes.map(async (gp) => {
  //   const foundGroupe = res.data.GroupesParlementairesDetails.data.find(
  //     (rgp) => gp._id === rgp._id
  //   );
  //   if (foundGroupe) {
  //     const res = await UpdateGroupeParlementaire(gp);
  //     return Promise.resolve({
  //       Action: 'Update',
  //       Data: {
  //         Sigle: res.data.updateGroupeParlementaire.Sigle,
  //       },
  //     });
  //   }
  //   return Promise.resolve({
  //     Action: 'Nothing',
  //     Data: {
  //       Sigle: res.data.updateGroupeParlementaire.Sigle,
  //     },
  //   });
  // });
}

export default function GroupesHandler() {
  const [IsLoading, setIsLoading] = useState(true);
  const [GroupesParlementaires, setGroupesParlementaires] = useState<
    Types.Canonical.GroupeParlementaire[]
  >([]);
  const [DisplayInactiveGroupes, setDisplayInactiveGroupes] = useState(false);

  useEffect(() => {
    GetGroupesFromSupabase().then((data) => {
      console.log('GetAllGroupesParlementaires', data);
      setGroupesParlementaires(data);
      setIsLoading(false);
    });
  }, []);

  const updateRemoteFunction = () => {
    // setIsLoading(true);
    // UpdateRemoteGroupes(GroupesParlementaires)
    //   .then((promises) => Promise.all(promises))
    //   .then((data) => {
    //     GetAllGroupesParlementaires().then((data) => {
    //       console.log('GetAllGroupesParlementaires2', data);
    //       setGroupesParlementaires(data);
    //       setIsLoading(false);
    //     });
    //   });
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
            isDisabled
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
