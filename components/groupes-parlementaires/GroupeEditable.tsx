import { useState } from "react";
import { Box } from "@chakra-ui/core";
import { useColorMode } from "@chakra-ui/core";
import { ChromePicker } from "react-color";
import { InputGroup, Input, InputLeftAddon } from "@chakra-ui/core";
import { IconButton } from "@chakra-ui/core";
import { Switch } from "@chakra-ui/core";

interface GroupeEditableProps {
  GroupeParlementaire: GroupeParlementaire;
  UpdateFn: Function;
  RemoveFn: Function;
}

interface GroupeParlementaire {
  _id: string;
  Sigle: string;
  NomComplet: string;
  Couleur: string;
  URLImage: string;
  Order: number;
  Actif: boolean;
}

// hsla(2, 10%, 20%, 1)
// 2,10,20,1
function ChangeOpacity(color: string, opacity: string) {
  const newColor = color
    .replace("hsla(", "")
    .replace(")", "")
    .replace(" ", "")
    .replace("%", "")
    .split(",");
  return `hsla(${newColor[0]}, ${newColor[1]}%, ${newColor[2]}, ${opacity})`;
}

function GroupeEditable(props: GroupeEditableProps) {
  const { colorMode } = useColorMode();
  const [IsEditing, setIsEditing] = useState(false);

  return (
    <Box
      borderWidth="2px"
      borderStyle={props.GroupeParlementaire.Actif ? "solid" : "dashed"}
      borderColor="lightGray"
      borderRadius="0.3em"
      minHeight="250px"
      p={5}
      backgroundColor={
        props.GroupeParlementaire.Actif
          ? props.GroupeParlementaire.Couleur
          : ChangeOpacity(props.GroupeParlementaire.Couleur, "0.3")
      }
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
          border="none"
          aria-label="Edit"
          icon={IsEditing ? "check" : "settings"}
          onClick={() => {
            setIsEditing(!IsEditing);
          }}
        />

        {IsEditing ? (
          <IconButton
            border="none"
            aria-label="Remove"
            icon="close"
            onClick={() => {
              props.RemoveFn(props.GroupeParlementaire._id);
            }}
          />
        ) : null}

        <Switch
          isChecked={props.GroupeParlementaire.Actif}
          onChange={() => {
            props.UpdateFn(
              Object.assign({}, props.GroupeParlementaire, {
                Actif: !props.GroupeParlementaire.Actif,
              })
            );
          }}
        />
      </Box>

      <Box
        style={{
          opacity: props.GroupeParlementaire.Actif ? 1 : 0.3,
          transition: "opacity 0.225s linear",
        }}
      >
        <InputGroup mt={4}>
          <InputLeftAddon children="Nom" />
          <Input
            style={{
              opacity: IsEditing ? 1 : 0.7,
            }}
            isDisabled={!IsEditing}
            type="text"
            roundedLeft="0"
            defaultValue={props.GroupeParlementaire.NomComplet}
            color={colorMode === "light" ? "black" : "white"}
            onChange={(v) =>
              props.UpdateFn(
                Object.assign({}, props.GroupeParlementaire, {
                  NomComplet: v.target.value,
                })
              )
            }
          />
        </InputGroup>

        <InputGroup mt={4}>
          <InputLeftAddon children="Sigle" />
          <Input
            isDisabled={!IsEditing}
            type="text"
            roundedLeft="0"
            defaultValue={props.GroupeParlementaire.Sigle}
            color={colorMode === "light" ? "black" : "white"}
            onChange={(v) =>
              props.UpdateFn(
                Object.assign({}, props.GroupeParlementaire, {
                  Sigle: v.target.value,
                })
              )
            }
          />
        </InputGroup>

        {IsEditing ? (
          <Box mt={4}>
            <ChromePicker
              defaultView="hsl"
              color={props.GroupeParlementaire.Couleur}
              onChange={(v) => {
                props.UpdateFn(
                  Object.assign({}, props.GroupeParlementaire, {
                    Couleur: `hsla(${Math.round(v.hsl.h)}, ${Math.round(
                      v.hsl.s * 100
                    )}%, ${Math.round(v.hsl.l * 100)}%, ${v.hsl.a})`,
                  })
                );
              }}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default GroupeEditable;
