import React from "react";
import { Box, Button } from "@material-ui/core";
import StageForm from "./StageForm";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";

const useStyles = makeStyles((theme) => ({

}));

const MapForm = ({ team, mapRef }) => {
  const styles = useStyles();

  const getNewSteps = (phase) => {
    const newStep = {
      title: "",
      description: "",
      stage: phase,
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
      <StageForm stage="Awareness" steps={stepsObj.awareness}/>
      <StageForm stage="Finding a Lawyer" steps={stepsObj.findingLawyer}/>
      <StageForm stage="Preparing Documents" steps={stepsObj.preparingDocuments}/>
      <Button
         className={styles.stageButton}
         variant="contained"
         onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  )
};



export default MapForm;
