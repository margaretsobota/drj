import React , { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import "firebase/database";
import * as allCurves from '@visx/curve';
import { LinePath } from '@visx/shape';
import firebase from "firebase/app";

const Map = ({mapRef}) => {
  const [dataState, setData] = useState({});
  const curveType = "curveNatural";

  // our static map key for test data
  const db = firebase.database().ref();
  const teamRef = db.child("teams").child("DRJ");
  const staticKey = "-MU5lM9BdnKUYviMlTBX";
  const staticMapRef = teamRef.child("divorceMaps").child(staticKey);
  mapRef = staticMapRef;

  useEffect(() => {
    const handleData = snap => {

      if(mapRef != null){
        if (snap.val()){
          setData(snap.val().phases);
      }
    }}
    mapRef.on('value', handleData, error => alert(error));
    return () => { mapRef.off('value', handleData); };
  }, [/*mapRef*/]);

  let testData = [];

    if (Object.keys(dataState).length > 0) {
      const getArrayRanges = (phases) => {
        const phaseMappings = {
          0: {name: "research", startX: 0, range: 200},
          1: {name: "petition", startX: 201, range: 200},
          2: {name: "serve", startX: 401, range: 200},
          3: {name: "disclosure", startX: 601, range: 200},
          4: {name: "settlement", startX: 801, range: 200},
          5: {name: "pre-trial", startX: 1001, range: 200},
          6: {name: "trial", startX: 1201, range: 200}
        };
        for(let phaseIndex of Object.keys(phaseMappings)) {
          let phaseName = phaseMappings[phaseIndex].name;
          let phase = dataState[phaseName];
          switch (phaseName) {
            case "research": {
              // inclusive, first array index
              phaseMappings[0].arrStart = 0;
              // inclusive, last array index
              phaseMappings[0].arrEnd = phase.phaseTotalSteps - 1;
              break;
            }
            default: {
              phaseMappings[phaseIndex].arrStart = phaseMappings[phaseIndex - 1].arrEnd + 1;
              phaseMappings[phaseIndex].arrEnd = phaseMappings[phaseIndex].arrStart + phase.phaseTotalSteps - 1;
            }
          }
        }
        return phaseMappings;
      }

      const phaseMappings = getArrayRanges();

      const arrayMap = (phaseIndex, phaseData, dataArr, stepMap) => {
        const startX = phaseMappings[phaseIndex].startX;
        const totalSteps = phaseData.phaseTotalSteps;
        const padding = phaseMappings[phaseIndex].range / (totalSteps + 1);
        for (let step of Object.values(phaseData.steps)) {
          const stepX = startX + padding *(step.count + 1);
          const stepY = step.rating*100;
          let stepIndex = phaseMappings[phaseIndex].arrStart + step.count;
          dataArr.splice(stepIndex, 0, [stepX, stepY]);
        }
      }

      const getDataArray = () => {
        const dataArr = [];
        const stepMap = {};
        for(let phaseIndex of Object.keys(phaseMappings)) {
          let phaseName = phaseMappings[phaseIndex].name;
          let phaseData = dataState[phaseName];
          arrayMap(phaseIndex, phaseData, dataArr, stepMap);
        }
        return dataArr;
      }

      testData = getDataArray();
    }

  return (
    <Box component="div" style={{paddingLeft:"20px"}}>
      <h1>
        Your New Map
      </h1>
      <svg width="1400" height="800">
        <rect width="1400" height="800" fill="#efefef" rx={14} ry={14} />
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
