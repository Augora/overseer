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
    <div className="grid grid-cols-4 gap-4">
      {sortBy(props.GroupesParlementaires, ['Ordre']).map((gp) => (
        <GroupeEditable
          key={gp.Sigle}
          GroupeParlementaire={gp}
          UpdateFn={props.UpdateFn}
          RemoveFn={props.RemoveFn}
        />
      ))}
    </div>
  );
}
