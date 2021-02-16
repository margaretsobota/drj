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
      uuid: "",
      title: "",
      description: "",
      phase: phase,
      rating: ""
    };
    return [newStep];
  };

  const stepsObj = {
    "research": getNewSteps("research"),
    "petition": getNewSteps("petition"),
    "serve": getNewSteps("serve"),
    "disclosure": getNewSteps("disclosure"),
    "settlement": getNewSteps("settlement"),
    "pre-trial": getNewSteps("pre-trial"),
    "trial": getNewSteps("trial")
  }

  const handleSave = () => {
    for (let key of Object.keys(stepsObj)) {
      for (let step of stepsObj[key]) {
        let uuid;
        if (step.uuid.length === 0)
        {
          console.log("no uuid", step);
          uuid = mapRef.child("phases").child(key).push(step).key;
          step.uuid = uuid;
        }
        else {
          console.log("has uuid", step);
          uuid = step.uuid;
          mapRef.child("phases").child(key).child(uuid).set(step);
        }
        // TO DO: there is a bug here!!
        // do not push step if step already exists!

      }
    }
  };

  return (
    <Box component="div">
      <PhaseForm phase="Research" steps={stepsObj.research}/>
      <PhaseForm phase="Petition" steps={stepsObj.petition}/>
      <PhaseForm phase="Serve" steps={stepsObj.serve}/>
      <PhaseForm phase="Disclosure" steps={stepsObj.disclosure}/>
      <PhaseForm phase="Settlement" steps={stepsObj.settlement}/>
      <PhaseForm phase="Pre-Trial" steps={stepsObj["pre-trial"]}/>
      <PhaseForm phase="Trial" steps={stepsObj.trial}/>
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
