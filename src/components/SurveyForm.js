import React from "react";
import { Button, Container, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import {
  BrowserRouter as Router,
  Switch,
  Route,
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

const SurveyTake2 = ({ mapRef }) => {
  const styles = useStyles();

  const handleStepTitleChange = (event) => {
    
  }
  const handleSave = () => {

  }
  const handleSurveyInputChange = (event) => {
    /* event.target.value @id to be stored somewhere */
  }

  return (
    <Container className={styles.formControl}>
      <Container className={styles.inputContainer}>
      <InputLabel id="gender">Gender</InputLabel>
      <Select
        id="gender"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}
      >
        <MenuItem value={10}>Male</MenuItem>
        <MenuItem value={20}>Female</MenuItem>
        <MenuItem value={30}>Other</MenuItem>
      </Select>
      </Container>

      <Container className={styles.inputContainer}>
      <InputLabel id="age">Age</InputLabel>
      <Select
        id="age"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}
      >
        <MenuItem value={10}>Under 18</MenuItem>
        <MenuItem value={20}>18-24</MenuItem>
        <MenuItem value={30}>25-34</MenuItem>
        <MenuItem value={40}>35-44</MenuItem>
        <MenuItem value={50}>45-54</MenuItem>
        <MenuItem value={60}>55-64</MenuItem>
        <MenuItem value={70}>65+</MenuItem>
      </Select>
      </Container>

      <Container className={styles.inputContainer}>
      <InputLabel id="income">Annual Household Income</InputLabel>
      <Select
        id="income"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}
      >
        <MenuItem value={10}>RD$416,000 or below</MenuItem>
        <MenuItem value={20}>RD$416,000-624,000</MenuItem>
        <MenuItem value={30}>RD$624,000-827,000</MenuItem>
        <MenuItem value={40}>RD$867,000 or greater</MenuItem>
      </Select>
      </Container>

      <Container className={styles.inputContainer}>
      <FormControl>
      <InputLabel id="education">Education Level</InputLabel>
      <Select
        id="Education"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}
      >
        <MenuItem value={10}>Nivel preescolar</MenuItem>
        <MenuItem value={20}>Nivel primaria</MenuItem>
        <MenuItem value={30}>Nivel secundaria</MenuItem>
        <MenuItem value={40}>Nivel superior</MenuItem>
      </Select>
      <FormHelperText>Please select your highest achieved level of education</FormHelperText>
      </FormControl>

      </Container>
      <Container className={styles.inputContainer}>
      <InputLabel id="residence">City of Residence</InputLabel>
      <TextField
        id="residence"
        multiline
        variant="outlined"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}
      >
      </TextField>
      </Container>

      <Container className={styles.inputContainer}>
      <FormControl>
      <InputLabel id="travel">Kilometers Traveled</InputLabel>
      <Select
        id="travel"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}

      >
        <MenuItem value={10}>Under 10</MenuItem>
        <MenuItem value={20}>11-19</MenuItem>
        <MenuItem value={30}>20-29</MenuItem>
        <MenuItem value={30}>30-39</MenuItem>
        <MenuItem value={30}>40-49</MenuItem>
        <MenuItem value={30}>Over 50</MenuItem>
      </Select>
      <FormHelperText>Please indicate approximately how long it took you to travel to court</FormHelperText>
      </FormControl>
      </Container>
      
      <Container className={styles.inputContainer}>
      <FormControl>
      <InputLabel id="representation">Representation</InputLabel>
      <Select
        id="representation"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}

      >
        <MenuItem value={10}>Yes</MenuItem>
        <MenuItem value={20}>No</MenuItem>
        <MenuItem value={30}>Representation Needed</MenuItem>
      </Select>
      <FormHelperText>Were you represented by a lawyer?</FormHelperText>
      </FormControl>
      </Container>
      
      <Container className={styles.inputContainer}>
      <FormControl>
      <InputLabel id="process">Process</InputLabel>
      <Select
        id="process"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}
      >
        <MenuItem value={10}>Divorce</MenuItem>
      </Select>
      <FormHelperText>What process are you inputting today?</FormHelperText>
      </FormControl>
      </Container>
      
      <Container className={styles.inputContainer}>
      <FormControl>
      <InputLabel id="court">Distritos Federales</InputLabel>
      <Select
        id="court"
        onChange={handleStepTitleChange}
        style={{width:'200px'}}
      >
        <MenuItem value={10}>Distrito Nacional</MenuItem>
        <MenuItem value={20}>Santo Domingo </MenuItem> 
        <MenuItem value={30}>Monte Plata</MenuItem>  
        <MenuItem value={40}>Santiago</MenuItem> 
        <MenuItem value={50}>Valverde</MenuItem> 
        <MenuItem value={60}>La Vega</MenuItem> 
        <MenuItem value={70}>Espaillat</MenuItem> 
        <MenuItem value={80}>Constanza</MenuItem> 
        <MenuItem value={90}>Sánchez Ramírez</MenuItem> 
        <MenuItem value={100}>Monseñor Nouel</MenuItem> 
        <MenuItem value={110}>Duarte</MenuItem> 
        <MenuItem value={120}>Herman</MenuItem>  
        <MenuItem value={130}>Hermanas Mirabal</MenuItem> 
        <MenuItem value={140}>María Trinidad Sánchez </MenuItem> 
        <MenuItem value={150}>Samaná</MenuItem> 
        <MenuItem value={160}>San Pedro de Macorís</MenuItem> 
        <MenuItem value={170}>El Seibo</MenuItem> 
        <MenuItem value={180}>Hato Mayor</MenuItem> 
        <MenuItem value={190}>La Romana</MenuItem> 
        <MenuItem value={200}>La Altagracia</MenuItem> 
        <MenuItem value={210}>San Cristóbal</MenuItem> 
        <MenuItem value={220}>Villa Altagracia</MenuItem> 
        <MenuItem value={230}>Peravia</MenuItem> 
        <MenuItem value={240}>Azua</MenuItem>  
        <MenuItem value={250}>San José de Ocoa</MenuItem> 
        <MenuItem value={260}>Barahona</MenuItem> 
        <MenuItem value={270}>Bahoruco</MenuItem> 
        <MenuItem value={280}>Independencia</MenuItem>  
        <MenuItem value={290}>Pedernales</MenuItem> 
        <MenuItem value={300}>San Juan de la Maguana</MenuItem> 
        <MenuItem value={310}>Las Matas de Farfán</MenuItem> 
        <MenuItem value={320}>Elías Piña</MenuItem>
        <MenuItem value={330}>Montecristi</MenuItem> 
        <MenuItem value={340}>Dajabón </MenuItem> 
        <MenuItem value={350}>Santiago Rodríguez</MenuItem> 
        <MenuItem value={360}>Puerto Plata</MenuItem>
  
      </Select>
      <FormHelperText>Elige el tribunal que utilizaste</FormHelperText>
      </FormControl>
      </Container>
      <Container>
      <Link to="/mapform">
      <Button
         className={styles.saveButton}
         variant="contained"
         onClick={handleSave}
      >
        Save
      </Button>
       </Link>
      </Container>
  </Container>
)};

export default SurveyTake2;

