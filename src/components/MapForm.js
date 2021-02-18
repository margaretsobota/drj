import React , { useState } from "react";
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
    console.log("called");
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

  const [stepsState, setSteps] = useState(stepsObj);

  const handleSave = () => {
    for (let key of Object.keys(stepsState)) {
      for (let step of stepsState[key]) {
        let uuid;
        if (step.uuid.length === 0)
        {
          uuid = mapRef.child("phases").child(key).push(step).key;
          step.uuid = uuid;
        }
        else {
          uuid = step.uuid;
          mapRef.child("phases").child(key).child(uuid).set(step);
        }

      }
    }
  };

  return (
    <Box component="div">
      <PhaseForm phase="Research" steps={stepsState.research}/>
      <PhaseForm phase="Petition" steps={stepsState.petition}/>
      <PhaseForm phase="Serve" steps={stepsState.serve}/>
      <PhaseForm phase="Disclosure" steps={stepsState.disclosure}/>
      <PhaseForm phase="Settlement" steps={stepsState.settlement}/>
      <PhaseForm phase="Pre-Trial" steps={stepsState["pre-trial"]}/>
      <PhaseForm phase="Trial" steps={stepsState.trial}/>
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
