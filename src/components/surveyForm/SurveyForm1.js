import React from "react";
import { Button, Container, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import _ from "lodash";
import {
  Link
} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  formControl: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: '70%',

  },
  inputContainer: {
    background: "rgba(163, 217, 209, 0.2)",
    padding: "40px",
    paddingBottom: "100px",
    margin: "10px",
    flex: 3
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  saveButton: {
    justifyContent: "center",
    padding: "10px",
    margin: "80px",
    background: "#699BF7",
    color: "#FFFFFF",
  }

}));

const SurveyForm1 = ({demographicState}) => {
  const styles = useStyles();

  const handleSave = (event) => {
    const copyState = _.cloneDeep(demographicState.demographicState)
    copyState[event.target.name] = event.target.value
    demographicState.setDemographics(copyState)
    console.log(copyState)
  }

  return (
    <Container className={styles.formControl}>
      <Container className={styles.inputContainer}>
      <FormControl>
      <InputLabel>Education Level</InputLabel>
      <Select
        name="education"
        onChange={handleSave}
        style={{width:'200px'}}
      >
        <MenuItem value={"preescolar"}>Nivel preescolar</MenuItem>
        <MenuItem value={"primaria"}>Nivel primaria</MenuItem>
        <MenuItem value={"secundaria"}>Nivel secundaria</MenuItem>
        <MenuItem value={"superior"}>Nivel superior</MenuItem>
      </Select>
      <FormHelperText>Please select your highest achieved level of education</FormHelperText>
      </FormControl>

      </Container>
      <Container className={styles.inputContainer}>
      <InputLabel>City of Residence</InputLabel>
      <TextField
        name="city"
        multiline
        variant="outlined"
        onChange={handleSave}
        style={{width:'200px'}}
      >
      </TextField>
      </Container>

      <Container className={styles.inputContainer}>
      <FormControl required>
      <InputLabel >Kilometers Traveled</InputLabel>
      <Select
        name="distance"
        onChange={handleSave}
        style={{width:'200px'}}

      >
        <MenuItem value={0}>Under 10km</MenuItem>
        <MenuItem value={1}>11km-19km</MenuItem>
        <MenuItem value={2}>20km-29km</MenuItem>
        <MenuItem value={3}>30km-39km</MenuItem>
        <MenuItem value={4}>40km-49km</MenuItem>
        <MenuItem value={5}>Over 50km</MenuItem>
      </Select>
      <FormHelperText>Please indicate approximately how long it took you to travel to court</FormHelperText>
      </FormControl>
      </Container>
      <Container align="center">
          <Link to="/surveyForm0">
          <Button type="primary"
            style={{
              background: "#FFFFFF",
              border: "1px solid #699BF7",
              boxSizing: "border-box",
              borderRadius: "5px",
              marginRight: "20px",
              marginTop:"40px",
              padding: "20px"
            }}
          >
            Previous
          </Button>
          </Link>
          <Link to="/surveyForm2">
          <Button type="primary"
            style={{
              border: "1px solid #699BF7",
              boxSizing: "border-box",
              background:"#699BF7",
              borderRadius: "5px",
              marginTop:"40px",
              padding: "20px"
            }}
          >
            Next
          </Button>
          </Link>
      </Container>

  </Container>
)};

export default SurveyForm1;
