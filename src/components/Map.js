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
  let stepMapFinal = {};

    if (Object.keys(dataState).length > 0) {
      const getArrayRanges = (phases) => {
        const phaseMappings = {
          0: {name: "research", startX: 110, range: 190},
          1: {name: "petition", startX: 301, range: 170},
          2: {name: "serve", startX: 491, range: 170},
          3: {name: "disclosure", startX: 681, range: 170},
          4: {name: "settlement", startX: 871, range: 170},
          5: {name: "pre-trial", startX: 1061, range: 170},
          6: {name: "trial", startX: 1251, range: 170}
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
          const stepY = (6- step.rating) *80 + 50;
          let stepIndex = phaseMappings[phaseIndex].arrStart + step.count;
          dataArr.splice(stepIndex, 0, [stepX, stepY]);
          stepMap[stepIndex] = step;
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
        return [dataArr, stepMap];
      }

      const results = getDataArray();
      mapData = results[0];
      stepMapFinal = results[1];
    }

    const phaseColumns = [
      {
        text: "Research",
        fill: "#3D7DF3"
      },
      {
        text: "Petition",
        fill: "rgba(61, 125, 243, 0.8)"
      },
      {
        text: "Serve",
        fill: "rgba(105, 155, 247, 0.7)"
      },
      {
        text: "Disclosure",
        fill: "rgba(105, 155, 247, 0.5)"
      },
      {
        text: "Settlement",
        fill: "rgba(105, 155, 247, 0.3)"
      },
      {
        text: "Pre-Trial",
        fill: "rgba(105, 155, 247, 0.2)"
      },
      {
        text: "Trial",
        fill: "rgba(105, 155, 247, 0.15)"
      }
    ];

  const getIcon = (index, p) => {
    switch (stepMapFinal[index].phase) {
      case "research": {
        return (
          <svg
            width="24"
            height="24"
            x={p[0] - 13}
            y={p[1] - 13}
            viewBox="0 0 24 24"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.8639 14.2386C19.699 10.2352 18.7508 4.6917 14.7474 1.85728C10.744 -0.977131 5.20044 -0.0296174 2.36603 3.97446C-0.468388 7.97786 0.479126 13.5207 4.4832 16.3551C7.34064 18.3782 11.1185 18.5339 14.1324 16.754L20.681 23.2634C21.3881 24.0077 22.5645 24.0375 23.3089 23.3304C24.0532 22.624 24.083 21.4476 23.3766 20.7033C23.3542 20.6796 23.3326 20.6579 23.3089 20.6355L16.8639 14.2386ZM9.60953 14.8455C6.44596 14.8462 3.8811 12.2833 3.87907 9.11975C3.87839 5.95618 6.44122 3.39132 9.60547 3.38997C12.765 3.38861 15.3285 5.94738 15.3346 9.10688C15.34 12.2711 12.7785 14.8401 9.6136 14.8455C9.61224 14.8455 9.61156 14.8455 9.60953 14.8455Z"
              fill="white"
            />
          </svg>
        )
      }
      case "petition": {
        return (
          <svg
            width="25"
            height="25"
            x={p[0] - 12}
            y={p[1] - 12}
            viewBox="0 0 25 25"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.0581 0.219299C5.43111 0.219299 0.0581055 5.5923 0.0581055 12.2193C0.0581055 18.8463 5.43111 24.2193 12.0581 24.2193C18.6851 24.2193 24.0581 18.8463 24.0581 12.2193C24.0581 5.5923 18.6851 0.219299 12.0581 0.219299ZM13.0581 18.2193H11.0581V11.2193H13.0581V18.2193ZM12.0581 8.7193C11.2301 8.7193 10.5581 8.0473 10.5581 7.2193C10.5581 6.3913 11.2301 5.7193 12.0581 5.7193C12.8861 5.7193 13.5581 6.3913 13.5581 7.2193C13.5581 8.0473 12.8861 8.7193 12.0581 8.7193Z"
              fill="white"
            />
          </svg>
        )
      }
      default: {
        return (
          <svg
            width="25"
            height="25"
            x={p[0] - 13}
            y={p[1] - 13}
            viewBox="0 0 25 25"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M16.2812 0.162659C11.5872 0.162659 7.78125 3.96866 7.78125 8.66266C7.78125 9.70495 7.9789 10.6989 8.32227 11.6216L0.78125 19.1627V24.1627H5.78125V21.1627H8.78125V18.1627H11.7812L13.3223 16.6216C14.245 16.965 15.239 17.1627 16.2812 17.1627C20.9753 17.1627 24.7812 13.3567 24.7812 8.66266C24.7812 3.96866 20.9753 0.162659 16.2812 0.162659ZM18.2812 4.16266C19.6623 4.16266 20.7812 5.28166 20.7812 6.66266C20.7812 8.04366 19.6623 9.16266 18.2812 9.16266C16.9002 9.16266 15.7812 8.04366 15.7812 6.66266C15.7812 5.28166 16.9002 4.16266 18.2812 4.16266Z"
              fill="white"
            />
        </svg>
        )
      }
    }
  }

  const leftOffset = 100;
  const barWidth = 170;
  const labelOffset = 66;
  const starOffset = 100;
  const stepsBarHeight = 480;

  const handleHover = (event) => {
    const pointIndex = (event.target.id).substring(6);
    document.getElementById("description" + pointIndex).style.visibility = "visible";
  };

  const handleHoverEnd = (event) => {
    const pointIndex = (event.target.id).substring(6);
    document.getElementById("description" + pointIndex).style.visibility = "hidden";
  };

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
        <rect width="1390" height="680" fill="#FCF6EC" x={60} y={14} />
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
        <LinePath
          curve={allCurves[curveType]}
          data={mapData}
          stroke="rgba(33,18,20,0.5)"
          strokeWidth={2}
          shapeRendering="geometricPrecision"
          markerMid="url(#marker-circle)"
        />
        {
          mapData.map((p) => {
            const pointIndex = mapData.indexOf(p);
            return (
              <Group>
                <Text
                  x={p[0] - 10}
                  y={p[1] - 20}
                  fill={"#303031"}
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "300",
                    fontSize: "12px",
                    lineHeight: "11px"
                  }}
                >
                  {stepMapFinal[pointIndex].title}
                </Text>
                <circle
                  fill="#242055"
                  id={"circle" + pointIndex}
                  r={18}
                  cx={p[0]}
                  cy={p[1]}
                  stroke="rgba(42,48,61,0.5)"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHoverEnd}
                />
                {getIcon(pointIndex, p)}
                {/*
                <svg
                  width="25"
                  height="25"
                  x={p[0] - 13}
                  y={p[1] - 13}
                  viewBox="0 0 25 25"
                  fill="#FFFFFF"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id={"iconpa" + pointIndex}
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverEnd}
                    d="M16.2812 0.162659C11.5872 0.162659 7.78125 3.96866 7.78125 8.66266C7.78125 9.70495 7.9789 10.6989 8.32227 11.6216L0.78125 19.1627V24.1627H5.78125V21.1627H8.78125V18.1627H11.7812L13.3223 16.6216C14.245 16.965 15.239 17.1627 16.2812 17.1627C20.9753 17.1627 24.7812 13.3567 24.7812 8.66266C24.7812 3.96866 20.9753 0.162659 16.2812 0.162659ZM18.2812 4.16266C19.6623 4.16266 20.7812 5.28166 20.7812 6.66266C20.7812 8.04366 19.6623 9.16266 18.2812 9.16266C16.9002 9.16266 15.7812 8.04366 15.7812 6.66266C15.7812 5.28166 16.9002 4.16266 18.2812 4.16266Z"
                    fill="white"
                  />
                </svg>
              */}
                <Text
                  id={"description" + pointIndex}
                  x={p[0] - 10}
                  y={p[1] + 30}
                  fill={"#303031"}
                  style={{
                    fontFamily: "Roboto",
                    fontWeight: "300",
                    fontSize: "12px",
                    lineHeight: "11px",
                    visibility: "hidden",
                    background:"#FFFFF"
                  }}
                  width={175}
                  verticalAnchor={"start"}
                >
                    {stepMapFinal[pointIndex].description}
                  </Text>
              </Group>
            )
          })
        }
      </svg>
    </Box>
  )
};



export default Map;
