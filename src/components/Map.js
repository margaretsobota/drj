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

  const getArrayRanges = (phases) => {
    // calc array ranges
    //    switch(phase) {
    //      //hard coded
    //      case "research": {
    //        phaseMappings[phase].arrStart = 0;
    //        phaseMappings[phase].arrEnd = phase.phaseTotalSteps;
    //        break;
    //      }
    //      case "petition": {
    //         phaseMappings["petition"].arrStart = phaseMappings["research"].arrEnd + 1;
    //         phaseMappings["petition"].arrEnd = phaseMappings["petition"].arrStart + phase.phaseTotalSteps;
    //         break;
    //      }
    //      /* ... */
  }

  const arrayMap = (phase, step) => {
    // phaseMappings = {
    //   research: { startX: cannedData, range: cannedData, arrStart: calc, arrEnd: calc}
    //   disclosure: { startX: cannedData, range: cannedData, arrStart: calc, arrEnd: calc}
    //   service: { startX: cannedData, range: cannedData, arrStart: calc, arrEnd: calc}
    //   ....
    // }
    //   dataArr = [];
    //   stepMap = {};
    //    startX = phaseMappings[phase].startX;
    //    totalSteps = phase.phaseTotalSteps;
    //    padding = phaseMappings[phase].range / (totalSteps + 1);
    //    stepX = startX + padding*(step.count + 1);
    //    stepY = step.rating*100; // need to account for graphics Y
    //    // if this is the first step in a given phase
    //    switch(phase) {
    //      //hard coded
    //      case "research": {
    //        phaseMappings[phase].arrStart = 0;
    //        phaseMappings[phase].arrEnd = phase.phaseTotalSteps;
    //        break;
    //      }
    //      case "petition": {
    //         phaseMappings["petition"].arrStart = phaseMappings["research"].arrEnd + 1;
    //         phaseMappings["petition"].arrEnd = phaseMappings["petition"].arrStart + phase.phaseTotalSteps;
    //         break;
    //      }
    //      /* ... */
    //    }
    //    ind = phaseMappings[phase].arrStart + step.count;
    //    dataArr.splice(ind, 0, [stepX, stepY]); // could directly index
    //    stepMap[ind] = step;
  }

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
