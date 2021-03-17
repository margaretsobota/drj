import React from "react";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import _ from "lodash";


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
  }
}));

function ConfirmationPage({demographicState, mapRef}) {
  console.log("here's the map", mapRef)
  const styles = useStyles();
  const convertValue = (demographicTrait) => {
    const copyState = demographicState.demographicState[demographicTrait]
    if (demographicTrait=="age"){
      if (copyState==1){return "Under 18"}
      else if (copyState==2){return "18-24"}
      else if (copyState==3){return "25-34"}
      else if (copyState==4){return "35-44"}
      else if (copyState==5){return "45-54"}
      else if (copyState==6){return "55-64"}
      else if (copyState==7){return "65+"}
    }
    if (demographicTrait=="income"){
      if (copyState==1){return "RD$416,000 or below"}
      else if (copyState==2){return "RD$416,000-624,000"}
      else if (copyState==3){return "RD$624,000-827,000"}
      else if (copyState==4){return "RD$867,000 or greater"}
    }
    if (demographicTrait=="distance"){
      if (copyState==1){return "Under 10km"}
      else if (copyState==2){return "11km-19km"}
      else if (copyState==3){return "20km-29km"}
      else if (copyState==4){return "30km-39km"}
      else if (copyState==5){return "40km-49km"}
      else if (copyState==6){return "Over 50km"}

    }
    if (demographicTrait=="district"){

      if (copyState==1){return "Distrito Nacional"}
      else if (copyState==2){return "Santo Domingo"}
      else if (copyState==3){return "Monte Plata"}
      else if (copyState==4){return "Santiago"}
      else if (copyState==5){return "Valverde"}
      else if (copyState==6){return "La Vega"}
      else if (copyState==7){return "Espaillat"}
      else if (copyState==8){return "Constanza"}
      else if (copyState==9){return "Sánchez Ramírez"}
      else if (copyState==10){return "Monseñor Nouel"}
      else if (copyState==11){return "Duarte"}
      else if (copyState==12){return "Herman"}
      else if (copyState==13){return "Hermanas Mirabal"}
      else if (copyState==14){return "María Trinidad Sánchez"}
      else if (copyState==15){return "Samaná"}
      else if (copyState==16){return "San Pedro de Macorís"}
      else if (copyState==17){return "El Seibo"}
      else if (copyState==18){return "Hato Mayor"}
      else if (copyState==19){return "La Romana"}
      else if (copyState==20){return "La Altagracia"}
      else if (copyState==21){return "San Cristóbal"}
      else if (copyState==22){return "Villa Altagracia"}
      else if (copyState==23){return "Peravia"}
      else if (copyState==24){return "Azua"}
      else if (copyState==25){return "San José de Ocoa"}
      else if (copyState==26){return "Barahona"}
      else if (copyState==27){return "Bahoruco"}
      else if (copyState==28){return "Independencia"}
      else if (copyState==29){return "Pedernales"}
      else if (copyState==30){return "San Juan de la Maguana"}
      else if (copyState==31){return "Las Matas de Farfán"}
      else if (copyState==32){return "Elías Piña"}
      else if (copyState==33){return "Montecristi"}
      else if (copyState==34){return "Dajabón"}
      else if (copyState==35){return "Santiago Rodríguez"}
      else if (copyState==36){return "Puerto Plata"}
    }

  }
  return (
    <Container>
      <Container className={styles.formControl}>
        <h2>
          Gender: {demographicState.demographicState["gender"]}
        </h2>
        <h2>
          Age: {convertValue("age")}
        </h2>
        <h2>
          Average Household Income: {convertValue("income")}
        </h2>
        <h2>
          Highest Achieved Levl of Education: {demographicState.demographicState["education"]}
        </h2>
        <h2>
          City of Residence: {demographicState.demographicState["city"]}
        </h2>
        <h2>
          Distance Traveled to Court: {convertValue("distance")}
        </h2>
        <h2>
          Were you represented by a lawyer?: {demographicState.demographicState["representation"]}
        </h2>
        <h2>
          Court Process: {demographicState.demographicState["process"]}
        </h2>
        <h2>
          Court District: {convertValue("district")}
        </h2>
      </Container>
      <Container align="left" style={{paddingLeft: "10px", marginTop: "10px"}}>
        <Button
          type="primary"
          className={styles.prevButton}
        >
          <Link className={styles.buttonLink} to="/surveyForm2">
            Previous
          </Link>
        </Button>
        <Button
          type="primary"
          className={styles.nextButton}
        >
          <Link className={styles.buttonLink} style={{color:"#FFFFFF"}} to="/mapForm">
            Confirm
          </Link>
        </Button>
      </Container>
    </Container>
  );
}

export default ConfirmationPage;
