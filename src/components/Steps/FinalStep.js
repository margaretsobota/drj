import React from "react";
import { Button, Container, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    justifyContent: "left",
    alignItems: "left",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    maxWidth: '100%',

  },
  inputContainer: {
    background: "rgba(163, 217, 209, 0.2)",
    alignItems: "center",
    padding: "40px",
    paddingBottom: "100px",
    margin: "10px",
    flex: 3
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  returnButton:{ 
    background: "#FFFFFF", 
    border: "1px solid #699BF7", 
    boxSizing: "border-box",
    borderRadius: "5px",
    marginRight: "20px",
    marginTop:"40px",
    padding: "20px"
  },
  saveButton: { 
    background: "#FFFFFF", 
    border: "1px solid #699BF7", 
    background:"#699BF7",
    boxSizing: "border-box",
    borderRadius: "5px",
    marginRight: "20px",
    marginTop:"40px",
    padding: "20px"
  }
  
}));

function FinalStep({demographicState, mapRef}) {
  console.log("here's the map", mapRef)
  const styles = useStyles();
  return (
    <Container>
      <Container className={styles.formControl}>
      <h2>
        Gender: {demographicState.demographicState["gender"]}
      </h2>
      <h2>
        Age: {demographicState.demographicState["age"]}
      </h2>
      <h2>
        Average Household Income: {demographicState.demographicState["income"]}
      </h2>
      <h2>
        Highest Achieved Levl of Education: {demographicState.demographicState["education"]}
      </h2>
      <h2>
        City of Residence: {demographicState.demographicState["city"]}
      </h2>
      <h2>
        Distance Traveled to Court: {demographicState.demographicState["distance"]}
      </h2>
      <h2>
        Were you represented by a lawyer?: {demographicState.demographicState["representation"]}
      </h2>
      <h2>
        Court Process: <i>{demographicState.demographicState["process"]}</i>
      </h2>
      <h2>
        Court District: {demographicState.demographicState["district"]}
      </h2>
      
      </Container>
    <Container align="right">
    <Link to="/step3">
    <Button type="primary" className={styles.returnButton}>
      Return
    </Button>
    </Link>
    <Button type="primary" className={styles.saveButton}>
      Confirm
    </Button>
    
  </Container>
  </Container>
  );
}

export default FinalStep;
