import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import Color from 'color';
import { useState } from 'react';
import { ChromePicker } from 'react-color';

interface GroupeEditableProps {
  GroupeParlementaire: Types.Canonical.GroupeParlementaire;
  UpdateFn: Function;
  RemoveFn: Function;
}

function GroupeEditable(props: GroupeEditableProps) {
  const [IsEditing, setIsEditing] = useState(false);

  return (
    <Card style={{ backgroundColor: props.GroupeParlementaire.CouleurDetail?.HEX }}>
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
          defaultValue={props.GroupeParlementaire.NomComplet}
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
          defaultValue={props.GroupeParlementaire.IDWikipedia}
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
            defaultView="hsl"
            disableAlpha={true}
            color={props.GroupeParlementaire.Couleur}
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

    // <ScaleFade initialScale={0.9} in={true}>
    //   <Box
    //     border={props.GroupeParlementaire.Actif ? '2px dashed transparent' : '2px dashed lightGray'}
    //     borderRadius="5px"
    //     p={5}
    //     backgroundColor={props.GroupeParlementaire.Couleur}
    //   >
    //     <Box display="flex" justifyContent="space-between" alignItems="center">
    //       <IconButton
    //         border="none"
    //         aria-label="Edit"
    //         icon={IsEditing ? <FaCheck /> : <FaCog />}
    //         onClick={() => {
    //           setIsEditing(!IsEditing);
    //         }}
    //       />
    //     </Box>

    //     <Box>
    //       <InputGroup mt={4}>
    //         <InputLeftAddon>Sigle</InputLeftAddon>
    //         <Input isReadOnly={true} type="text" defaultValue={props.GroupeParlementaire.Sigle} />
    //       </InputGroup>

    //       <InputGroup mt={4}>
    //         <InputLeftAddon>Nom</InputLeftAddon>
    //         <Input
    //           isDisabled={!IsEditing}
    //           type="text"
    //           defaultValue={props.GroupeParlementaire.NomComplet}
    //           onChange={(v) =>
    //             props.UpdateFn(
    //               Object.assign({}, props.GroupeParlementaire, {
    //                 NomComplet: v.target.value,
    //               }),
    //             )
    //           }
    //         />
    //       </InputGroup>

    //       <InputGroup mt={4}>
    //         <InputLeftAddon>Ordre</InputLeftAddon>
    //         <Input
    //           isDisabled={!IsEditing}
    //           type="number"
    //           defaultValue={props.GroupeParlementaire.Ordre}
    //           onChange={(v) =>
    //             props.UpdateFn(
    //               Object.assign({}, props.GroupeParlementaire, {
    //                 Ordre: v.target.value,
    //               }),
    //             )
    //           }
    //         />
    //       </InputGroup>

    //       <InputGroup mt={4}>
    //         <InputLeftAddon>IDWikipedia</InputLeftAddon>
    //         <Input
    //           isDisabled={!IsEditing}
    //           type="text"
    //           defaultValue={props.GroupeParlementaire.IDWikipedia}
    //           onChange={(v) =>
    //             props.UpdateFn(
    //               Object.assign({}, props.GroupeParlementaire, {
    //                 IDWikipedia: v.target.value,
    //               }),
    //             )
    //           }
    //         />
    //       </InputGroup>

    //       {IsEditing ? (
    //         <Box mt={4}>
    //           <ChromePicker
    //             defaultView="hsl"
    //             disableAlpha={true}
    //             color={props.GroupeParlementaire.Couleur}
    //             onChange={(v) => {
    //               const color = Color(v.hex);

    //               props.UpdateFn(
    //                 Object.assign({}, props.GroupeParlementaire, {
    //                   Couleur: color.hsl().string(),
    //                   CouleurDetail: {
    //                     HEX: color.hex(),
    //                     HSL: {
    //                       Full: color.hsl().string(0),
    //                       H: Math.round(color.hsl().object().h),
    //                       S: Math.round(color.hsl().object().s),
    //                       L: Math.round(color.hsl().object().l),
    //                     },
    //                     RGB: {
    //                       Full: color.rgb().string(0),
    //                       R: Math.round(color.rgb().object().r),
    //                       G: Math.round(color.rgb().object().g),
    //                       B: Math.round(color.rgb().object().b),
    //                     },
    //                   },
    //                 }),
    //               );
    //             }}
    //           />
    //         </Box>
    //       ) : null}
    //     </Box>
    //   </Box>
    // </ScaleFade>
  );
}

export default GroupeEditable;
