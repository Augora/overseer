import { Database } from '@/Types/supabase';
import sortBy from 'lodash/sortBy';
import GroupeEditable from './GroupeEditable';

type GroupeParlementaire = Database['public']['Tables']['GroupeParlementaire']['Row'];

interface IGroupeGrid {
  GroupesParlementaires: GroupeParlementaire[];
  UpdateFn: Function;
  RemoveFn: Function;
}

export default function GroupeGrid(props: IGroupeGrid) {
  return (
    <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1">
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
