import React from "react";
import {
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  Tooltip, // eslint-disable-line
  Box
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import _ from "lodash";
import { Link } from "react-router-dom";
import Title from "../Title";

const useStyles = makeStyles((theme) => ({
  formControl: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: '70%',
    marginTop: "10px"
  },
  inputContainer: {
    background: "rgba(163, 217, 209, 0.2)",
    alignItems: "center",
    padding: "40px",
    paddingBottom: "100px",
    margin: "10px",
    flex: 3,
    height: "300px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonLink: {
    textDecoration: "none"
  },
  nextButton: {
    padding: "10px 35px 10px 35px",
    float: "right",
    background: "#CCCCCC",
    textTransform: "none",
    fontFamily: "Roboto",
    fontSize: "18px",
    lineHeight: "36px",
    fontWeight: "400",
    color: "#FFFFFF"
  },
  nextButton2: {
    padding: "10px 35px 10px 35px",
    float: "right",
    background: "#699BF7",
    textTransform: "none",
    fontFamily: "Roboto",
    fontSize: "18px",
    lineHeight: "36px",
    fontWeight: "400",
    color: "#FFFFFF"
  },
  label: {
    fontFamily: "Roboto",
    fontSize: "19px",
    lineHeight: "31px",
    fontWeight: "400",
    color: "#2A303D",
    marginBottom: "20px"
  }
}));

const SurveyForm0 = ({demographicState}) => {
  const styles = useStyles();

  const handleSave = (event) => {
    const copyState = _.cloneDeep(demographicState.demographicState);
    copyState[event.target.name] = event.target.value;
    demographicState.setDemographics(copyState);
  }

  const isDisabled = () => {
    return demographicState.demographicState["income"] === "" || demographicState.demographicState["age"] === "" || demographicState.demographicState["gender"] === "";
  }

  return (
    <Box style={{paddingTop: "150px"}}>
      <Box style={{marginLeft: "130px"}}>
        <Title
          title="Ayúdanos Contestando"
          subtitle="Las siguientes preguntas:"
        />
      </Box>
      <Container className={styles.formControl}>
        <Container className={styles.inputContainer}>
          <InputLabel className={styles.label}>
            1. What is your gender?
          </InputLabel>
          <Select
            required="True"
            name="gender"
            onChange={handleSave}
            style={{width:'200px'}}
            defaultValue={demographicState.demographicState["gender"]}

          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>

          </Select>
        </Container>
        <Container className={styles.inputContainer}>
          <InputLabel className={styles.label}>2. What is your age?</InputLabel>
          <Select
            name="age"
            onChange={handleSave}
            style={{width:'200px'}}
            defaultValue={demographicState.demographicState["age"]}

          >
            <MenuItem value={1}>Under 18</MenuItem>
            <MenuItem value={2}>18-24</MenuItem>
            <MenuItem value={3}>25-34</MenuItem>
            <MenuItem value={4}>35-44</MenuItem>
            <MenuItem value={5}>45-54</MenuItem>
            <MenuItem value={6}>55-64</MenuItem>
            <MenuItem value={7}>65+</MenuItem>
          </Select>
        </Container>
        <Container className={styles.inputContainer}>
          <InputLabel className={styles.label} id="income">
            3. What is your annual household income?
          </InputLabel>
          <Select
            name="income"
            onChange={handleSave}
            style={{width:'200px'}}
            defaultValue={demographicState.demographicState["income"]}

          >
            <MenuItem value={1}>RD$416,000 or below</MenuItem>
            <MenuItem value={2}>RD$416,000-624,000</MenuItem>
            <MenuItem value={3}>RD$624,000-827,000</MenuItem>
            <MenuItem value={4}>RD$867,000 or greater</MenuItem>
          </Select>
        </Container>
        <Container
          align="left"
          style={{paddingLeft: "10px", marginTop: "100px"}}
        >
        <Link className={styles.buttonLink} to="/surveyForm1">
          <Button
            disabled={isDisabled()}
            type="primary"
            className={isDisabled() ? styles.nextButton : styles.nextButton2}
          >
            Next
          </Button>
        </Link>
        </Container>
    </Container>
  </Box>
)};

export default SurveyForm0;
