import React from "react";
import { Box } from "@material-ui/core";
import StageForm from "./StageForm";
import { makeStyles } from '@material-ui/core/styles';
import firebase from "firebase/app";
import "firebase/database";

const useStyles = makeStyles((theme) => ({

}));

const MapForm = ({ team }) => {
  const styles = useStyles();
  const teamRef = firebase.database().ref("teams").child(team);
  const newMap = {
    "awareness": "",
    "findingLawyer": "",
    "preparingDocuments": ""
  };

  // right now this generates infinite maps, but it works!
  // TO DO: only generate new map upon pushing "start new map"
  // let mapKey = teamRef.child("maps").push(newMap).key;
  // console.log(mapKey);

  return (
    <Box component="div">
      <StageForm stage="Awareness"/>
      <StageForm stage="Finding a Lawyer"/>
      <StageForm stage="Preparing Documents"/>
    </Box>
  )
};



export default MapForm;
