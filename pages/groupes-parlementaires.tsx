import Head from "next/head";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/core";
import { Stack } from "@chakra-ui/core";
import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/core";

import { GetAllGroupesParlementaires } from "../lib/groupes-parlementaires/DataResolver";
import GroupeEditable from "../components/groupes-parlementaires/GroupeEditable";

function UpdateGroupeParlementaire(groupes, id, updatedGroupe) {
  const newGroupes = groupes.map((gp) => {
    if (gp._id === id) {
      return updatedGroupe;
    } else {
      return gp;
    }
  });
  return newGroupes;
}

function RemoveGroupeParlementaire(groupes, id) {
  return groupes.filter((gp) => gp._id !== id);
}

function AddNewGroupeParlementaire(groupes: any[]) {
  return groupes.concat({
    _id: `CUSTOM_${Math.random()}`,
    Sigle: "",
    NomComplet: "",
    Couleur: "hsla(0, 0%, 0%, 1)",
    URLImage: "",
    Order: 10,
    Actif: true,
  });
}

export default function Home() {
  const { status, data, error } = useQuery(
    "GroupesParlementaires",
    GetAllGroupesParlementaires
  );
  const [GroupesParlementaires, setGroupesParlementaires] = useState([]);

  useEffect(() => {
    if (status === "success") {
      setGroupesParlementaires(data.data.GroupesParlementairesDetails.data);
    }
  }, [status]);

  if (status === "loading") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error}</span>;
  }

  return (
    <Stack
      display="flex"
      flexGrow={1}
      flexWrap="wrap"
      justifyContent="space-around"
      flexDirection="row"
    >
      {GroupesParlementaires.map((gp) => (
        <GroupeEditable
          key={gp._id}
          GroupeParlementaire={gp}
          UpdateFn={(gp) => {
            setGroupesParlementaires(
              UpdateGroupeParlementaire(GroupesParlementaires, gp._id, gp)
            );
          }}
          RemoveFn={(id) => {
            setGroupesParlementaires(
              RemoveGroupeParlementaire(GroupesParlementaires, id)
            );
          }}
        />
      ))}
      <Box
        borderRadius="0.3em"
        marginBottom={{ base: 4, md: 8 }}
        width={["98%", "48%", "23%"]}
        minHeight="250px"
      >
        <IconButton
          aria-label="Add Groupe Parlementaire"
          border="none"
          icon="add"
          width="100%"
          height="100%"
          onClick={() => {
            setGroupesParlementaires(
              AddNewGroupeParlementaire(GroupesParlementaires)
            );
          }}
        />
      </Box>
      {
        // ToDo: Trouver une meilleur façon de palier à ce problème. Parce que c'est dégueux mdr.
      }
      <Box mb={{ base: 4, md: 8 }} width={["98%", "48%", "23%"]} order={1} />
      <Box mb={{ base: 4, md: 8 }} width={["98%", "48%", "23%"]} order={1} />
      <Box mb={{ base: 4, md: 8 }} width={["98%", "48%", "23%"]} order={1} />
      <Box mb={{ base: 4, md: 8 }} width={["98%", "48%", "23%"]} order={1} />
    </Stack>
  );
}
