import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/core";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/core";
import { useColorMode } from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";
import { ChromePicker } from "react-color";
import { InputGroup, Input, InputLeftAddon } from "@chakra-ui/core";
import { Stack } from "@chakra-ui/core";
import { IconButton } from "@chakra-ui/core";
import { Switch } from "@chakra-ui/core";

interface GroupeEditableProps {
  GroupeParlementaire: GroupeParlementaire;
  UpdateFn: Function;
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

function GroupeEditable(props: GroupeEditableProps) {
  const { colorMode } = useColorMode();
  const [IsEditing, setIsEditing] = useState(false);

  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      borderColor="lightGray"
      borderRadius="0.3em"
      minHeight="250px"
      p={5}
      marginBottom={{ base: 4, md: 8 }}
      width={["98%", "48%", "23%"]}
      backgroundColor={props.GroupeParlementaire.Couleur}
      style={{
        opacity: props.GroupeParlementaire.Actif ? 1 : 0.3,
        transition: "opacity 0.225s linear",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <IconButton
          aria-label="Search database"
          icon={IsEditing ? "check" : "settings"}
          onClick={() => {
            setIsEditing(!IsEditing);
          }}
        />

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

      <Text mt={4}>
        <InputGroup>
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
      </Text>

      <Text mt={4}>
        <InputGroup>
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
      </Text>

      {IsEditing ? (
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
      ) : null}
    </Box>
  );
}

export default GroupeEditable;
