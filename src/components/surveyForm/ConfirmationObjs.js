import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection:"row",
    fontFamily: "Roboto"
  },
  container2: {
    display: "flex",
    flexDirection:"column",
    fontFamily: "Roboto"
  },
  bigContainer: {
    padding: "30px",
    margin: "20px",
  },
  title: {
    fontSize: "24px",
    color: "#2A303D",
    fontStyle: "normal",
    lineHeight: "20px",
    marginLeft: "5px"

  },
  subTitle: {
    fontSize: "20px",
    fontWeight: "300",
    lineHeight: "20px",
    marginLeft: "32px"

  },
  numberCircle :{
    width: "20px",
    lineHeight: "20px",
    borderRadius: "50%",
    textAlign: "center",
    fontSize: "14px",
    background: "#FFF",
    border: "2px solid #FFF",

    }
}));

const ConfirmationObjs = ({number, title, subtitle}) => {
  const styles = useStyles();
  return (
    <Box className={styles.bigContainer}>
        <Box className={styles.container}>
            <Box className={styles.numberCircle}> {number} </Box>
            <Box className={styles.title}> {title} </Box>
        </Box>
        <Box className={styles.container2}>
            <Box className={styles.subTitle}> {subtitle} </Box>
        </Box>
    </Box>
  )
};

export default ConfirmationObjs;
