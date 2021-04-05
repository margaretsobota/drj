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
    marginRight: "30px",
    marginTop: "40px",
    background: "#699BF7",
    color: "#FFFFFF",
    textTransform: "none",
    fontSize: "18px",
    paddingRight: "45px",
    paddingLeft: "45px",
    fontWeight: "400"
  },
  closeButton: {
    marginBottom: "78px",
    marginTop: "40px",
    background: "#7F7F7F",
    color: "#FFFFFF",
    textTransform: "none",
    fontSize: "18px",
    paddingRight: "45px",
    paddingLeft: "45px",
    fontWeight: "400"
  },
  mapLink: {
    textDecoration: "none"
  },
  mapButton: {
    marginLeft: "10px",
    background: "#F5BF4F",
    marginRight: "72.11px",
    borderRadius: "5px",
    width: "190px",
    boxShadow: "3.55051px 3.55051px 7.10103px rgba(170, 170, 204, 0.5), -3.55051px -3.55051px 7.10103px #FFFFFF",
    color: "#2A303D",
    textTransform: "none",
    fontFamily: "Roboto",
    fontSize: "20px",
    lineHeight: "30px",
    fontWeight: "normal"
  },
  arrowIcon : {
    display: "inline-block",
    color: "#2A303D"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    marginBottom: "30px",
    marginRight: "14px"
  }
}));

const MapForm = ({ mapRef }) => {
  const styles = useStyles();
  const [deletedState, setDeleted] = useState([]);

  const headerLogo = document.getElementById("logo");
  headerLogo.style.position = "relative";

  const getNewSteps = (phase) => {
    const newStep = {
      uuid: "",
      title: "",
      time:"",
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

      for (let uuid of deletedState) {
        let deletedRef = mapRef.child("phases").child(key).child("steps").child(uuid);
        deletedRef.remove();
      }
      setDeleted([]);
    }
  };

  return (
    <Box component="div">
      <Box className={styles.buttonContainer}>
        <Link
          className={styles.mapLink}
          to="/map"
        >
          <Button
            className={styles.mapButton}
            onClick={handleSave}
            startIcon={<PlayArrowIcon className={styles.arrowIcon}/>}
          >
            Journey Map
          </Button>
        </Link>
      </Box>
      <PhaseForm phase="research" state={{phaseState, setPhase}} deletedState={{deletedState, setDeleted}}/>
      <PhaseForm phase="petition" state={{phaseState, setPhase}} deletedState={{deletedState, setDeleted}}/>
      <PhaseForm phase="serve" state={{phaseState, setPhase}} deletedState={{deletedState, setDeleted}}/>
      <PhaseForm phase="disclosure" state={{phaseState, setPhase}} deletedState={{deletedState, setDeleted}}/>
      <PhaseForm phase="settlement" state={{phaseState, setPhase}} deletedState={{deletedState, setDeleted}}/>
      <PhaseForm phase="pre-trial" state={{phaseState, setPhase}} deletedState={{deletedState, setDeleted}}/>
      <PhaseForm phase="trial" state={{phaseState, setPhase}} deletedState={{deletedState, setDeleted}}/>
      <Box style={{marginLeft: "72.11px"}}>
        <Button
           className={styles.saveButton}
           variant="contained"
           onClick={handleSave}
        >
          Save
        </Button>
        <Link className={styles.mapLink} to="/">
          <Button
             className={styles.closeButton}
             variant="contained"
             onClick={() => {
               headerLogo.style.position = "fixed";
             }}
          >
            Close Process
          </Button>
        </Link>
      </Box>
    </Box>
  )
};



export default MapForm;
