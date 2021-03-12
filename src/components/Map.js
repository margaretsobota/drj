import React , { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import "firebase/database";
import * as allCurves from "@visx/curve";
import { LinePath, Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  labelText: {
    fontSize: "12px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold"
  },
  downloadButton: {
    marginBottom: "78px",
    marginLeft: "60px",
    background: "#13949B",
    color: "#FFFFFF",
    textTransform: "none",
    fontSize: "18px",
    padding: "14px 28px 14px 28px",
    fontWeight: "400"
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
          const stepY = (6- step.rating) *96 + 50;
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
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
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
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M12.0581 0.219299C5.43111 0.219299 0.0581055 5.5923 0.0581055 12.2193C0.0581055 18.8463 5.43111 24.2193 12.0581 24.2193C18.6851 24.2193 24.0581 18.8463 24.0581 12.2193C24.0581 5.5923 18.6851 0.219299 12.0581 0.219299ZM13.0581 18.2193H11.0581V11.2193H13.0581V18.2193ZM12.0581 8.7193C11.2301 8.7193 10.5581 8.0473 10.5581 7.2193C10.5581 6.3913 11.2301 5.7193 12.0581 5.7193C12.8861 5.7193 13.5581 6.3913 13.5581 7.2193C13.5581 8.0473 12.8861 8.7193 12.0581 8.7193Z"
              fill="white"
            />
          </svg>
        )
      }
      case "serve": {
        return (
          <svg
            width="25"
            height="25"
            x={p[0] - 12}
            y={p[1] - 13}
            viewBox="0 0 25 25"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M15.4214 16.5274V14.5274C15.8714 14.3044 17.1584 12.7724 17.2934 11.5754C17.6474 11.5484 18.2034 11.2234 18.3674 9.94038C18.4554 9.25138 18.1054 8.86438 17.8934 8.74238C17.8934 8.74238 18.4214 7.73938 18.4214 6.52838C18.4214 4.10038 17.4684 2.02838 15.4214 2.02838C15.4214 2.02838 14.7104 0.528381 12.4214 0.528381C8.17939 0.528381 6.42139 3.24938 6.42139 6.52838C6.42139 7.63238 6.94939 8.74238 6.94939 8.74238C6.73739 8.86438 6.38739 9.25238 6.47539 9.94038C6.63939 11.2234 7.19539 11.5484 7.54939 11.5754C7.68439 12.7724 8.97139 14.3044 9.42139 14.5274V16.5274C8.42139 19.5274 0.421387 17.5274 0.421387 24.5274H24.4214C24.4214 17.5274 16.4214 19.5274 15.4214 16.5274Z"
              fill="white"
            />
          </svg>
        )
      }
      case "disclosure": {
        return (
          <svg
            width="24"
            height="27"
            x={p[0] - 14}
            y={p[1] - 14}
            viewBox="0 0 24 27"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M10 0.70517C8.895 0.70517 8 1.60017 8 2.70517V10.7052V11.7052V18.2052C5.448 16.9062 4.289 16.7052 3 16.7052C1.50391 16.7052 0.00974452 17.2825 0.00195312 19.1915L4.5 21.2052L7.65625 24.3614C9.15625 25.8614 11.1925 26.7052 13.3145 26.7052H20C22.209 26.7052 24 24.9142 24 22.7052V12.7052C24 12.1747 23.7893 11.666 23.4142 11.291C23.0391 10.9159 22.5304 10.7052 22 10.7052C21.621 10.7057 21.2499 10.814 20.9301 11.0173C20.6102 11.2206 20.3547 11.5107 20.1934 11.8536C20.0668 11.7674 20 11.7052 20 11.7052C20 11.1747 19.7893 10.666 19.4142 10.291C19.0391 9.91588 18.5304 9.70517 18 9.70517C17.4696 9.70517 16.9609 9.91588 16.5858 10.291C16.2107 10.666 16 11.1747 16 11.7052V10.7052C16 9.60017 15.105 8.70517 14 8.70517C12.895 8.70517 12 9.60017 12 10.7052V2.70517C12 1.60017 11.105 0.70517 10 0.70517ZM0.00195312 19.1915H0V19.2052C0 19.2002 0.00193282 19.1965 0.00195312 19.1915Z"
              fill="white"
            />
          </svg>
        )
      }
      case "settlement": {
        return (
          <svg
            width="23"
            height="23"
            x={p[0] - 12}
            y={p[1] - 12}
            viewBox="0 0 23 23"
            fill="#FFFFFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M2.4209 0.934631C1.3159 0.934631 0.420898 1.82963 0.420898 2.93463V16.9346C0.420898 18.0396 1.3159 18.9346 2.4209 18.9346H16.4209C17.5259 18.9346 18.4209 18.0396 18.4209 16.9346V2.93463C18.4209 1.82963 17.5249 0.934631 16.4209 0.934631H2.4209ZM15.4209 4.93463C15.6766 4.93463 15.9324 5.0321 16.1279 5.2276C16.5189 5.6186 16.5189 6.25066 16.1279 6.64166L8.56738 14.2022C8.37938 14.3902 8.12535 14.4952 7.86035 14.4952C7.59535 14.4952 7.34032 14.3902 7.15332 14.2022L3.7002 10.7491C3.3092 10.3581 3.3092 9.72602 3.7002 9.33502C4.0912 8.94402 4.72326 8.94402 5.11426 9.33502L7.86035 12.0811L14.7139 5.2276C14.9094 5.0321 15.1651 4.93463 15.4209 4.93463ZM20.4209 4.93463V16.9346C20.4209 19.1436 18.6299 20.9346 16.4209 20.9346H4.4209C4.4209 22.0396 5.3159 22.9346 6.4209 22.9346H20.4209C21.5259 22.9346 22.4209 22.0396 22.4209 20.9346V6.93463C22.4209 5.82963 21.5249 4.93463 20.4209 4.93463Z"
              fill="white"
            />
          </svg>
        )
      }
      case "trial": {
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
              d="M23.8883 24.2791H10.99C10.5971 24.2791 10.2787 23.9607 10.2787 23.5678V22.8091C10.2787 22.0233 10.9156 21.3865 11.7013 21.3865V20.5361C11.7013 19.41 12.6175 18.4939 13.7435 18.4939H21.1348C22.2608 18.4939 23.177 19.41 23.177 20.5361V21.3865C23.9628 21.3865 24.5996 22.0233 24.5996 22.8091V23.5678C24.5996 23.9605 24.281 24.2791 23.8883 24.2791Z"
              fill="white"
            />
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M15.6973 15.665C15.2246 16.2924 14.3325 16.4178 13.7051 15.9449C13.0775 15.4721 12.9523 14.58 13.425 13.9525L17.7058 8.27186C18.1787 7.64429 19.0706 7.51907 19.698 7.99179C20.3256 8.46469 20.451 9.3566 19.9781 9.98418L15.6973 15.665Z"
              fill="white"
            />
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M5.47188 7.95954C4.99897 8.58693 4.10706 8.71234 3.47949 8.23943C2.8521 7.76671 2.72669 6.8748 3.1996 6.24723L7.48038 0.56662C7.9531 -0.0609565 8.84519 -0.186361 9.47258 0.286545C10.1 0.75945 10.2254 1.65136 9.75247 2.27893L5.47188 7.95954Z"
              fill="white"
            />
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M11.2391 2.67033L6.25816 9.28026L11.9389 13.5612L16.9199 6.95093L11.2391 2.67033Z"
              fill="white"
            />
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M6.67127 12.2774C7.00247 12.6149 7.35126 12.9385 7.73581 13.2284C8.12055 13.5181 8.52788 13.7643 8.94336 13.9897L8.01589 15.2206L5.74361 13.5084L6.67127 12.2774Z"
              fill="white"
            />
            <path
              id={"iconpa" + index}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverEnd}
              d="M4.88787 14.6445L7.16016 16.3566L2.87936 22.0374C2.40646 22.665 1.51455 22.7902 0.887158 22.3175C0.25958 21.8446 0.134361 20.9527 0.607082 20.3251L4.88787 14.6445Z"
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
    <Box component="div" style={{paddingLeft:"10px", fontFamily: "Roboto"}}>
      <Title
        title="Journey Map"
        subtitle="Porttitor mattis nulla justo commodo at maecenas porta, eu ultricies ut."
      />
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
                  y={p[1] - 30}
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
      <Button className={styles.downloadButton}>
        Download PDF
      </Button>
    </Box>
  )
};



export default Map;
