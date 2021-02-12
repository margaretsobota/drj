import React from 'react';
import { Grid, Paper, Box, Button, Modal, Container, TextField, ButtonGroup } from '@material-ui/core';

const StageForm = ({ stage }) => {
  return (
    <Box component="div">
      <h2>
        {stage}
      </h2>
    </Box>
  )
};

export default StageForm;
