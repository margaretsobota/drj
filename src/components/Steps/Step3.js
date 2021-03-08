import React from "react";
import { Button, Container, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import _ from "lodash";

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

const Step3 = ({demographicState}) => {
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
      <InputLabel>Representation</InputLabel>
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
      </FormControl>
      </Container>
      
      <Container className={styles.inputContainer}>
      <FormControl>
      <InputLabel >Process</InputLabel>
      <Select
        name="process"
        onChange={handleSave}
        style={{width:'200px'}}
      >
        <MenuItem value={"divorce"}>Divorce</MenuItem>
      </Select>
      <FormHelperText>What process are you inputting today?</FormHelperText>
      </FormControl>
      </Container>
      
      <Container className={styles.inputContainer}>
      <FormControl>
      <InputLabel>Distritos Federales</InputLabel>
      <Select
        name="district"
        onChange={handleSave}
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
      <Container align="center">
          <Link to="/step2">
          <Button type="primary"  style={{ background: "#FFFFFF", 
              border: "1px solid #699BF7", 
              boxSizing: "border-box",
              borderRadius: "5px",
              marginRight: "20px",
              marginTop:"40px",
              padding: "20px"}}>
            Previous
          </Button>
          </Link>
          <Link to="/confirmationPage">
          <Button type="primary" style={{ background: "#FFFFFF", 
              border: "1px solid #699BF7", 
              boxSizing: "border-box",
              background:"#699BF7",
              borderRadius: "5px",
              marginTop:"40px",
              padding: "20px"}}>
            Next
          </Button>
          </Link>
      </Container>
      
  </Container>
)};

export default Step3;

