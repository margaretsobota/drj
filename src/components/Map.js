import React , { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import "firebase/database";
import * as allCurves from '@visx/curve';
import { LinePath } from '@visx/shape';

const Map = ({mapRef}) => {
  const [dataState, setData] = useState({});
  const curveType = "curveNatural";

  // canned test data
  const testData = [[20,45], [67,67], [200,12], [400,56]];

  useEffect(() => {
    const handleData = snap => {

      if(mapRef != null){
        if (snap.val()){
          setData(snap.val().phases);
      }
    }}
    mapRef.on('value', handleData, error => alert(error));
    return () => { mapRef.off('value', handleData); };
  }, [mapRef]);

  return (
    <Box component="div" style={{paddingLeft:"20px"}}>
      <h1>
        Your New Map
      </h1>
      <svg width="1000" height="400">
        <rect width="1000" height="400" fill="#efefef" rx={14} ry={14} />
        {
          testData.map((p) => {
            return (
              <circle
                r={3}
                cx={p[0]}
                cy={p[1]}
                stroke="rgba(33,33,33,0.5)"
              />
            )
          })
        }
        <LinePath
          curve={allCurves[curveType]}
          data={testData}
          stroke="#333"
          shapeRendering="geometricPrecision"
          markerMid="url(#marker-circle)"
        />
      </svg>
    </Box>
  )
};



export default Map;
