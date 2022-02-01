import { Box, IconButton, SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import GroupeEditable from './GroupeEditable';
import sortBy from 'lodash/sortBy';

interface IGroupeGrid {
  GroupesParlementaires: Types.Canonical.GroupeParlementaire[];
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
    </SimpleGrid>
  );
}
