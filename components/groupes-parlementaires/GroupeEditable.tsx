import { Database } from '@/Types/supabase';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import Color from 'color';
import { useState } from 'react';
import { ChromePicker } from 'react-color';

type GroupeParlementaire = Database['public']['Tables']['GroupeParlementaire']['Row'];

interface GroupeEditableProps {
  GroupeParlementaire: GroupeParlementaire;
  UpdateFn: Function;
  RemoveFn: Function;
}

function GroupeEditable(props: GroupeEditableProps) {
  const [IsEditing, setIsEditing] = useState(false);

  return (
    <Card
      style={{
        backgroundColor: (props.GroupeParlementaire.CouleurDetail as { [HEX: string]: string })
          ?.HEX,
      }}
    >
      <CardHeader className="flex justify-between">
        <p className="text-lg uppercase font-bold">{props.GroupeParlementaire.Sigle}</p>
        <Button
          onClick={() => {
            setIsEditing(!IsEditing);
          }}
        >
          {IsEditing ? 'Save' : 'Edit'}
        </Button>
      </CardHeader>
      <CardBody className="gap-3">
        <Input
          label="Nom"
          defaultValue={props.GroupeParlementaire.NomComplet ?? ''}
          isDisabled={!IsEditing}
          onChange={(v) =>
            props.UpdateFn(
              Object.assign({}, props.GroupeParlementaire, {
                NomComplet: v.target.value,
              }),
            )
          }
        />
        <Input
          label="IDWikipedia"
          defaultValue={props.GroupeParlementaire.IDWikipedia ?? ''}
          isDisabled={!IsEditing}
          onChange={(v) =>
            props.UpdateFn(
              Object.assign({}, props.GroupeParlementaire, {
                IDWikipedia: v.target.value,
              }),
            )
          }
        />
        <Input
          label="Ordre"
          defaultValue={props.GroupeParlementaire.Ordre?.toString()}
          isDisabled={!IsEditing}
          onChange={(v) =>
            props.UpdateFn(
              Object.assign({}, props.GroupeParlementaire, {
                Ordre: v.target.value,
              }),
            )
          }
        />
        {IsEditing ? (
          <ChromePicker
            disableAlpha={true}
            color={props.GroupeParlementaire.Couleur || ''}
            onChange={(v) => {
              const color = Color(v.hex);

              props.UpdateFn(
                Object.assign({}, props.GroupeParlementaire, {
                  Couleur: color.hsl().string(),
                  CouleurDetail: {
                    HEX: color.hex(),
                    HSL: {
                      Full: color.hsl().string(0),
                      H: Math.round(color.hsl().object().h),
                      S: Math.round(color.hsl().object().s),
                      L: Math.round(color.hsl().object().l),
                    },
                    RGB: {
                      Full: color.rgb().string(0),
                      R: Math.round(color.rgb().object().r),
                      G: Math.round(color.rgb().object().g),
                      B: Math.round(color.rgb().object().b),
                    },
                  },
                }),
              );
            }}
          />
        ) : null}
      </CardBody>
    </Card>
  );
}

export default GroupeEditable;
