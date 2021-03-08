import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import logo from "./images/logoLIJ.png";
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
import Step1 from "./components/Steps/Step1";
import Step2 from "./components/Steps/Step2";
import Step3 from "./components/Steps/Step3";
import FinalStep from "./components/Steps/FinalStep";


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
    marginLeft: "55.02px"
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
  const [user, setUser] = useState({
    firstName: "Margaret",
    teamName: "DRJ"
  });
  const [mapRefState, setMapRef] = useState("");

  // then derive teamName from the team associated with user
  // when user creates account they can either create team or join one
  const [team, setTeam] = useState(user.teamName);
  
  // this will store our user's data
  const [data, setData] = useState({});

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
              <img src={logoSmall} className={styles.headerLogo }alt="logo" />
              <Link to="/">Home</Link>
              <Link to="/surveyform">Survey</Link>
              <Link to="/mapform" onClick={newMap}> Map Form</Link>
          </Box>
        </nav>
        <Switch>
          <Route exact path="/">
            <Box component="div" className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </header>
            </Box>
          </Route>
          <Route path="/mapform">
            <MapForm mapRef={mapRefState}/>
          </Route>
          <Route path="/map">
            <Map mapRef={mapRefState}/>
          </Route>
          <Route path="/surveyform">
            <Step1 demographicState={{demographicState, setDemographics}} />
          </Route>
          <Route path="/step2">
            <Step2 demographicState={{demographicState, setDemographics}}/>
          </Route>
          <Route path="/step3">
            <Step3 demographicState={{demographicState, setDemographics}}/>
          </Route>
          <Route path="/confirmationPage">
            <FinalStep demographicState={{demographicState, setDemographics}} mapRef={mapRefState}/>
          </Route>
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
