import React , { useState } from "react";
import { Box, Button } from "@material-ui/core";
import PhaseForm from "./PhaseForm";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import {
  Link
} from "react-router-dom";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
  saveButton: {
    marginBottom: "78px",
    marginLeft: "72.11px",
    marginTop: "40px",
    background: "#699BF7",
    color: "#FFFFFF"
  },
  mapButton: {
    marginLeft: "10px",
    background: "#A3D9D1",
    color: "#2A303D",
    marginRight: "72.11px",
    borderRadius: "5px",
    textDecoration: "none",
    padding: "10px",
    paddingRight: "15px"
  },
  arrowIcon : {
    display: "inline-block",
    verticalAlign: "middle",
    paddingBottom: "3px",
    color: "#2A303D"
  }
}));

const MapForm = ({ mapRef }) => {
  const styles = useStyles();

  const getNewSteps = (phase) => {
    const newStep = {
      uuid: "",
      title: "",
      description: "",
      phase: phase,
      rating: "",
      count: 0
    };
    return [newStep];
  };

  const stepsObj = {
    "research": {phaseTime: 0, phaseTotalSteps: 1, steps: getNewSteps("research")},
    "petition": {phaseTime: 0, phaseTotalSteps: 1, steps: getNewSteps("petition")},
    "serve": {phaseTime: 0, phaseTotalSteps: 1, steps: getNewSteps("serve")},
    "disclosure": {phaseTime: 0, phaseTotalSteps: 1, steps: getNewSteps("disclosure")},
    "settlement": {phaseTime: 0, phaseTotalSteps: 1, steps: getNewSteps("settlement")},
    "pre-trial": {phaseTime: 0, phaseTotalSteps: 1, steps: getNewSteps("pre-trial")},
    "trial": {phaseTime: 0, phaseTotalSteps: 1, steps: getNewSteps("trial")}
  }

  const [phaseState, setPhase] = useState(stepsObj);

  const handleSave = () => {
    for (let key of Object.keys(phaseState)) {
      let phase = phaseState[key];
      mapRef.child("phases").child(key).child("phaseTotalSteps").set(phase.phaseTotalSteps);
      mapRef.child("phases").child(key).child("phaseTime").set(phase.phaseTime);

      for (let step of phaseState[key].steps) {
        let uuid;
        if (step.uuid.length === 0)
        {
          uuid = mapRef.child("phases").child(key).child("steps").push(step).key;
          step.uuid = uuid;
        }
        else {
          uuid = step.uuid;
          mapRef.child("phases").child(key).child("steps").child(uuid).set(step);
        }

      }
    }
  };

  return (
    <Box component="div">
      <Box style={{display: "flex", flexDirection: "row-reverse", marginBottom: "30px"}}>
        <Link
          className={styles.mapButton}
          to="/map"
        >
          <PlayArrowIcon className={styles.arrowIcon}/>
          &nbsp;SEE MAP
        </Link>
      </Box>
      <PhaseForm phase="research" state={{phaseState, setPhase}}/>
      <PhaseForm phase="petition" state={{phaseState, setPhase}}/>
      <PhaseForm phase="serve" state={{phaseState, setPhase}}/>
      <PhaseForm phase="disclosure" state={{phaseState, setPhase}}/>
      <PhaseForm phase="settlement" state={{phaseState, setPhase}}/>
      <PhaseForm phase="pre-trial" state={{phaseState, setPhase}}/>
      <PhaseForm phase="trial" state={{phaseState, setPhase}}/>
      <Button
         className={styles.saveButton}
         variant="contained"
         onClick={handleSave}
      >
        Save
      </Button>
    </Box>
  )
};



export default MapForm;
