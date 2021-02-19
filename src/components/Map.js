import React , { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import * as allCurves from '@visx/curve';
import { LinePath } from '@visx/shape';

const useStyles = makeStyles((theme) => ({
}));

const Map = ({mapRef}) => {
  const styles = useStyles();
  const [dataState, setData] = useState({});

  const testData = [[1,2], [3,7], [8,2], [1,9]];

  useEffect(() => {
    const handleData = snap => {

      if(mapRef != null){
        if (snap.val()){
          console.log("snap!", snap.val());
          setData(snap.val().phases);
      }
    }}
    mapRef.on('value', handleData, error => alert(error));
    return () => { mapRef.off('value', handleData); };
  }, [mapRef]);

  console.log("data", dataState);

  return (
    <Box component="div">
      <h1>
        Hi New Map
      </h1>
    </Box>
  )
};



export default Map;
