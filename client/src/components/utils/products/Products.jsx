import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Products(props) {
  const images = [
    {
      label: "Hyper Chair 01",
      imgPath: "https://www.bhadepay.com/assets/images/furniture-banner.png",
    },
    {
      label: "Super 02",
      imgPath:
        "https://eltemkt.com/cdn/shop/products/1247850100005_1_500x500@3x.png?v=1685589653",
    },
    {
      label: "Quantum",
      imgPath:
        "https://oomphhome.com/cdn/shop/products/upholstery_silo_0016_Layer-Comp-17_600x.png?v=1677520988",
    },
    {
      label: "Flamingo ultra pink",
      imgPath:
        "https://www.furniturehousemanila.com/wp-content/uploads/2018/02/slideshow_shell_petal.png",
    },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        width: "f",
        flexGrow: 1,
        marginTop: 6,
        bgcolor: "white",
        overflow: "hidden",
      }}
    >
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "transparent",
          color: "#190019",
        }}
      >
        <Typography
          sx={{
            position: "relative",
            fontSize: 300,
            top: 350,
            overflow: "hidden",
          }}
        >
          {images[activeStep].label}
        </Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label} sx={{ overflowX: "hidden" }}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 800,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",

                  width: 900,
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        sx={{ bgcolor: "transparent", color: "white" }}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{ color: "#190019  " }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            sx={{ color: "#190019  " }}
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default Products;
