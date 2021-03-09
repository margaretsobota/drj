import React from "react";
import { Button, Container, MenuItem, Select, InputLabel } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import _ from "lodash";
import {
  Link
} from "react-router-dom";



const useStyles = makeStyles((theme) => ({
  formControl: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: '70%',

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
  saveButton: {
    justifyContent: "center",
    padding: "10px",
    margin: "80px",
    background: "#699BF7",
    color: "#FFFFFF",
  }

}));

const SurveyForm0 = ({demographicState}) => {
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
      <InputLabel>Gender</InputLabel>
      <Select
        required
        name="gender"
        onChange={handleSave}
        style={{width:'200px'}}
      >
        <MenuItem value={"male"}>Male</MenuItem>
        <MenuItem value={"female"}>Female</MenuItem>
        <MenuItem value={"other"}>Other</MenuItem>

      </Select>
      </Container>

      <Container className={styles.inputContainer}>
      <InputLabel>Age</InputLabel>
      <Select
        name="age"
        onChange={handleSave}
        style={{width:'200px'}}
      >
        <MenuItem value={0}>Under 18</MenuItem>
        <MenuItem value={1}>18-24</MenuItem>
        <MenuItem value={2}>25-34</MenuItem>
        <MenuItem value={3}>35-44</MenuItem>
        <MenuItem value={4}>45-54</MenuItem>
        <MenuItem value={5}>55-64</MenuItem>
        <MenuItem value={6}>65+</MenuItem>
      </Select>
      </Container>

      <Container className={styles.inputContainer}>
      <InputLabel id="income">Annual Household Income</InputLabel>
      <Select
        name="income"
        onChange={handleSave}
        style={{width:'200px'}}
      >
        <MenuItem value={0}>RD$416,000 or below</MenuItem>
        <MenuItem value={1}>RD$416,000-624,000</MenuItem>
        <MenuItem value={2}>RD$624,000-827,000</MenuItem>
        <MenuItem value={3}>RD$867,000 or greater</MenuItem>
      </Select>
      </Container>
      <Container align="center">
          <Link to="/surveyForm1">
          <Button
            type="primary"
            style={{
              border: "1px solid #699BF7",
              background:"#699BF7",
              boxSizing: "border-box",
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

export default SurveyForm0;
