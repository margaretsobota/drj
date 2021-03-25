import React from "react";
import { Box } from "@material-ui/core";
import DashboardImage from "./DashboardImage";

const Dashboard = () => {
  return (
    <Box component="div">
      <Box component="div" style={{marginLeft: "50%"}}>
        <DashboardImage/>
      </Box>
    </Box>
  )
}

export default Dashboard;
