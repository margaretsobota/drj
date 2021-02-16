import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import logo from "./images/logoLIJ.png";
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
let mapRef = "before set";


function App() {
  // set static user for testing purposes
  // normally user would be set by firebase auth
  const [user, setUser] = useState({
    firstName: "Margaret",
    teamName: "DRJ"
  });
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
      "awareness": "",
      "findingLawyer": "",
      "preparingDocuments": ""
    };

    mapRef = teamRef.child("divorceMaps").push(newMap);
  }

  return (
    <Router>
      <Box component="div">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mapform" onClick={newMap}>
                Start a New Map
              </Link>
            </li>
          </ul>
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
            <MapForm team={team} mapRef={mapRef}/>
          </Route>
        </Switch>
      </Box>
    </Router>
  );
}

export default App;
