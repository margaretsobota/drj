import React from "react";
import {
  Button,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import _ from "lodash";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: '70%',
    marginTop: "40px"
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
    textDecoration: "none",
    color: "#005AFF",
    textTransform: "none",
    fontFamily: "Roboto",
    fontSize: "18px",
    lineHeight: "36px",
    fontWeight: "400"
  },
  prevButton: {
    padding: "10px 35px 10px 35px",
    border: "1px solid #699BF7"
  },
  nextButton: {
    padding: "10px 35px 10px 35px",
    float: "right",
    background: "#699BF7"
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

const SurveyForm2 = ({demographicState}) => {
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
        <InputLabel className={styles.label}>
          7. Did you have legal representation?
        </InputLabel>
        <Select
          name="representation"
          onChange={handleSave}
          style={{width:'200px'}}
        >
          <MenuItem value={"yes"}>Yes</MenuItem>
          <MenuItem value={"no"}>No</MenuItem>
          <MenuItem value={"needed"}>Representation Needed</MenuItem>
        </Select>
        <FormHelperText>Were you represented by a lawyer?</FormHelperText>
      </Container>
      <Container className={styles.inputContainer}>
        <InputLabel className={styles.label}>
          8. What was the type of legal process?
        </InputLabel>
        <Select
          name="process"
          onChange={handleSave}
          style={{width:'200px'}}
        >
          <MenuItem value={"divorce"}>Divorce</MenuItem>
        </Select>
        <FormHelperText>What process are you inputting today?</FormHelperText>
      </Container>
      <Container className={styles.inputContainer}>
        <InputLabel className={styles.label}>
          9. Which court district did you go through?
        </InputLabel>
        <Select
          name="district"
          onChange={handleSave}
          style={{width:'200px'}}
        >
          <MenuItem value={0}>Puerto Plata</MenuItem>
          <MenuItem value={1}>Distrito Nacional</MenuItem>
          <MenuItem value={2}>Santo Domingo </MenuItem>
          <MenuItem value={3}>Monte Plata</MenuItem>
          <MenuItem value={4}>Santiago</MenuItem>
          <MenuItem value={5}>Valverde</MenuItem>
          <MenuItem value={6}>La Vega</MenuItem>
          <MenuItem value={7}>Espaillat</MenuItem>
          <MenuItem value={8}>Constanza</MenuItem>
          <MenuItem value={9}>Sánchez Ramírez</MenuItem>
          <MenuItem value={10}>Monseñor Nouel</MenuItem>
          <MenuItem value={11}>Duarte</MenuItem>
          <MenuItem value={12}>Herman</MenuItem>
          <MenuItem value={13}>Hermanas Mirabal</MenuItem>
          <MenuItem value={14}>María Trinidad Sánchez </MenuItem>
          <MenuItem value={15}>Samaná</MenuItem>
          <MenuItem value={16}>San Pedro de Macorís</MenuItem>
          <MenuItem value={17}>El Seibo</MenuItem>
          <MenuItem value={18}>Hato Mayor</MenuItem>
          <MenuItem value={19}>La Romana</MenuItem>
          <MenuItem value={20}>La Altagracia</MenuItem>
          <MenuItem value={21}>San Cristóbal</MenuItem>
          <MenuItem value={22}>Villa Altagracia</MenuItem>
          <MenuItem value={23}>Peravia</MenuItem>
          <MenuItem value={24}>Azua</MenuItem>
          <MenuItem value={25}>San José de Ocoa</MenuItem>
          <MenuItem value={26}>Barahona</MenuItem>
          <MenuItem value={27}>Bahoruco</MenuItem>
          <MenuItem value={28}>Independencia</MenuItem>
          <MenuItem value={29}>Pedernales</MenuItem>
          <MenuItem value={30}>San Juan de la Maguana</MenuItem>
          <MenuItem value={31}>Las Matas de Farfán</MenuItem>
          <MenuItem value={32}>Elías Piña</MenuItem>
          <MenuItem value={33}>Montecristi</MenuItem>
          <MenuItem value={34}>Dajabón </MenuItem>
          <MenuItem value={35}>Santiago Rodríguez</MenuItem>

        </Select>
        <FormHelperText>Elige el tribunal que utilizaste</FormHelperText>
      </Container>
      <Container align="left" style={{paddingLeft: "10px", marginTop: "100px"}}>
        <Button
          type="primary"
          className={styles.prevButton}
        >
          <Link className={styles.buttonLink} to="/surveyForm1">
            Previous
          </Link>
        </Button>
        <Button
          type="primary"
          className={styles.nextButton}
        >
        <Link
          className={styles.buttonLink}
          style={{color: "#FFFFFF"}}
          to="/confirmationPage"
        >
            Next
          </Link>
        </Button>
      </Container>
  </Container>
)};

export default SurveyForm2;
