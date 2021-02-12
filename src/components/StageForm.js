import { Box, Container, Button} from "@material-ui/core";
import StepForm from "./StepForm";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  stageContainer: {
    backgroundColor: "#AAB6C5",
    padding: "10px",
    marginBottom: "5px"
  },
  newButton: {
    marginTop: "10px"
  }
}));

const StageForm = ({ stage }) => {
  const styles = useStyles();

  return (
    <Container className={styles.stageContainer}>
      <h2>
        {stage}
      </h2>
      <StepForm />
      <Container>
        <Button
          className={styles.newButton}
          variant="contained"
        >
          New Step
        </Button>
      </Container>
    </Container>
  )
};



export default StageForm;
