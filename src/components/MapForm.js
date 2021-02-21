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
      <Box style={{display: "flex", flexDirection: "row-reverse", marginBottom: "30px"}}>
        <Link
          className={styles.mapButton}
          to="/map"
        >
          <PlayArrowIcon className={styles.arrowIcon}/>
          &nbsp;SEE MAP
        </Link>
      </Box>
      <PhaseForm phase="Research" steps={stepsState.research}/>
      <PhaseForm phase="Petition" steps={stepsState.petition}/>
      <PhaseForm phase="Serve" steps={stepsState.serve}/>
      <PhaseForm phase="Disclosure" steps={stepsState.disclosure}/>
      <PhaseForm phase="Settlement" steps={stepsState.settlement}/>
      <PhaseForm phase="Pre-Trial" steps={stepsState["pre-trial"]}/>
      <PhaseForm phase="Trial" steps={stepsState.trial}/>
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
