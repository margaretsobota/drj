import React from "react";
import { Button, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

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
          <Link className={styles.buttonLink} style={{color:"#FFFFFF"}} to="/">
            Confirm
          </Link>
        </Button>
      </Container>
    </Container>
  );
}

export default ConfirmationPage;
