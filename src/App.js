import React, { useState, useEffect } from "react";
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

function App() {
  // set static user for testing purposes
  const [user, setUser] = useState({
    firstName: "Margaret",
    teamName: "DRJ"
  });
  const [team, setTeam] = useState(user.teamName);
  const [data, setData] = useState({});

  let teamRef;

  const getTeamRef = () => {
    teamRef = db.child("teams").child(team);
  };

  getTeamRef();

  // update our data based on which team we are
  useEffect(() => {
    const handleData = snap => {

      if(team != null){
        if (snap.val()){
          const uuid = team.uuid;
          setData(snap.val().teams[uuid]);
      }
    }}
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, [team]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/mapform">Start a New Map</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </header>
            </div>
          </Route>
          <Route path="/mapform">
            <NewMap />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const NewMap = () => {
  return (
    <MapForm />
  )
}

export default App;
