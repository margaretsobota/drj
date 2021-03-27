import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection:"row",
    marginLeft: "55px",
    fontFamily: "Roboto"
  },
  title: {
    fontSize: "30px",
    color: "#3F414E",
    fontStyle: "normal",
    lineHeight: "12px"
  },
  subTitle: {
    fontSize: "24px",
    fontWeight: "300",
    lineHeight: "12px"
  }
}));

const Title = ({title, subtitle}) => {
  const styles = useStyles();
  return (
    <Box className={styles.container}>
      <svg width="63" height="64" viewBox="0 0 63 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle opacity="0.2" cx="31.3656" cy="31.8939" r="25.0028" fill="#13949B"/>
        <circle opacity="0.4" cx="31.3654" cy="31.8939" r="18.7521" fill="#13949B"/>
        <circle opacity="0.6" cx="31.3657" cy="31.8939" r="13.2827" fill="#13949B"/>
        <circle cx="31.366" cy="31.8939" r="7.03204" fill="#13949B"/>
      </svg>
      <Box>
        <h1 className={styles.title}> {title} </h1>
        <p className={styles.subTitle}>
          {subtitle}
        </p>
      </Box>
    </Box>
  )
};

export default Title;
