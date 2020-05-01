import Head from "next/head";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/core";
import { Stack } from "@chakra-ui/core";
import { useState, useEffect } from "react";
import { GetAllGroupesParlementaires } from "../lib/groupes-parlementaires/DataResolver";

import GroupeEditable from "../components/groupes-parlementaires/GroupeEditable";

function UpdateGroupeParlemetaire(
  groupes,
  id,
  updatedGroupe,
  where = "default"
) {
  const newGroupes = groupes.map((gp) => {
    if (gp._id === id) {
      return updatedGroupe;
    } else {
      return gp;
    }
  });
  console.log(where, "UpdateGroupeParlemetaire", newGroupes);
  return newGroupes;
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

  console.log("Home", GroupesParlementaires);

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
          UpdateFn={(gp, where = "UpdateFn") => {
            setGroupesParlementaires(
              UpdateGroupeParlemetaire(GroupesParlementaires, gp._id, gp, where)
            );
          }}
        />
      ))}
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
