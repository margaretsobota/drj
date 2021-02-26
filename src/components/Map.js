import React , { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import "firebase/database";
import * as allCurves from "@visx/curve";
import { LinePath, Bar } from "@visx/shape";
import { Group } from "@visx/group";

const Map = ({mapRef}) => {
  const [dataState, setData] = useState({});
  const curveType = "curveNatural";

  useEffect(() => {
    if (mapRef) {
      const handleData = snap => {

        if(mapRef != null){
          if (snap.val()){
            setData(snap.val().phases);
        }
      }}
      mapRef.on('value', handleData, error => alert(error));
      return () => { mapRef.off('value', handleData); };
    }
  }, [mapRef]);

  let mapData = [];

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
          const stepY = (6- step.rating) *100 + 100;
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

      mapData = getDataArray();
    }

    const phaseColumns = [
      {
        text: "Research",
        fill: "#3D7DF3",
        width: "100"
      },
      {
        text: "Petition",
        fill: "rgba(61, 125, 243, 0.8)",
        width: "100"
      },
      {
        text: "Serve",
        fill: "rgba(105, 155, 247, 0.7)",
        width: "170"
      },
      {
        text: "Disclosure",
        fill: "rgba(105, 155, 247, 0.5)",
        width: "250"
      },
      {
        text: "Settlement",
        fill: "rgba(105, 155, 247, 0.3)",
        width: "210"
      },
      {
        text: "Pre-Trial",
        fill: "rgba(105, 155, 247, 0.2)",
        width: "210"
      },
      {
        text: "Trial",
        fill: "rgba(105, 155, 247, 0.15)",
        width: "100"
      }
    ];

  return (
    <Box component="div" style={{paddingLeft:"20px"}}>
      <svg width="1400" height="800">
        <rect width="1400" height="800" fill="#FCF6EC" x={14} y={14} />
        {
          phaseColumns.map((phase, i) => {
            return (
              <Group
                key={`phaseColumn-${i}`}
                top="10"
                left="10"
              >
                <Bar
                  x={(i * 190) + 60}
                  y={14}
                  width={180}
                  height={60}
                  fill={phase.fill}
                />
              </Group>
            )
          })
        }
        {
          mapData.map((p) => {
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
          data={mapData}
          stroke="#333"
          shapeRendering="geometricPrecision"
          markerMid="url(#marker-circle)"
        />
      </svg>
    </Box>
  )
};



export default Map;
