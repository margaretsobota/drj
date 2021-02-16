import React from "react";
import { Box, Button } from "@material-ui/core";
import PhaseForm from "./PhaseForm";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";

const useStyles = makeStyles((theme) => ({
  phaseButton: {
    marginBottom: "10px",
    marginLeft: "10px"
  }
}));

const MapForm = ({ team, mapRef }) => {
  const styles = useStyles();

  const getNewSteps = (phase) => {
    const newStep = {
      title: "",
      description: "",
      phase: phase,
      rating: ""
    };
    return [newStep];
  };

  const stepsObj = {
    "awareness": getNewSteps("awareness"),
    "findingLawyer": getNewSteps("findingLawyer"),
    "preparingDocuments": getNewSteps("preparingDocuments")
  }

  const handleSave = () => {
    for (let key of Object.keys(stepsObj)) {
      for (let step of stepsObj[key]) {
        // TO DO: there is a bug here!!
        // do not push step if step already exists!
        mapRef.child(key).push(step);
      }
    }
  };

  return (
    <Box component="div">
      <PhaseForm phase="Awareness" steps={stepsObj.awareness}/>
      <PhaseForm phase="Finding a Lawyer" steps={stepsObj.findingLawyer}/>
      <PhaseForm phase="Preparing Documents" steps={stepsObj.preparingDocuments}/>
      <Button
         className={styles.phaseButton}
         variant="contained"
         onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  )
};



export default MapForm;
