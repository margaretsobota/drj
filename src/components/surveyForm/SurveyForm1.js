import React from "react";
import {
  Button,
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: '70%',
    marginTop: "10px"
  },
  inputContainer: {
    background: "rgba(163, 217, 209, 0.2)",
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
  prevButton: {
    padding: "10px 35px 10px 35px",
    border: "1px solid #699BF7",
    textTransform: "none",
    fontFamily: "Roboto",
    fontSize: "18px",
    lineHeight: "36px",
    fontWeight: "400",
    color: "#005AFF",
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

const SurveyForm1 = ({demographicState}) => {
  const styles = useStyles();

  const handleSave = (event) => {
    const copyState = _.cloneDeep(demographicState.demographicState);
    copyState[event.target.name] = event.target.value;
    demographicState.setDemographics(copyState);
  }

  const isDisabled = () => {
    return demographicState.demographicState["education"] === "" || demographicState.demographicState["city"] === "" || demographicState.demographicState["distance"] === "";
  }

  return (
    <Box>
      <Box style={{marginLeft: "130px"}}>
        <Title
          title="Ayúdanos Contestando"
          subtitle="Las siguientes preguntas:"
        />
      </Box>
      <Container className={styles.formControl}>
        <Container className={styles.inputContainer}>
          <InputLabel className={styles.label}>
            4. What is your education level?
          </InputLabel>
          <Select
            name="education"
            onChange={handleSave}
            style={{width:'200px'}}
            defaultValue={demographicState.demographicState["education"]}

          >
            <MenuItem value={"preescolar"}>Nivel preescolar</MenuItem>
            <MenuItem value={"primaria"}>Nivel primaria</MenuItem>
            <MenuItem value={"secundaria"}>Nivel secundaria</MenuItem>
            <MenuItem value={"superior"}>Nivel superior</MenuItem>
          </Select>
          <FormHelperText>
            Please select your highest achieved level of education
          </FormHelperText>
        </Container>
        <Container className={styles.inputContainer}>
          <InputLabel className={styles.label}>
            5. What is your city of residence?
          </InputLabel>
          <TextField
            name="city"
            multiline
            variant="outlined"
            onChange={handleSave}
            style={{width:'200px'}}
            defaultValue={demographicState.demographicState["city"]}

          >
          </TextField>
        </Container>
        <Container className={styles.inputContainer}>
          <InputLabel className={styles.label}>
            6. How many kilometers did you travel?
          </InputLabel>
          <Select
            name="distance"
            onChange={handleSave}
            style={{width:'200px'}}
            defaultValue={demographicState.demographicState["distance"]}

          >
            <MenuItem value={1}>Under 10km</MenuItem>
            <MenuItem value={2}>11km-19km</MenuItem>
            <MenuItem value={3}>20km-29km</MenuItem>
            <MenuItem value={4}>30km-39km</MenuItem>
            <MenuItem value={5}>40km-49km</MenuItem>
            <MenuItem value={6}>Over 50km</MenuItem>
          </Select>
          <FormHelperText>Please indicate approximately how long it took you to travel to court</FormHelperText>
        </Container>
        <Container align="left" style={{paddingLeft: "10px", marginTop: "100px"}}>
          <Link className={styles.buttonLink} to="/surveyForm0">
            <Button
              type="primary"
              className={styles.prevButton}
            >
              Previous
            </Button>
          </Link>
          <Link
            className={styles.buttonLink}
            style={{color: "#FFFFFF"}}
            to="/surveyForm2"
          >
            <Button
              type="primary"
              className={isDisabled() ? styles.nextButton : styles.nextButton2}
              disabled={isDisabled()}
            >
              Next
            </Button>
          </Link>
      </Container>
    </Container>
  </Box>
)};

export default SurveyForm1;
