import { Box, IconButton, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import GroupeEditable from './GroupeEditable';
import sortBy from 'lodash/sortBy';

interface IGroupeGrid {
  GroupesParlementaires: Types.Canonical.GroupeParlementaire[];
  CreateFn: Function;
  UpdateFn: Function;
  RemoveFn: Function;
}

export default function GroupeGrid(props: IGroupeGrid) {
  return (
    <SimpleGrid minChildWidth="300px" spacing="40px">
      {sortBy(props.GroupesParlementaires, ['Ordre']).map((gp) => (
        <GroupeEditable
          key={gp.Sigle}
          GroupeParlementaire={gp}
          UpdateFn={props.UpdateFn}
          RemoveFn={props.RemoveFn}
        />
      ))}
      {/* <Box borderRadius="0.3em" minHeight="250px" width="100%" height="100%">
        <IconButton
          aria-label="Add Groupe Parlementaire"
          border="none"
          icon="add"
          width="100%"
          height="100%"
          onClick={props.CreateFn}
        />
      </Box> */}
    </SimpleGrid>
  );
}
