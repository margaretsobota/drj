import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import logoSmall from "./images/inv_lab_logo_med.png";
import './App.css';
import firebase from "firebase/app";
import "firebase/database";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MapForm from "./components/MapForm";
import Map from "./components/Map";
import SurveyForm0 from "./components/surveyForm/SurveyForm0";
import SurveyForm1 from "./components/surveyForm/SurveyForm1";
import SurveyForm2 from "./components/surveyForm/SurveyForm2";
import ConfirmationPage from "./components/surveyForm/ConfirmationPage";
import DashboardImage from "./components/DashboardImage";


import { makeStyles } from '@material-ui/core/styles';

const firebaseConfig = {
  apiKey: "AIzaSyDVRzOlafcGV_2jfKdOJOfx4yFHI6pHORE",
  authDomain: "drj-app-4012a.firebaseapp.com",
  databaseURL: "https://drj-app-4012a-default-rtdb.firebaseio.com",
  projectId: "drj-app-4012a",
  storageBucket: "drj-app-4012a.appspot.com",
  messagingSenderId: "841250660386",
  appId: "1:841250660386:web:e980109a53b6ef4fa1aa7b",
  measurementId: "G-LMS8MD7H9S"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();


const useStyles = makeStyles((theme) => ({
  headerLogo: {
    width: "85.81px",
    height: "85.95px",
    marginLeft: "55.02px",
    marginTop: "40px"
  },
  title: {
    flex: "1",
    textAlign: "left",
    marginLeft: "10%",
    fontFamily: "Raleway",
    lineHeight: "70px",
    fontSize: "25px",
    marginTop: "30px"
  },
  registerButton: {
    marginRight: "40px",
    background: "#AEC9FB",
    textTransform: "none",
    fontFamily: "Roboto",
    height: "40px",
    width: "110px",
    fontWeight: "normal",
    boxShadow: "4.03969px 4.03969px 8.07939px rgba(170, 170, 204, 0.5), -4.03969px -4.03969px 8.07939px #FFFFFF"
  },
  loginButton: {
    marginRight: "40px",
    background: "#A3D9D1",
    textTransform: "none",
    fontFamily: "Roboto",
    height: "40px",
    width: "110px",
    fontWeight: "normal",
    boxShadow: "4.03969px 4.03969px 8.07939px rgba(170, 170, 204, 0.5), -4.03969px -4.03969px 8.07939px #FFFFFF"
  },
  link: {
    textDecoration: "none"
  }
}));


function App() {

  const demographicsObj = {
    gender: "",
    age: "",
    income: "",
    education: "",
    city: "",
    distance: "",
    representation: "",
    process: "",
    district: ""
  };

  const [demographicState, setDemographics] = useState(demographicsObj);

  const styles = useStyles();

  // set static user for testing purposes
  // normally user would be set by firebase auth
  const [user, setUser] = useState({ // eslint-disable-line
    firstName: "Margaret",
    teamName: "DRJ"
  });
  const [mapRefState, setMapRef] = useState("");

  // then derive teamName from the team associated with user
  // when user creates account they can either create team or join one
  const [team, setTeam] = useState(user.teamName); // eslint-disable-line

  // this will store our user's data
  const [data, setData] = useState({}); // eslint-disable-line

  // update our user's data based on which team we are
  useEffect(() => {
    const handleData = snap => {

      if(team != null){
        if (snap.val()){
          // teamName is a key in the db
          // we will pass "team" to our map component so they can access the db
          setData(snap.val().teams[team]);
      }
    }}
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, [team]);

  const newMap = () => {
    const teamRef = db.child("teams").child(team);
    const newMap = {
      "phases": "",
      "demographics": ""
    };

    setMapRef(teamRef.child("divorceMaps").push(newMap));
  }

  return (
    <Router>
      <Box component="div">
        <nav>
          <Box component="div" class="topnav">
            <img src={logoSmall} className={styles.headerLogo} alt="logo" />
          </Box>
        </nav>
        <Switch>
          <Route exact path="/">
            <Box component="div" style={{display: "flex", flexDirection: "row"}}>
              <Box component="div" className={styles.title}>
                <h1 style={{fontWeight: "normal"}}>
                  Welcome!
                </h1>
                <h1 style={{fontWeight: "normal"}}>
                  Login or register to enter the process inputs
                </h1>
                <Link
                  className={styles.link}
                  to="/surveyForm0"
                  onClick={newMap}
                >
                  <Button className={styles.loginButton}>
                    Login
                  </Button>
                </Link>
                <Link
                  className={styles.link}
                  to="/surveyForm0"
                  onClick={newMap}
                >
                  <Button className={styles.registerButton}>
                    Register
                  </Button>
                </Link>
              </Box>
              <Box component="div" style={{flex: "1"}}>
                <DashboardImage/>
              </Box>
            </Box>
          </Route>
          <Route path="/mapForm">
            <MapForm mapRef={mapRefState}/>
          </Route>
          <Route path="/map">
            <Map mapRef={mapRefState}/>
          </Route>
          <Route path="/surveyForm0">
            <SurveyForm0 demographicState={{demographicState, setDemographics}} />
          </Route>
          <Route path="/surveyForm1">
            <SurveyForm1 demographicState={{demographicState, setDemographics}}/>
          </Route>
          <Route path="/surveyForm2">
            <SurveyForm2 demographicState={{demographicState, setDemographics}}/>
          </Route>
          <Route path="/confirmationPage">
            <ConfirmationPage demographicState={{demographicState, setDemographics}} mapRef={mapRefState}/>
          </Route>
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
