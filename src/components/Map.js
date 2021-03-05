import React , { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import * as allCurves from "@visx/curve";
import { LinePath, Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";

const useStyles = makeStyles((theme) => ({
  labelText: {
    fontSize: "12px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold"
  }
}));

const Map = ({mapRef}) => {
  const styles = useStyles();
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
          0: {name: "research", startX: 60, range: 200},
          1: {name: "petition", startX: 261, range: 200},
          2: {name: "serve", startX: 461, range: 200},
          3: {name: "disclosure", startX: 661, range: 200},
          4: {name: "settlement", startX: 861, range: 200},
          5: {name: "pre-trial", startX: 1061, range: 200},
          6: {name: "trial", startX: 1261, range: 200}
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
          const stepY = (6- step.rating) *96 + 50;
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

  const leftOffset = 100;
  const barWidth = 170;
  const labelOffset = 66;
  const starOffset = 100;
  const stepsBarHeight = 480;

  return (
    <Box component="div" style={{paddingLeft:"10px"}}>
      <svg width="1500" height="750">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          y={starOffset}
          viewBox="0 0 24 24"
          fill="#2A303D"
        >
          <path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          y={starOffset + stepsBarHeight/2-30}
          viewBox="0 0 24 24"
          fill="#2A303D"
        >
           <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          y={starOffset + stepsBarHeight-30}
          viewBox="0 0 24 24"
          fill="#2A303D"
        >
          <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/>
        </svg>
        <svg
          width="26"
          height={stepsBarHeight}
          fill="none"
          viewBox="0 0 26 481"
          xmlns="http://www.w3.org/2000/svg"
          x={30}
          y={100}
        >
          <path d="M24.5088 0.673065H12.7495M0.990234 0.673065H12.7495M12.7495 0.673065V479.673H0.990234H24.5088" stroke="black" stroke-linecap="round"/>
        </svg>
        <rect width="1390" height="750" fill="#FCF6EC" x={60} y={14} />
        <Bar
          x={labelOffset}
          y={24}
          width={40}
          height={60}
          fill={"#F2F2F2"}
        />
        <Text
          x={labelOffset + 20}
          y={54}
          fill={"#303031"}
          angle={270}
          textAnchor="middle"
          verticalAnchor="middle"
          className={styles.labelText}
        >
          PHASES
        </Text>
        <Bar
          x={labelOffset}
          y={100}
          width={40}
          height={stepsBarHeight}
          fill={"#F2F2F2"}
        />
        <Text
          x={labelOffset + 20}
          y={stepsBarHeight/2 + 85}
          fill={"#303031"}
          angle={270}
          textAnchor="middle"
          verticalAnchor="middle"
          className={styles.labelText}
        >
          STEPS
        </Text>
        <Bar
          x={labelOffset}
          y={600}
          width={40}
          height={80}
          fill={"#F2F2F2"}
        />
        <Text
          x={labelOffset + 20}
          y={640}
          fill={"#303031"}
          angle={270}
          textAnchor="middle"
          verticalAnchor="middle"
          className={styles.labelText}
        >
          BACKEND
        </Text>
        {
          phaseColumns.map((phase, i) => {
            return (
              <Group
                key={`phaseColumn-${i}`}
                top="10"
                left="10"
              >
                <Bar
                  x={(i * 190) + leftOffset}
                  y={14}
                  width={barWidth}
                  height={60}
                  fill={phase.fill}
                />
                <Text
                  x={(i * 190) + leftOffset + barWidth/2}
                  y="50"
                  fill={i < 2 ? "#FCF6EC": "#303031"}
                  style={{
                    fontSize: "19.8925px",
                    fontFamily: "Roboto",
                    fontStyle: "normal",
                    fontWeight: "bold"
                  }}
                  textAnchor="middle"
                >
                  {phase.text}
                </Text>
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
