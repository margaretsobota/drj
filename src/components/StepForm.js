import React, { useState, useEffect } from "react";
import { Paper, Button, Container, TextField, ButtonGroup } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  inputContainer: {
     display: "flex",
     flexDirection: "column"
  },
  stepTitle: {
    paddingBottom: "10px"
  }
}));

const StepForm = ({ stage }) => {
  const styles = useStyles();

  return (
    <Container>
     <Paper>
     <form>
      <Container className={styles.inputContainer}>
        <TextField
          className={styles.stepTitle}
          id="stepTitle"
          label="Step Title"
        />
        <TextField
          id="stepDesc"
          label="Step Description"
          helperText="Describe in detail what happened at this step"
          variant="outlined"
          multiline
        />
      </Container>
      <Button>Save</Button>
      </form>
     </Paper>
    </Container>
  )
};

export default StepForm;
