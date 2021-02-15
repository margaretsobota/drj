import React from "react";
import { Box } from "@material-ui/core";
import StageForm from "./StageForm";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

}));

const MapForm = ({ stage }) => {
  const styles = useStyles();

  return (
    <Box component="div">
      <StageForm stage="Awareness"/>
      <StageForm stage="Finding a Lawyer"/>
      <StageForm stage="Preparing Documents"/>
    </Box>
  )
};



export default MapForm;
